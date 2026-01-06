"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { X, Bell } from 'lucide-react';

export function NotificationPopup() {
    const [notification, setNotification] = useState<{ message: string } | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const checkNearby = async () => {
            if (typeof window !== 'undefined' && sessionStorage.getItem("nearbyNotificationShown") === "true") {
                return;
            }

            try {
                const res = await fetch('/api/notifications/nearby');
                if (res.ok) {
                    const data = await res.json();
                    if (data.showNotification && data.message) {
                        setNotification(data);
                        setIsVisible(true);
                        sessionStorage.setItem("nearbyNotificationShown", "true");
                    }
                }
            } catch (err) {
                console.error("Failed to check nearby notifications", err);
            }
        };

        const timer = setTimeout(checkNearby, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible || !notification) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-500">
            <div className="bg-background border border-border/50 rounded-xl shadow-2xl p-4 max-w-sm flex items-start gap-4 backdrop-blur-md bg-opacity-95 dark:bg-opacity-90">
                <div className="bg-primary/10 p-2.5 rounded-full shrink-0 text-primary">
                    <Bell className="w-5 h-5" />
                </div>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <p className="text-sm font-semibold text-foreground mb-1">
                            Nearby Opportunity
                        </p>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="text-muted-foreground hover:text-foreground transition-colors -mt-1 -mr-1 p-1"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {notification.message}
                    </p>
                    <div className="flex gap-2">
                        <Link href="/nearby" onClick={() => setIsVisible(false)} className="w-full">
                            <Button size="sm" className="w-full font-medium">
                                View Matches
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
