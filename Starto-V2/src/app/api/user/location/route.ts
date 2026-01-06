import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { latitude, longitude } = body;

        // Silent fail if invalid data (as per plan)
        if (
            latitude === undefined ||
            longitude === undefined ||
            typeof latitude !== 'number' ||
            typeof longitude !== 'number'
        ) {
            return NextResponse.json({ success: true, message: "No valid location provided" });
        }

        await prisma.user.update({
            where: { email: session.user.email },
            data: {
                latitude,
                longitude,
                lastActive: new Date(),
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Location update error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
