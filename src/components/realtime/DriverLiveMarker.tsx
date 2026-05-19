import { motion } from "framer-motion";
import { DRIVER_STATUS_COLOR, type DriverStatusKey } from "@/types/status";

interface Props {
  x: number;
  y: number;
  heading?: number | null;
  status?: DriverStatusKey | null;
  fresh?: boolean;
  stale?: boolean;
  onClick?: () => void;
  label?: string;
}

export function DriverLiveMarker({ x, y, heading = 0, status, fresh, stale, onClick, label }: Props) {
  const color = status ? DRIVER_STATUS_COLOR[status] : "#2dd4bf";
  return (
    <motion.g
      animate={{ x, y }}
      transition={{ type: "tween", duration: 1.2, ease: "linear" }}
      style={{ cursor: onClick ? "pointer" : "default" }}
      onClick={onClick}
    >
      {fresh && !stale && (
        <motion.circle
          r={18}
          fill="none"
          stroke={color}
          strokeWidth={1.5}
          initial={{ opacity: 0.6, scale: 0.6 }}
          animate={{ opacity: [0.6, 0], scale: [0.6, 1.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <circle r={11} fill={stale ? "#94a3b8" : color} opacity={stale ? 0.4 : 0.18} />
      <g transform={`rotate(${heading ?? 0})`}>
        <path d="M0 -10 L7 8 L0 4 L-7 8 Z" fill={stale ? "#94a3b8" : color} stroke="#0a0e12" strokeWidth={1.5} />
      </g>
      {label && (
        <text x={14} y={-6} fontSize={9} fill="#e2e8f0" style={{ pointerEvents: "none" }}>
          {label}
        </text>
      )}
      {stale && (
        <text x={14} y={6} fontSize={8} fill="#fbbf24" style={{ pointerEvents: "none" }}>
          stale
        </text>
      )}
    </motion.g>
  );
}
