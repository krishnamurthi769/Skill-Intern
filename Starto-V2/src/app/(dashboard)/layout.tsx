import { Sidebar } from "@/components/ui/sidebar"
import { Navbar } from "@/components/ui/navbar"
import { Suspense } from "react"
import BetaBanner from "@/components/common/BetaBanner"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import LocationManager from "@/components/common/LocationManager"


export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Failsafe: Prevent orphaned users (not onboarded) from accessing dashboard
    const session = await getServerSession(authOptions);

    // If user is authenticated but not onboarded, force them to onboarding flow
    // Note: Middleware protects the route from unauthenticated access, but this checks state.
    if (session?.user && !(session.user as any).onboarded) {
        redirect("/onboarding");
    }

    return (
        <div className="flex h-screen overflow-hidden flex-col">
            {/* Beta Banner - Global for Dashboard */}
            <BetaBanner />
            <LocationManager />

            <div className="flex flex-1 overflow-hidden">
                <Suspense fallback={<div className="w-64 border-r bg-muted/10" />}>
                    <Sidebar className="hidden w-64 md:block flex-shrink-0" />
                </Suspense>
                <div className="flex-1 flex flex-col h-full overflow-hidden">
                    <Navbar />
                    <main className="flex-1 overflow-y-auto p-4 md:p-8">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    )
}
