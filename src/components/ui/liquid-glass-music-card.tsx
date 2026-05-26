import * as React from "react";
import { cn } from "@/lib/utils";

export interface LiquidGlassMusicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const LiquidGlassMusicCard = React.forwardRef<HTMLDivElement, LiquidGlassMusicCardProps>(
  ({ className, icon, title, subtitle, children, ...props }, ref) => (
    <div ref={ref} className={cn("glass-mc", className)} {...props}>
      <div className="glass-mc-header">
        {icon !== undefined && <div className="glass-mc-icon glass-mc">{icon}</div>}
        <div>
          <h3 className="glass-mc-title">{title}</h3>
          {subtitle && <p className="glass-mc-subtitle">{subtitle}</p>}
        </div>
      </div>
      {children && <div className="glass-mc-content">{children}</div>}
    </div>
  ),
);
LiquidGlassMusicCard.displayName = "LiquidGlassMusicCard";

export interface LiquidGlassMusicWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  cover?: React.ReactNode;
  song: string;
  artist: string;
  onPlay?: () => void;
  playing?: boolean;
}

export const LiquidGlassMusicWidget = React.forwardRef<HTMLDivElement, LiquidGlassMusicWidgetProps>(
  ({ className, cover = "♪", song, artist, onPlay, playing, ...props }, ref) => (
    <div ref={ref} className={cn("glass-mc music-widget", className)} {...props}>
      <div className="album-cover">{cover}</div>
      <div style={{ flex: 1 }}>
        <div className="song-title">{song}</div>
        <div className="song-artist">{artist}</div>
      </div>
      <button type="button" className="play-btn" onClick={onPlay} aria-label={playing ? "Pause" : "Play"}>
        {playing ? "❚❚" : "▶"}
      </button>
    </div>
  ),
);
LiquidGlassMusicWidget.displayName = "LiquidGlassMusicWidget";

export const LiquidGlassMusicGrid = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("glass-mc-grid", className)} {...props}>
      {children}
    </div>
  ),
);
LiquidGlassMusicGrid.displayName = "LiquidGlassMusicGrid";
