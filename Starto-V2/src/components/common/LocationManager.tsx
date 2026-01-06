"use client";

import { useLocationTracker } from "@/hooks/useLocationTracker";
import { NotificationPopup } from "@/components/notifications/NotificationPopup";

export default function LocationManager() {
    useLocationTracker();

    return (
        <NotificationPopup />
    );
}
