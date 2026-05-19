import { useEffect, useRef, useState } from "react";
import { DRIVER_STATUS_COLOR, type DriverStatusKey } from "@/types/status";

interface Props {
  x: number;
  y: number;
  heading?: number | null;
  status?: DriverStatusKey | null;
  /** GPS state — "live" pings, "stale" warns, "lost" greys out */
  signal?: "live" | "stale" | "lost";
  onClick?: () => void;
  label?: string;
}

/**
 * Smoothly interpolates marker position and heading between Supabase pings
 * using requestAnimationFrame. New samples re-target the interpolator without
 * snapping the puck, so the dispatcher map feels like real telemetry.
 */
export function DriverLiveMarker({
  x,
  y,
  heading = 0,
  status,
  signal = "live",
  onClick,
  label,
}: Props) {
  const color = status ? DRIVER_STATUS_COLOR[status] : "#2dd4bf";
  const stale = signal !== "live";
  const lost = signal === "lost";

  // Current animated position/heading — updated each RAF tick.
  const [pos, setPos] = useState({ x, y, h: heading ?? 0 });
  const fromRef = useRef({ x, y, h: heading ?? 0 });
  const toRef = useRef({ x, y, h: heading ?? 0 });
  const startedRef = useRef<number>(performance.now());
  const rafRef = useRef<number>(0);

  // Re-target whenever a new sample arrives.
  useEffect(() => {
    fromRef.current = { ...pos };
    const targetH = heading ?? fromRef.current.h;
    // shortest angular path
    let dh = targetH - fromRef.current.h;
    if (dh > 180) dh -= 360;
    if (dh < -180) dh += 360;
    toRef.current = { x, y, h: fromRef.current.h + dh };
    startedRef.current = performance.now();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [x, y, heading]);

  useEffect(() => {
    const DURATION = 1400; // ms — matches mock stream cadence
    const tick = (t: number) => {
      const k = Math.min(1, (t - startedRef.current) / DURATION);
      // ease-out cubic
      const e = 1 - Math.pow(1 - k, 3);
      const a = fromRef.current;
      const b = toRef.current;
      setPos({
        x: a.x + (b.x - a.x) * e,
        y: a.y + (b.y - a.y) * e,
        h: a.h + (b.h - a.h) * e,
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <g
      transform={`translate(${pos.x} ${pos.y})`}
      style={{ cursor: onClick ? "pointer" : "default" }}
      onClick={onClick}
    >
      {!stale && (
        <>
          <circle r={22} fill="none" stroke={color} strokeWidth={1} opacity={0.35}>
            <animate attributeName="r" values="10;26;10" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.55;0;0.55" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle r={16} fill="none" stroke={color} strokeWidth={1} opacity={0.2}>
            <animate attributeName="r" values="8;20;8" dur="2.4s" begin="0.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.45;0;0.45" dur="2.4s" begin="0.6s" repeatCount="indefinite" />
          </circle>
        </>
      )}
      <circle r={12} fill={lost ? "#475569" : color} opacity={lost ? 0.25 : stale ? 0.22 : 0.18} />
      <g transform={`rotate(${pos.h})`}>
        <path
          d="M0 -11 L7.5 8 L0 4 L-7.5 8 Z"
          fill={lost ? "#94a3b8" : stale ? "#cbd5e1" : color}
          stroke="#05090d"
          strokeWidth={1.5}
          style={{ filter: lost ? "none" : `drop-shadow(0 0 6px ${color}aa)` }}
        />
      </g>
      {label && (
        <text
          x={14}
          y={-6}
          fontSize={9}
          fill="#e2e8f0"
          style={{ pointerEvents: "none", letterSpacing: "0.04em" }}
        >
          {label}
        </text>
      )}
      {stale && (
        <text x={14} y={6} fontSize={8} fill={lost ? "#f87171" : "#fbbf24"} style={{ pointerEvents: "none" }}>
          {lost ? "no signal" : "stale"}
        </text>
      )}
    </g>
  );
}
