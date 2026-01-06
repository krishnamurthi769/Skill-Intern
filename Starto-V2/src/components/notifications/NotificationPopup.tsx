"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export function NotificationPopup() {
    const [notification, setNotification] = useState<{ message: string } | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const checkNearby = async () => {
            // Session storage check to prevent spam
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

        // Small delay to let the page settle
        const timer = setTimeout(checkNearby, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible || !notification) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-500">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg p-4 max-w-sm flex items-start gap-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full shrink-0">
                    <span className="text-xl">🔔</span>
                </div>
                <div className="flex-1">
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1">
                        Nearby Opportunity
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
                        {notification.message}
                    </p>
                    <div className="flex gap-2">
                        <Link
                            href="/explore"
                            className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md font-medium transition-colors"
                            onClick={() => setIsVisible(false)}
                        >
                            View Matches
                        </Link>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 px-2 py-1.5"
                        >
                            Dismiss
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
