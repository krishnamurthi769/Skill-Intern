import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { id: true, role: true, latitude: true, longitude: true },
        });

        if (!user || !user.role || user.latitude === null || user.longitude === null) {
            return NextResponse.json({ showNotification: false });
        }

        // Target opposite role
        let targetRole: UserRole | undefined;
        if (user.role === UserRole.STARTUP) { // Founder
            targetRole = UserRole.FREELANCER;
        } else if (user.role === UserRole.FREELANCER) {
            targetRole = UserRole.STARTUP;
        } else {
            // For MVP, only matching Startup <-> Freelancer
            return NextResponse.json({ showNotification: false });
        }

        if (!targetRole) return NextResponse.json({ showNotification: false });

        // Bounding Box Logic (+/- 0.1 degrees is roughly 11km)
        const latMin = user.latitude - 0.1;
        const latMax = user.latitude + 0.1;
        const lngMin = user.longitude - 0.1;
        const lngMax = user.longitude + 0.1;

        // Anti-spam: Active in last 10 minutes
        const activeThreshold = new Date(Date.now() - 10 * 60 * 1000);

        const nearbyUser = await prisma.user.findFirst({
            where: {
                role: targetRole,
                latitude: { gte: latMin, lte: latMax },
                longitude: { gte: lngMin, lte: lngMax },
                lastActive: { gte: activeThreshold },
                NOT: { id: user.id }, // Just in case
            },
            select: { id: true }, // We only need existence
        });

        if (nearbyUser) {
            const message = user.role === 'STARTUP'
                ? "A freelancer is available near your area."
                : "A founder is available near your area.";

            return NextResponse.json({ showNotification: true, message });
        }

        return NextResponse.json({ showNotification: false });

    } catch (error) {
        console.error("Nearby check error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
