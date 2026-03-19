"use client";

import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ConnectedStatusBar } from "@/components/connected/ConnectedStatusBar";
import { connectedCalendarEventsByDate } from "@/lib/connected/mock";
import type { ConnectedTab } from "@/components/connected/ConnectedBottomNav";

type Props = { onNavigate: (t: ConnectedTab) => void };

function dateKey(y: number, monthIndex: number, day: number) {
  return `${y}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

type ManualBlock = { id: string; title: string; time: string };

export function CalendarScreen({ onNavigate }: Props) {
  const [month, setMonth] = useState(new Date(2025, 5, 1));
  const [selected, setSelected] = useState(1);
  const [manualByDate, setManualByDate] = useState<Record<string, ManualBlock[]>>(
    {},
  );
  const [blockOpen, setBlockOpen] = useState(false);
  const [blockTitle, setBlockTitle] = useState("");
  const [blockTime, setBlockTime] = useState("");

  const { grid, labels } = useMemo(() => buildMonthGrid(month), [month]);

  useEffect(() => {
    const last = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    setSelected((s) => Math.min(Math.max(1, s), last));
  }, [month]);

  const y = month.getFullYear();
  const m = month.getMonth();
  const key = dateKey(y, m, selected);
  const selectedDate = new Date(y, m, selected);
  const dayHeading = selectedDate.toLocaleDateString("default", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const calendarEvents = connectedCalendarEventsByDate[key] ?? [];
  const manualBlocks = manualByDate[key] ?? [];

  const title = month.toLocaleString("default", { month: "long", year: "numeric" });

  const addManualBlock = () => {
    const t = blockTitle.trim() || "Busy";
    const tm = blockTime.trim() || "All day";
    setManualByDate((prev) => ({
      ...prev,
      [key]: [
        ...(prev[key] ?? []),
        { id: `${Date.now()}`, title: t, time: tm },
      ],
    }));
    setBlockTitle("");
    setBlockTime("");
    setBlockOpen(false);
  };

  return (
    <div className="flex h-[calc(100dvh-5.75rem)] max-h-[calc(100dvh-5.75rem)] min-h-0 flex-col overflow-hidden bg-[#f5f2eb]">
      <ConnectedStatusBar />
      <header className="flex shrink-0 items-center gap-1 px-4 pb-2 pr-14">
        <button
          type="button"
          className="shrink-0 p-2"
          aria-label="Prev month"
          onClick={() => setMonth(new Date(y, m - 1, 1))}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="min-w-0 flex-1 truncate text-center text-lg font-bold text-neutral-900">
          {title}
        </h1>
        <button
          type="button"
          className="shrink-0 p-2"
          aria-label="Next month"
          onClick={() => setMonth(new Date(y, m + 1, 1))}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </header>

      <div className="mx-4 shrink-0 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-[#e8e4dc]">
        <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[10px] font-semibold uppercase text-neutral-400">
          {labels.map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {grid.map((cell, i) =>
            cell === null ? (
              <span key={`e-${i}`} className="aspect-square" />
            ) : (
              <button
                key={cell}
                type="button"
                onClick={() => setSelected(cell)}
                className={`relative flex aspect-square items-center justify-center rounded-xl text-sm font-semibold transition-colors ${
                  selected === cell
                    ? "bg-[#5a7d5a] text-white shadow-sm"
                    : "text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200"
                }`}
              >
                {cell}
              </button>
            ),
          )}
        </div>
      </div>

      <div className="mt-3 min-h-0 flex-1 overflow-y-auto px-4 pb-28 [-webkit-overflow-scrolling:touch]">
        <h2 className="mb-3 text-lg font-bold text-neutral-900">{dayHeading}</h2>

        <section className="mb-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-neutral-500">
            From connected calendars
          </p>
          {calendarEvents.length === 0 ? (
            <p className="rounded-xl bg-white px-4 py-3 text-sm text-neutral-500 ring-1 ring-[#e8e4dc]">
              No events from Apple or Google Calendar on this day.
            </p>
          ) : (
            <ul className="space-y-2">
              {calendarEvents.map((ev, i) => (
                <li
                  key={`${ev.title}-${i}`}
                  className="rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-[#e8e4dc]"
                >
                  <p className="font-semibold text-neutral-900">{ev.title}</p>
                  <p className="text-sm text-neutral-500">{ev.time}</p>
                  <p className="mt-1 text-xs font-medium text-[#4a6b4a]">{ev.calendar}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mb-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-xs font-bold uppercase tracking-wide text-neutral-500">
              Your time blocks
            </p>
            <span className="text-[10px] text-neutral-400">Not synced to Calendar</span>
          </div>
          {manualBlocks.length === 0 ? (
            <p className="rounded-xl bg-[#f0ede6] px-4 py-3 text-sm text-neutral-500 ring-1 ring-[#e0dcd0]">
              No personal blocks. Tap + to block time for yourself.
            </p>
          ) : (
            <ul className="space-y-2">
              {manualBlocks.map((b) => (
                <li
                  key={b.id}
                  className="flex items-start gap-2 rounded-xl bg-[#eef4ee] px-4 py-3 ring-1 ring-[#c5d4c5]"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-neutral-900">{b.title}</p>
                    <p className="text-sm text-neutral-600">{b.time}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setManualByDate((prev) => ({
                        ...prev,
                        [key]: (prev[key] ?? []).filter((x) => x.id !== b.id),
                      }))
                    }
                    className="shrink-0 rounded-full p-1 text-neutral-400 hover:bg-white/80"
                    aria-label="Remove block"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <button
          type="button"
          onClick={() => setBlockOpen(true)}
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#a8bda8] bg-white py-3.5 text-sm font-bold text-[#3d523d] active:bg-[#f5f2eb]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5a7d5a] text-white">
            <Plus className="h-5 w-5" strokeWidth={2.5} />
          </span>
          Block time (personal)
        </button>

        <button
          type="button"
          onClick={() => onNavigate("friends")}
          className="w-full rounded-2xl bg-[#5a7d5a] py-3 text-sm font-bold text-white"
        >
          See who&apos;s free
        </button>
      </div>

      {blockOpen && (
        <div className="fixed inset-0 z-[85] flex items-end justify-center bg-black/40 sm:items-center">
          <button
            type="button"
            className="absolute inset-0 h-[40%] sm:h-full"
            aria-label="Close"
            onClick={() => setBlockOpen(false)}
          />
          <div className="relative w-full max-w-[430px] rounded-t-3xl bg-[#faf8f4] p-5 shadow-2xl sm:rounded-3xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-neutral-900">Block time</h3>
              <button
                type="button"
                onClick={() => setBlockOpen(false)}
                className="rounded-full p-2 hover:bg-neutral-200/80"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mb-3 text-xs text-neutral-500">
              Adds a personal hold — not written to Apple or Google Calendar in this
              demo.
            </p>
            <label className="mb-2 block text-xs font-semibold text-neutral-600">
              Label
            </label>
            <input
              value={blockTitle}
              onChange={(e) => setBlockTitle(e.target.value)}
              placeholder="e.g. Focus time, Heads down"
              className="mb-3 w-full rounded-xl border border-[#e0dcd0] bg-white px-3 py-2.5 text-sm outline-none ring-0 focus:border-[#5a7d5a]"
            />
            <label className="mb-2 block text-xs font-semibold text-neutral-600">
              Time
            </label>
            <input
              value={blockTime}
              onChange={(e) => setBlockTime(e.target.value)}
              placeholder="e.g. 2pm – 4pm"
              className="mb-4 w-full rounded-xl border border-[#e0dcd0] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#5a7d5a]"
            />
            <button
              type="button"
              onClick={addManualBlock}
              className="w-full rounded-full bg-[#5a7d5a] py-3.5 text-sm font-bold text-white"
            >
              Add block
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function buildMonthGrid(d: Date) {
  const y = d.getFullYear();
  const m = d.getMonth();
  const first = new Date(y, m, 1).getDay();
  const lastDate = new Date(y, m + 1, 0).getDate();
  const labels = ["S", "M", "T", "W", "T", "F", "S"];
  const grid: (number | null)[] = [];
  for (let i = 0; i < first; i++) grid.push(null);
  for (let day = 1; day <= lastDate; day++) grid.push(day);
  return { grid, labels };
}
