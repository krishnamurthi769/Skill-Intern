import { useEffect } from 'react';

export function useLocationTracker() {
    useEffect(() => {
        // Only run in browser
        if (typeof window === 'undefined' || !navigator.geolocation) return;

        // Delay to avoid immediate permission prompt on load
        const timer = setTimeout(() => {
            // Check if we already have permission or if we should ask?
            // The browser handles this. If denied, it won't ask again usually or fail silently.

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;

                    // Send to backend
                    fetch('/api/user/location', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ latitude, longitude }),
                    }).catch((err) => {
                        // Silent error as requested
                        console.error('Failed to update location', err);
                    });
                },
                (error) => {
                    // Silent fail
                    console.log('Location permission denied or error:', error.message);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 1000 * 60 * 5 // 5 minutes
                }
            );
        }, 1500);

        return () => clearTimeout(timer);
    }, []);
}
