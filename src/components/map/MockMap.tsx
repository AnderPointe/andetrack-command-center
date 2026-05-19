import { motion } from "framer-motion";

interface Props {
  width?: number;
  height?: number;
  /** 0..1 progress along route */
  progress: number;
}

/**
 * Production-grade stylized basemap. Renders dark cartography with water,
 * parks, building footprints, arterials, surface streets, freeway shields,
 * compass, scale bar, and an animated hero route polyline. Public API
 * matches the future Mapbox/HERE adapter.
 */
export function MockMap({ width = 1200, height = 720, progress }: Props) {
  const clamped = Math.min(1, Math.max(0, progress));
  const ROUTE_D =
    "M 140 600 C 280 540 320 460 420 440 S 620 380 720 320 S 940 220 1080 160";

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="map-bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#070b10" />
          <stop offset="55%" stopColor="#0b1218" />
          <stop offset="100%" stopColor="#070d12" />
        </linearGradient>
        <pattern id="map-grid" width="64" height="64" patternUnits="userSpaceOnUse">
          <path d="M 64 0 L 0 0 0 64" fill="none" stroke="rgba(148,163,184,0.04)" strokeWidth="1" />
        </pattern>
        <pattern id="map-grid-fine" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(148,163,184,0.02)" strokeWidth="0.5" />
        </pattern>
        <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
          <stop offset="55%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.7)" />
        </radialGradient>
        <linearGradient id="route-grad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="60%" stopColor="#5eead4" />
          <stop offset="100%" stopColor="#fb923c" />
        </linearGradient>
        <linearGradient id="water-grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#0b2436" />
          <stop offset="100%" stopColor="#071a26" />
        </linearGradient>
        <filter id="route-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      <rect width={width} height={height} fill="url(#map-bg)" />
      <rect width={width} height={height} fill="url(#map-grid-fine)" />
      <rect width={width} height={height} fill="url(#map-grid)" />

      {/* Water with shoreline */}
      <path
        d="M 0 540 Q 220 480 420 520 T 820 500 T 1200 540 L 1200 720 L 0 720 Z"
        fill="url(#water-grad)"
      />
      <path
        d="M 0 540 Q 220 480 420 520 T 820 500 T 1200 540"
        stroke="rgba(94,234,212,0.18)"
        strokeWidth="1"
        fill="none"
      />

      {/* Parks */}
      <g>
        <ellipse cx="280" cy="180" rx="120" ry="60" fill="#0f2a1d" opacity="0.7" />
        <ellipse cx="940" cy="260" rx="160" ry="70" fill="#0f2a1d" opacity="0.6" />
        <text x="280" y="184" textAnchor="middle" fontSize="10" fill="rgba(134,239,172,0.4)" letterSpacing="2">
          TRINITY PARK
        </text>
        <text x="940" y="264" textAnchor="middle" fontSize="10" fill="rgba(134,239,172,0.4)" letterSpacing="2">
          WHITE ROCK
        </text>
      </g>

      {/* Building footprints */}
      <g fill="rgba(148,163,184,0.06)" stroke="rgba(148,163,184,0.08)">
        {[
          [80, 80, 60, 40], [160, 90, 30, 50], [200, 70, 40, 30],
          [500, 110, 70, 50], [580, 130, 40, 30], [620, 90, 50, 60],
          [880, 420, 80, 60], [970, 440, 50, 40], [1020, 410, 70, 50],
          [380, 480, 50, 40], [440, 500, 60, 30],
          [720, 600, 90, 40], [820, 590, 60, 50],
        ].map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="2" />
        ))}
      </g>

      {/* Arterials — casing + fill + centerline */}
      {[
        "M -40 220 Q 300 200 600 240 T 1240 220",
        "M -40 400 Q 320 380 640 420 T 1240 400",
        "M 200 -40 Q 220 220 260 440 T 300 760",
        "M 760 -40 Q 800 220 840 460 T 880 760",
      ].map((d, i) => (
        <g key={i}>
          <path d={d} stroke="rgba(15,23,42,0.9)" strokeWidth="16" fill="none" strokeLinecap="round" />
          <path d={d} stroke="rgba(203,213,225,0.16)" strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d={d} stroke="rgba(255,255,255,0.18)" strokeWidth="1" fill="none" strokeDasharray="6 8" />
        </g>
      ))}

      {/* Surface streets */}
      <g stroke="rgba(148,163,184,0.12)" strokeWidth="2" fill="none">
        <path d="M 0 300 L 1200 320" />
        <path d="M 0 480 L 1200 500" />
        <path d="M 400 0 L 420 720" />
        <path d="M 1000 0 L 1020 720" />
        <path d="M 60 0 L 80 720" />
      </g>

      {/* Highway shields */}
      <g fontSize="9" fontWeight="700" fill="#e2e8f0">
        <rect x="252" y="148" width="22" height="14" rx="2" fill="#1e3a5f" stroke="#3b6fa0" />
        <text x="263" y="158" textAnchor="middle">I-35</text>
        <rect x="824" y="248" width="22" height="14" rx="2" fill="#1e3a5f" stroke="#3b6fa0" />
        <text x="835" y="258" textAnchor="middle">I-30</text>
        <rect x="588" y="208" width="24" height="14" rx="7" fill="#5a3a18" stroke="#a87034" />
        <text x="600" y="218" textAnchor="middle">US-75</text>
      </g>

      {/* Hero route — casing */}
      <path
        d={ROUTE_D}
        stroke="rgba(0,0,0,0.55)"
        strokeWidth="26"
        fill="none"
        strokeLinecap="round"
      />
      {/* Glow halo */}
      <path
        d={ROUTE_D}
        stroke="rgba(45,212,191,0.35)"
        strokeWidth="18"
        fill="none"
        strokeLinecap="round"
        filter="url(#route-glow)"
        opacity="0.7"
      />
      {/* Remaining (subtle outline of full route) */}
      <path
        d={ROUTE_D}
        stroke="rgba(94,234,212,0.18)"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
      />
      {/* Traveled — animated reveal */}
      <motion.path
        d={ROUTE_D}
        stroke="url(#route-grad)"
        strokeWidth="9"
        fill="none"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="1 1"
        initial={{ strokeDashoffset: 1 }}
        animate={{ strokeDashoffset: 1 - clamped }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ filter: "drop-shadow(0 0 10px rgba(45,212,191,0.55))" }}
      />
      {/* Moving chevrons along route */}
      <motion.path
        d={ROUTE_D}
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="2 22"
        animate={{ strokeDashoffset: [0, -48] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* Pickup marker */}
      <g transform="translate(140 600)">
        <circle r="18" fill="rgba(45,212,191,0.18)" />
        <circle r="12" fill="#0a0e12" stroke="#2dd4bf" strokeWidth="2.5" />
        <circle r="4" fill="#2dd4bf" />
        <text y="-22" textAnchor="middle" fontSize="9" fill="#5eead4" fontWeight="700" letterSpacing="1.5">
          PICKUP
        </text>
      </g>
      {/* Dropoff marker */}
      <g transform="translate(1080 160)">
        <circle r="18" fill="rgba(251,146,60,0.18)" />
        <circle r="12" fill="#0a0e12" stroke="#fb923c" strokeWidth="2.5" />
        <path d="M -4 -4 L 4 0 L -4 4 Z" fill="#fb923c" />
        <text y="-22" textAnchor="middle" fontSize="9" fill="#fdba74" fontWeight="700" letterSpacing="1.5">
          DROP-OFF
        </text>
      </g>

      {/* Compass */}
      <g transform="translate(60 90)">
        <circle r="22" fill="rgba(13,20,26,0.85)" stroke="rgba(148,163,184,0.25)" />
        <path d="M 0 -14 L 4 0 L 0 14 L -4 0 Z" fill="#2dd4bf" />
        <text y="-26" textAnchor="middle" fontSize="9" fill="#94a3b8" fontWeight="700">N</text>
      </g>

      {/* Scale bar */}
      <g transform="translate(60 660)">
        <rect width="80" height="3" fill="rgba(226,232,240,0.7)" />
        <rect y="3" width="40" height="3" fill="rgba(15,23,42,0.9)" />
        <rect x="40" y="3" width="40" height="3" fill="rgba(226,232,240,0.5)" />
        <text x="0" y="-4" fontSize="9" fill="#94a3b8">0</text>
        <text x="80" y="-4" textAnchor="end" fontSize="9" fill="#94a3b8">2 mi</text>
      </g>

      <rect width={width} height={height} fill="url(#vignette)" pointerEvents="none" />
    </svg>
  );
}
