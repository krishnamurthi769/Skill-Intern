import { useEffect, useState } from "react";
import { Marker } from "@react-google-maps/api";

type EntityType = "startup" | "investor" | "freelancer" | "space";

interface EcosystemEntity {
    id: string;
    lat: number;
    lng: number;
    type: EntityType;
    name: string;
}

// NEON PALETTE for Schematic Map
const COLORS = {
    startup: "#c084fc", // Neon Purple
    investor: "#4ade80", // Neon Green
    freelancer: "#22d3ee", // Neon Cyan
    space: "#fb923c", // Neon Orange
};

const getMarkerIcon = (type: EntityType) => {
    const color = COLORS[type];
    // Pure Geometric Nodes (Circuit style)
    // Small solid center, faint large aura
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <!-- Aura -->
            <circle cx="16" cy="16" r="10" fill="${color}" fill-opacity="0.15" />
            <!-- Core -->
            <circle cx="16" cy="16" r="4" fill="${color}" fill-opacity="1" />
            <!-- Center Dot (White for sharpness) -->
            <circle cx="16" cy="16" r="1.5" fill="white" />
        </svg>
    `;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

interface EcosystemMarkersProps {
    center: { lat: number; lng: number } | null;
}

export const EcosystemMarkers = ({ center }: EcosystemMarkersProps) => {
    const [entities, setEntities] = useState<EcosystemEntity[]>([]);

    useEffect(() => {
        if (!center) return;
        const spread = 0.025;
        const newEntities: EcosystemEntity[] = [];

        // Dense cluster generation to match the "data cloud" look
        const types: EntityType[] = ["startup", "startup", "investor", "freelancer", "space"];

        for (let i = 0; i < 20; i++) {
            newEntities.push({
                id: `e-${i}`,
                lat: center.lat + (Math.random() - 0.5) * spread,
                lng: center.lng + (Math.random() - 0.5) * spread,
                type: types[Math.floor(Math.random() * types.length)],
                name: "Node"
            });
        }

        setEntities(newEntities);
    }, [center]);

    if (!center) return null;

    return (
        <>
            {entities.map((entity) => (
                <Marker
                    key={entity.id}
                    position={{ lat: entity.lat, lng: entity.lng }}
                    icon={{
                        url: getMarkerIcon(entity.type),
                        scaledSize: new google.maps.Size(32, 32),
                        anchor: new google.maps.Point(16, 16)
                    }}
                    title={entity.type}
                    opacity={1}
                />
            ))}
        </>
    );
};
