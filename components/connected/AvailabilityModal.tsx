"use client";

import {
  Calendar,
  Check,
  ChevronRight,
  Phone,
  Plus,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  type ProfileTimeBlock,
  homeSlotNavigateTab,
  phoneForFriendName,
} from "@/lib/connected/mock";

type Props = {
  open: boolean;
  onClose: () => void;
  dayHeading: string;
  block: ProfileTimeBlock;
  onSlotNavigate: (eventId: string, tab: "events" | "feed") => void;
  onCreateGroup?: (memberNames: string[]) => void;
};

export function AvailabilityModal({
  open,
  onClose,
  dayHeading,
  block,
  onSlotNavigate,
  onCreateGroup,
}: Props) {
  const [groupPick, setGroupPick] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    if (!open) setGroupPick(new Set());
  }, [open]);

  if (!open) return null;

  const friends = block.slotFriends ?? [];
  const events = block.slotEvents ?? [];
  const isEventOnly = block.muted === true;

  const togglePick = (name: string) => {
    setGroupPick((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const handleCreateGroup = () => {
    const names = friends.filter((f) => groupPick.has(f.name)).map((f) => f.name);
    onClose();
    onCreateGroup?.(names);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/40 sm:items-center">
      <button
        type="button"
        className="absolute inset-0 h-[45%] w-full sm:h-full"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="relative flex max-h-[85vh] w-full max-w-[430px] flex-col rounded-t-3xl bg-[#faf8f4] shadow-2xl sm:max-h-[80vh] sm:rounded-3xl">
        <div className="flex shrink-0 items-start justify-between border-b border-[#e8e4dc] px-5 pb-3 pt-5">
          <div className="min-w-0 pr-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#5a7d5a]">
              {dayHeading}
            </p>
            <h2 className="mt-1 text-lg font-bold text-neutral-900">
              {block.title}
            </h2>
            <p className="text-sm text-neutral-500">{block.time}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-200/80"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          {!isEventOnly && (
            <section className="mb-6">
              <div className="mb-3 flex items-center gap-2 text-sm font-bold text-neutral-800">
                <Users className="h-4 w-4 text-[#5a7d5a]" />
                Friends free this window
              </div>
              <p className="mb-2 text-[11px] text-neutral-500">
                Tap + to select, then Create group when ready.
              </p>
              {friends.length === 0 ? (
                <p className="rounded-xl bg-white px-4 py-3 text-sm text-neutral-500 ring-1 ring-[#e8e4dc]">
                  No friend matches in this slot yet.
                </p>
              ) : (
                <ul className="space-y-2">
                  {friends.map((f) => {
                    const phone = phoneForFriendName(f.name);
                    const picked = groupPick.has(f.name);
                    return (
                      <li
                        key={f.name}
                        className="flex items-center gap-2 rounded-xl bg-white p-3 ring-1 ring-[#e8e4dc]"
                      >
                        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                          <Image
                            src={f.avatar}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="44px"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-neutral-900">{f.name}</p>
                          {f.note && (
                            <p className="text-xs text-neutral-500">{f.note}</p>
                          )}
                        </div>
                        <div className="flex shrink-0 items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => togglePick(f.name)}
                            className={`flex h-10 w-10 items-center justify-center rounded-full shadow-sm active:scale-95 ${
                              picked
                                ? "bg-[#5a7d5a] text-white"
                                : "bg-[#dce8dc] text-[#2d402d] ring-1 ring-[#c5d4c5]"
                            }`}
                            aria-label={
                              picked ? `Remove ${f.name}` : `Add ${f.name}`
                            }
                          >
                            {picked ? (
                              <Check className="h-5 w-5" strokeWidth={2.75} />
                            ) : (
                              <Plus className="h-5 w-5" strokeWidth={2.5} />
                            )}
                          </button>
                          {phone && (
                            <a
                              href={`tel:${phone.replace(/\s/g, "")}`}
                              onClick={(e) => e.stopPropagation()}
                              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#4a6b4a] shadow-sm ring-1 ring-[#e0dcd0] active:bg-[#f5f2eb]"
                              aria-label={`Phone — ${f.name}`}
                              title="Open in Phone"
                            >
                              <Phone className="h-5 w-5" strokeWidth={2} />
                            </a>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          )}

          {isEventOnly && (
            <p className="mb-4 rounded-xl bg-[#eef4ee] px-3 py-2 text-xs text-[#3d523d]">
              You have something on the calendar during this time.
            </p>
          )}

          <section className={groupPick.size > 0 && onCreateGroup ? "pb-4" : ""}>
            <div className="mb-3 flex items-center gap-2 text-sm font-bold text-neutral-800">
              <Calendar className="h-4 w-4 text-[#5a7d5a]" />
              Events &amp; ideas
            </div>
            {events.length === 0 ? (
              <p className="rounded-xl bg-white px-4 py-3 text-sm text-neutral-500 ring-1 ring-[#e8e4dc]">
                No events matched to this window.
              </p>
            ) : (
              <ul className="space-y-2">
                {events.map((ev, i) => (
                  <li key={`${ev.eventId}-${i}`}>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSlotNavigate(
                          ev.eventId,
                          homeSlotNavigateTab(ev.eventId),
                        );
                      }}
                      className="flex w-full items-center gap-3 rounded-xl bg-white p-4 text-left ring-1 ring-[#e8e4dc] active:bg-[#f5f2eb]"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-neutral-900">{ev.title}</p>
                        <p className="text-sm text-[#5a7d5a]">{ev.time}</p>
                        {ev.detail && (
                          <p className="mt-1 text-xs text-neutral-500">{ev.detail}</p>
                        )}
                      </div>
                      <ChevronRight className="h-5 w-5 shrink-0 text-neutral-400" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {onCreateGroup && !isEventOnly && friends.length > 0 && groupPick.size > 0 && (
          <div className="shrink-0 border-t border-[#e8e4dc] bg-[#faf8f4] px-5 py-4">
            <button
              type="button"
              onClick={handleCreateGroup}
              className="w-full rounded-full bg-[#3d523d] py-3.5 text-sm font-bold text-white shadow-md"
            >
              Create group ({groupPick.size})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
