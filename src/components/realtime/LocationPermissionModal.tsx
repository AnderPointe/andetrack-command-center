import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DriverPrivacyNotice } from "./DriverPrivacyNotice";

interface Props {
  open: boolean;
  onAllow: () => void;
  onDeny: () => void;
}

export function LocationPermissionModal({ open, onAllow, onDeny }: Props) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onDeny()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Share your location with dispatch?</DialogTitle>
          <DialogDescription>
            Anderoute EliteNav needs your live location to give dispatch accurate
            ETAs, geofence pickup/drop-off events, and respond to issues.
          </DialogDescription>
        </DialogHeader>
        <DriverPrivacyNotice />
        <DialogFooter className="gap-2 sm:gap-2">
          <button
            onClick={onDeny}
            className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/10"
          >
            Not now
          </button>
          <button
            onClick={onAllow}
            className="rounded-full bg-gradient-to-r from-teal-500 to-teal-400 px-4 py-1.5 text-xs font-semibold text-slate-950 hover:from-teal-400"
          >
            Allow location
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
