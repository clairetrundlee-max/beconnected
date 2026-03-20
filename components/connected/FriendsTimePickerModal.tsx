"use client";

import { Clock, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import {
  type FriendsScreenDateOption,
  friendsScreenClockToMinutes,
} from "@/lib/connected/mock";

const ITEM_H = 40;
const TIME_COL_H = 140;

const HOURS = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const;
const MINUTES = Array.from({ length: 60 }, (_, i) => i);
const AMPM = ["AM", "PM"] as const;

type AmPm = (typeof AMPM)[number];

export type FriendsClockPick = {
  hour12: number;
  minute: number;
  ampm: AmPm;
};

export type FriendsTimePick = {
  dateId: string;
  start: FriendsClockPick;
  end: FriendsClockPick;
};

type Props = {
  open: boolean;
  onClose: () => void;
  dates: FriendsScreenDateOption[];
  initial: FriendsTimePick | null;
  onApply: (pick: FriendsTimePick) => void;
};

function useSnapColumnCommit(
  ref: RefObject<HTMLDivElement | null>,
  onCommit: () => void,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let t: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(t);
      t = setTimeout(onCommit, 100);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      el.removeEventListener("scroll", onScroll);
    };
  }, [ref, onCommit]);
}

function SnapColumn<T extends string | number>({
  items,
  value,
  onCommit,
  label,
  format,
  wheelKey,
  colH,
}: {
  items: readonly T[];
  value: T;
  onCommit: (v: T) => void;
  label: string;
  format: (v: T) => string;
  wheelKey: number;
  colH: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const index = Math.max(0, items.indexOf(value));
  const pad = (colH - ITEM_H) / 2;

  const snapRead = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const i = Math.round(el.scrollTop / ITEM_H);
    const clamped = Math.max(0, Math.min(items.length - 1, i));
    onCommit(items[clamped]);
  }, [items, onCommit]);

  useSnapColumnCommit(ref, snapRead);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.scrollTop = index * ITEM_H;
  }, [index, wheelKey]);

  return (
    <div className="relative flex min-w-0 flex-1 flex-col">
      {label ? (
        <span className="mb-1 text-center text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
          {label}
        </span>
      ) : (
        <span className="mb-1 block h-4" aria-hidden />
      )}
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-10 -translate-y-1/2 border-y border-[#dce8dc] bg-[#5a7d5a]/[0.06]"
          aria-hidden
        />
        <div
          ref={ref}
          className="relative overflow-y-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ height: colH, scrollSnapType: "y mandatory" }}
        >
          <div style={{ paddingTop: pad, paddingBottom: pad }}>
            {items.map((item) => {
              const selected = item === value;
              return (
                <div
                  key={String(item)}
                  className="flex h-10 shrink-0 snap-center items-center justify-center text-base font-semibold tabular-nums"
                >
                  <span
                    className={
                      selected ? "text-neutral-900" : "text-neutral-400"
                    }
                  >
                    {format(item)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ScrollableDateRow({
  dates,
  dateId,
  onSelect,
  scrollAlignKey,
}: {
  dates: FriendsScreenDateOption[];
  dateId: string;
  onSelect: (id: string) => void;
  scrollAlignKey: number;
}) {
  const selectedRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    selectedRef.current?.scrollIntoView({
      inline: "center",
      block: "nearest",
    });
  }, [dateId, scrollAlignKey]);

  return (
    <div className="mb-3">
      <span className="mb-2 block text-center text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
        Date
      </span>
      <div
        className="-mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#c5d4c5]"
        role="listbox"
        aria-label="Choose day — scroll sideways for more"
      >
        {dates.map((d) => {
          const selected = d.id === dateId;
          return (
            <button
              key={d.id}
              ref={selected ? selectedRef : undefined}
              type="button"
              role="option"
              aria-selected={selected}
              onClick={() => onSelect(d.id)}
              className={`w-[calc((100%-1rem)/3)] min-w-[calc((100%-1rem)/3)] max-w-[132px] shrink-0 snap-center rounded-xl px-1 py-2.5 text-center text-xs font-semibold leading-tight ring-1 transition-colors active:scale-[0.98] ${
                selected
                  ? "bg-[#5a7d5a] text-white ring-[#5a7d5a]"
                  : "bg-[#faf8f4] text-neutral-700 ring-[#e8e4dc] hover:bg-[#eef4ee]"
              }`}
            >
              <span className="block text-[10px] font-bold uppercase tracking-wide opacity-90">
                {d.day}
              </span>
              <span className="mt-0.5 block text-[13px] tabular-nums">
                {d.month} {d.date}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TimeWheels({
  title,
  wheelKey,
  colH,
  hour12,
  setHour12,
  minute,
  setMinute,
  ampm,
  setAmpm,
}: {
  title: string;
  wheelKey: number;
  colH: number;
  hour12: number;
  setHour12: (v: number) => void;
  minute: number;
  setMinute: (v: number) => void;
  ampm: AmPm;
  setAmpm: (v: AmPm) => void;
}) {
  return (
    <div className="border-t border-[#f0ebe3] pt-3 first:border-t-0 first:pt-0">
      <p className="mb-2 text-center text-xs font-bold uppercase tracking-wide text-[#5a7d5a]">
        {title}
      </p>
      <div className="flex gap-1">
        <SnapColumn
          wheelKey={wheelKey}
          colH={colH}
          items={HOURS}
          value={hour12 as (typeof HOURS)[number]}
          onCommit={(v) => setHour12(v)}
          label="Hour"
          format={(h) => String(h)}
        />
        <SnapColumn
          wheelKey={wheelKey}
          colH={colH}
          items={MINUTES}
          value={minute}
          onCommit={(v) => setMinute(v)}
          label="Min"
          format={(m) => m.toString().padStart(2, "0")}
        />
        <SnapColumn
          wheelKey={wheelKey}
          colH={colH}
          items={AMPM}
          value={ampm}
          onCommit={(v) => setAmpm(v)}
          label=""
          format={(a) => a}
        />
      </div>
    </div>
  );
}

export function FriendsTimePickerModal({
  open,
  onClose,
  dates,
  initial,
  onApply,
}: Props) {
  const defaultDateId = dates[0]?.id ?? "";
  const [dateId, setDateId] = useState(defaultDateId);
  const [startH, setStartH] = useState(6);
  const [startM, setStartM] = useState(0);
  const [startAp, setStartAp] = useState<AmPm>("PM");
  const [endH, setEndH] = useState(8);
  const [endM, setEndM] = useState(0);
  const [endAp, setEndAp] = useState<AmPm>("PM");
  const [wheelKey, setWheelKey] = useState(0);

  useEffect(() => {
    if (!open) return;
    setWheelKey((k) => k + 1);
    if (initial) {
      const idOk = dates.some((d) => d.id === initial.dateId);
      setDateId(idOk ? initial.dateId : defaultDateId);
      setStartH(initial.start.hour12);
      setStartM(initial.start.minute);
      setStartAp(initial.start.ampm);
      setEndH(initial.end.hour12);
      setEndM(initial.end.minute);
      setEndAp(initial.end.ampm);
    } else {
      setDateId(defaultDateId);
      setStartH(6);
      setStartM(0);
      setStartAp("PM");
      setEndH(8);
      setEndM(0);
      setEndAp("PM");
    }
  }, [open, initial, defaultDateId, dates]);

  const rangeValid = useMemo(() => {
    const a = friendsScreenClockToMinutes(startH, startM, startAp);
    const b = friendsScreenClockToMinutes(endH, endM, endAp);
    return b > a;
  }, [startH, startM, startAp, endH, endM, endAp]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 pb-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="friends-time-picker-title"
    >
      <div className="flex max-h-[min(88vh,620px)] w-full max-w-[400px] flex-col overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-[#e8e4dc]">
        <div className="flex shrink-0 items-center justify-between border-b border-[#e8e4dc] px-4 py-3">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#5a7d5a]" />
            <h2
              id="friends-time-picker-title"
              className="text-base font-bold text-neutral-900"
            >
              Select time
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="shrink-0 px-4 pt-3 text-sm text-neutral-500">
          Pick a date, then a start and end time. Friends free for the whole
          range show below.
        </p>

        <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-2 pt-3">
          <ScrollableDateRow
            dates={dates}
            dateId={dateId}
            onSelect={setDateId}
            scrollAlignKey={wheelKey}
          />

          <TimeWheels
            title="Starts"
            wheelKey={wheelKey}
            colH={TIME_COL_H}
            hour12={startH}
            setHour12={setStartH}
            minute={startM}
            setMinute={setStartM}
            ampm={startAp}
            setAmpm={setStartAp}
          />

          <TimeWheels
            title="Ends"
            wheelKey={wheelKey}
            colH={TIME_COL_H}
            hour12={endH}
            setHour12={setEndH}
            minute={endM}
            setMinute={setEndM}
            ampm={endAp}
            setAmpm={setEndAp}
          />

          {!rangeValid && (
            <p className="mt-2 px-2 text-center text-sm font-medium text-amber-800">
              End time must be after start time.
            </p>
          )}
        </div>

        <div className="flex shrink-0 gap-2 border-t border-[#e8e4dc] px-4 py-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-full py-3 text-sm font-semibold text-neutral-600 ring-1 ring-[#e0dcd0] hover:bg-neutral-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!rangeValid}
            onClick={() => {
              onApply({
                dateId,
                start: {
                  hour12: startH,
                  minute: startM,
                  ampm: startAp,
                },
                end: {
                  hour12: endH,
                  minute: endM,
                  ampm: endAp,
                },
              });
              onClose();
            }}
            className="flex-1 rounded-full bg-[#5a7d5a] py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-45"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
