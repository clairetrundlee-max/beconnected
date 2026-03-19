"use client";

import { CalendarDays, Home, Rss, Users, Zap } from "lucide-react";

export type ConnectedTab =
  | "home"
  | "calendar"
  | "friends"
  | "events"
  | "feed"
  | "settings";

type SideTab = Exclude<ConnectedTab, "home">;

const leftTabs: { id: SideTab; label: string; Icon: typeof CalendarDays }[] = [
  { id: "calendar", label: "Calendar", Icon: CalendarDays },
  { id: "friends", label: "Friends", Icon: Users },
];

const rightTabs: { id: SideTab; label: string; Icon: typeof Zap }[] = [
  { id: "events", label: "Events", Icon: Zap },
  { id: "feed", label: "Feed", Icon: Rss },
];

type Props = {
  active: ConnectedTab;
  onChange: (t: ConnectedTab) => void;
};

const activeClass = "text-[#4a6b4a]";
const idleClass = "text-neutral-400";

export function ConnectedBottomNav({ active, onChange }: Props) {
  const sideItem = (
    id: SideTab,
    label: string,
    Icon: typeof CalendarDays,
  ) => {
    const isOn = active === id;
    return (
      <button
        key={id}
        type="button"
        onClick={() => onChange(id)}
        className="flex min-w-0 flex-1 flex-col items-center gap-0.5 py-1"
      >
        <Icon
          className={`h-5 w-5 ${isOn ? activeClass : idleClass}`}
          strokeWidth={isOn ? 2.5 : 2}
        />
        <span
          className={`max-w-[52px] truncate text-[9px] font-medium ${isOn ? "text-[#3d523d]" : idleClass}`}
        >
          {label}
        </span>
      </button>
    );
  };

  return (
    <nav
      className="safe-bottom fixed bottom-0 left-1/2 z-40 flex w-full max-w-[430px] -translate-x-1/2 items-end border-t border-[#e0dcd0] bg-[#faf8f4] px-1 pb-1 pt-2 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]"
      style={{ paddingBottom: "max(0.35rem, env(safe-area-inset-bottom))" }}
      aria-label="Main"
    >
      <div className="flex min-w-0 flex-1 basis-0 items-end justify-around gap-0.5 pb-1">
        {leftTabs.map(({ id, label, Icon }) => sideItem(id, label, Icon))}
      </div>

      <div className="flex shrink-0 flex-col items-center px-1 pb-0.5">
        <button
          type="button"
          onClick={() => onChange("home")}
          className={`flex flex-col items-center justify-center rounded-full px-5 py-2.5 shadow-md transition-colors ${
            active === "home"
              ? "bg-[#5a7d5a] text-white"
              : "bg-[#dce8dc] text-[#3d523d] ring-1 ring-[#c5d4c5]"
          }`}
          aria-current={active === "home" ? "page" : undefined}
        >
          <Home className="h-6 w-6" strokeWidth={active === "home" ? 2.5 : 2} />
          <span className="mt-0.5 text-[9px] font-bold tracking-wide">Home</span>
        </button>
      </div>

      <div className="flex min-w-0 flex-1 basis-0 items-end justify-around gap-0.5 pb-1">
        {rightTabs.map(({ id, label, Icon }) => sideItem(id, label, Icon))}
      </div>
    </nav>
  );
}
