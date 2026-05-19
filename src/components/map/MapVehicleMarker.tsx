import { motion } from "framer-motion";

interface Props {
  /** 0..1 along the hero route path */
  progress: number;
}

/**
 * Driver puck. Animates along the same hero polyline used in MockMap by
 * sampling pre-computed bezier waypoints. Heading follows direction of travel.
 * Rendered as a stylized semi-truck chevron with accuracy halo and ping rings.
 */
const waypoints: Array<{ x: number; y: number; h: number }> = [
  { x: 140, y: 600, h: -34 },
  { x: 340, y: 470, h: -38 },
  { x: 540, y: 410, h: -22 },
  { x: 720, y: 320, h: -34 },
  { x: 920, y: 230, h: -28 },
  { x: 1080, y: 160, h: -22 },
];

function sample(t: number) {
  const clamped = Math.min(0.999, Math.max(0, t));
  const idx = clamped * (waypoints.length - 1);
  const i = Math.floor(idx);
  const f = idx - i;
  const a = waypoints[i];
  const b = waypoints[i + 1] ?? a;
  return {
    x: a.x + (b.x - a.x) * f,
    y: a.y + (b.y - a.y) * f,
    h: a.h + (b.h - a.h) * f,
  };
}

export function MapVehicleMarker({ progress }: Props) {
  const p = sample(progress);
  return (
    <motion.g
      animate={{ x: p.x, y: p.y }}
      transition={{ type: "tween", duration: 1.6, ease: "linear" }}
      style={{ pointerEvents: "none" }}
    >
      {/* GPS accuracy halo */}
      <circle r="32" fill="rgba(45,212,191,0.08)" stroke="rgba(45,212,191,0.18)" strokeWidth="1" />

      {/* Ping rings */}
      {[22, 30].map((r, i) => (
        <motion.circle
          key={r}
          r={r}
          fill="none"
          stroke="#2dd4bf"
          strokeWidth={1.5}
          initial={{ opacity: 0.55, scale: 0.7 }}
          animate={{ opacity: [0.55, 0], scale: [0.7, 1.6] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
        />
      ))}

      {/* Heading cone */}
      <g transform={`rotate(${p.h})`}>
        <path
          d="M 0 -30 L 14 -8 L -14 -8 Z"
          fill="url(#heading-cone-grad)"
          opacity="0.7"
        />
        <defs>
          <linearGradient id="heading-cone-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(45,212,191,0)" />
            <stop offset="100%" stopColor="rgba(45,212,191,0.55)" />
          </linearGradient>
        </defs>

        {/* Truck body shadow */}
        <ellipse cy="3" rx="14" ry="4" fill="rgba(0,0,0,0.5)" />
        {/* Truck body */}
        <rect x="-8" y="-10" width="16" height="20" rx="3" fill="#0a0e12" stroke="#2dd4bf" strokeWidth="2" />
        {/* Cab */}
        <rect x="-6" y="-8" width="12" height="7" rx="1.5" fill="#2dd4bf" opacity="0.85" />
        {/* Trailer line */}
        <line x1="-6" y1="1" x2="6" y2="1" stroke="rgba(45,212,191,0.4)" strokeWidth="1" />
        {/* Forward arrow */}
        <path d="M 0 -14 L 4 -8 L -4 -8 Z" fill="#5eead4" />
      </g>
    </motion.g>
  );
}
