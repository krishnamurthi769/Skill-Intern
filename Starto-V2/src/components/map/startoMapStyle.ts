export const startoMapStyle = [
    {
        elementType: "geometry",
        stylers: [{ color: "#050505" }] // Pitch Black Base
    },
    // -----------------------------------------------------------------
    // 1. PURE CLEANUP
    // -----------------------------------------------------------------
    {
        elementType: "labels",
        stylers: [{ visibility: "off" }] // ZERO TEXT
    },
    {
        featureType: "poi",
        stylers: [{ visibility: "off" }]
    },
    {
        featureType: "transit",
        stylers: [{ visibility: "off" }]
    },

    // -----------------------------------------------------------------
    // 2. THE CIRCUIT BOARD (ROADS)
    // -----------------------------------------------------------------
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#1a1a1a" }] // Dark Grey base for roads
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ visibility: "simplified" }, { color: "#333333" }, { weight: 2 }] // Main Arteries: Lighter & Thicker
    },
    {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [{ visibility: "simplified" }, { color: "#222222" }, { weight: 1.5 }] // Secondary: Subtle
    },
    {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [{ visibility: "off" }] // Noise: Off
    },
    {
        featureType: "road",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
    },

    // -----------------------------------------------------------------
    // 3. ZONES
    // -----------------------------------------------------------------
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#000000" }] // Void
    },
    {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [{ color: "#333333" }, { weight: 1 }] // Borders: Subtle outlines
    }
];
