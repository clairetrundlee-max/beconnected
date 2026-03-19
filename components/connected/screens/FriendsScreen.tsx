"use client";

import { Check, Clock, Phone, Plus, Search, X } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { ConnectedStatusBar } from "@/components/connected/ConnectedStatusBar";
import {
  friendIdsFreeAtTimeSlot,
  friends,
  friendsScreenTimeSlots,
} from "@/lib/connected/mock";

type Filter = "free" | "all" | "time";

type Props = {
  title?: string;
  showInviteButtons?: boolean;
  onInviteAll?: () => void;
  /** Shown after tapping Invite on Feed */
  inviteFromFeed?: boolean;
  onDismissInviteHint?: () => void;
  onCreateGroup?: (memberNames: string[]) => void;
};

export function FriendsScreen({
  title,
  showInviteButtons,
  onInviteAll,
  inviteFromFeed,
  onDismissInviteHint,
  onCreateGroup,
}: Props) {
  const [filter, setFilter] = useState<Filter>("free");
  const [timeSlotId, setTimeSlotId] = useState<string | null>(null);
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const [groupPick, setGroupPick] = useState<Set<string>>(() => new Set());

  const chips: { id: Filter; label: string }[] = [
    { id: "free", label: "Free Now" },
    { id: "all", label: "All Friends" },
    { id: "time", label: "Select time" },
  ];

  const slotLabel = useMemo(
    () => friendsScreenTimeSlots.find((s) => s.id === timeSlotId)?.label ?? null,
    [timeSlotId],
  );

  const friendsForView = useMemo(() => {
    if (filter === "all") return friends;
    if (filter === "free") return friends.filter((f) => f.free);
    if (filter === "time" && timeSlotId) {
      const ids = new Set(friendIdsFreeAtTimeSlot[timeSlotId] ?? []);
      return friends.filter((f) => ids.has(f.id));
    }
    if (filter === "time") return [];
    return friends;
  }, [filter, timeSlotId]);

  const freeBubbles = friendsForView;

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#f5f2eb]">
      <ConnectedStatusBar />
      <header className="flex items-center justify-between px-4 pb-2 pr-14">
        <h1 className="text-xl font-bold text-neutral-900">
          {title ?? "Friends"}
        </h1>
        <span className="text-sm text-neutral-500">Sat June 1</span>
      </header>

      {!showInviteButtons && (
        <div className="mb-3 flex flex-wrap gap-2 px-4">
          {chips.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                if (c.id === "time") {
                  setFilter("time");
                  setTimePickerOpen(true);
                } else {
                  setFilter(c.id);
                  setTimeSlotId(null);
                }
              }}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                filter === c.id
                  ? "bg-[#5a7d5a] text-white"
                  : "bg-white text-neutral-600 ring-1 ring-[#e0dcd0]"
              }`}
            >
              {c.id === "time" && timeSlotId && filter === "time"
                ? `Select time · ${slotLabel}`
                : c.label}
            </button>
          ))}
        </div>
      )}

      {!showInviteButtons && (
        <div className="mx-4 mb-3 rounded-xl bg-[#5a7d5a] px-4 py-3 text-center text-sm font-bold text-white">
          {filter === "time" && timeSlotId ? (
            <>
              SAT JUNE 1 · {slotLabel?.toUpperCase()} ·{" "}
              {friendsForView.length} FRIEND
              {friendsForView.length !== 1 ? "S" : ""} FREE
            </>
          ) : filter === "time" ? (
            <>PICK A TIME · SAT JUNE 1</>
          ) : (
            <>FREE THIS WEEKEND · 36 FRIENDS</>
          )}
        </div>
      )}

      {timePickerOpen && !showInviteButtons && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 pb-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="time-picker-title"
        >
          <div className="w-full max-w-[400px] overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-[#e8e4dc]">
            <div className="flex items-center justify-between border-b border-[#e8e4dc] px-4 py-3">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#5a7d5a]" />
                <h2
                  id="time-picker-title"
                  className="text-base font-bold text-neutral-900"
                >
                  Select time · Sat June 1
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setTimePickerOpen(false)}
                className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="px-4 pt-3 text-sm text-neutral-500">
              Friends free during that window will show below.
            </p>
            <ul className="max-h-[min(52vh,320px)] overflow-y-auto p-2">
              {friendsScreenTimeSlots.map((slot) => (
                <li key={slot.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setTimeSlotId(slot.id);
                      setTimePickerOpen(false);
                    }}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-base font-semibold text-neutral-900 hover:bg-[#eef4ee] active:bg-[#dce8dc]"
                  >
                    {slot.label}
                    <span className="text-sm font-medium text-[#5a7d5a]">
                      {(friendIdsFreeAtTimeSlot[slot.id] ?? []).length} free
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="mb-3 flex min-h-[88px] gap-3 overflow-x-auto px-4 pb-1">
        {filter === "time" && !timeSlotId && (
          <p className="flex items-center px-1 text-sm text-neutral-500">
            Choose a time slot to see who’s free.
          </p>
        )}
        {freeBubbles.map((f) => (
          <button
            key={f.id}
            type="button"
            className="flex shrink-0 flex-col items-center gap-1"
          >
            <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-[#c5d4c5]">
              <Image src={f.avatar} alt="" fill className="object-cover" sizes="64px" />
              <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs shadow">
                {f.emoji}
              </span>
            </div>
            <span className="max-w-[64px] truncate text-[10px] text-neutral-600">
              {f.name.split(" ")[0]}
            </span>
          </button>
        ))}
      </div>

      {inviteFromFeed && !showInviteButtons && (
        <div className="mx-4 mb-2 flex items-start justify-between gap-2 rounded-xl bg-[#eef4ee] px-3 py-2.5 ring-1 ring-[#c5d4c5]">
          <p className="text-sm font-medium leading-snug text-[#2d402d]">
            Tap <span className="font-bold">+</span> to select friends, then{" "}
            <span className="font-bold">Create group</span>. Or call from the
            phone icon.
          </p>
          {onDismissInviteHint && (
            <button
              type="button"
              onClick={onDismissInviteHint}
              className="shrink-0 text-xs font-semibold text-[#5a7d5a] underline"
            >
              Dismiss
            </button>
          )}
        </div>
      )}

      <div className="mx-4 mb-3">
        <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 ring-1 ring-[#e8e4dc]">
          <Search className="h-5 w-5 text-neutral-400" />
          <input
            type="search"
            placeholder="Search friends…"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-4 pb-28">
        {filter === "time" && !timeSlotId && (
          <p className="rounded-xl bg-white px-4 py-8 text-center text-sm leading-relaxed text-neutral-500 ring-1 ring-[#e8e4dc]">
            Tap <span className="font-semibold text-[#5a7d5a]">Select time</span>{" "}
            and pick a window — friends free then appear below.
          </p>
        )}
        {filter === "time" && timeSlotId && friendsForView.length === 0 && (
          <p className="rounded-xl bg-white px-4 py-6 text-center text-sm text-neutral-500 ring-1 ring-[#e8e4dc]">
            No friends free in that window.
          </p>
        )}
        {friendsForView.map((f) => (
          <div
            key={f.id}
            className="flex items-center gap-2 rounded-xl bg-white p-3 shadow-sm ring-1 ring-[#e8e4dc]"
          >
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
              <Image src={f.avatar} alt="" fill className="object-cover" sizes="48px" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-neutral-900">{f.name}</p>
              <p
                className={`text-sm ${f.free ? "text-[#4a6b4a]" : "text-amber-700"}`}
              >
                {f.status}
              </p>
            </div>
            {f.isNew && !showInviteButtons && (
              <span className="shrink-0 rounded-full bg-[#eef4ee] px-2 py-0.5 text-[10px] font-semibold text-[#4a6b4a]">
                New
              </span>
            )}
            <div className="flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                onClick={() =>
                  setGroupPick((prev) => {
                    const next = new Set(prev);
                    if (next.has(f.id)) next.delete(f.id);
                    else next.add(f.id);
                    return next;
                  })
                }
                className={`flex h-10 w-10 items-center justify-center rounded-full shadow-sm ring-1 ring-[#c5d4c5] active:scale-95 ${
                  groupPick.has(f.id)
                    ? "bg-[#5a7d5a] text-white"
                    : "bg-[#dce8dc] text-[#2d402d] active:bg-[#c5d4c5]"
                }`}
                aria-label={
                  groupPick.has(f.id)
                    ? `Remove ${f.name} from group pick`
                    : `Add ${f.name} to group pick`
                }
                title={groupPick.has(f.id) ? "Selected" : "Add to group"}
              >
                {groupPick.has(f.id) ? (
                  <Check className="h-5 w-5" strokeWidth={2.75} />
                ) : (
                  <Plus className="h-5 w-5" strokeWidth={2.5} />
                )}
              </button>
              <a
                href={`tel:${f.phone.replace(/\s/g, "")}`}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#4a6b4a] shadow-sm ring-1 ring-[#e0dcd0] active:bg-[#f5f2eb]"
                aria-label={`Phone — open ${f.name} in Phone (contact if saved)`}
                title="Open in Phone"
              >
                <Phone className="h-5 w-5" strokeWidth={2} />
              </a>
            </div>
            {showInviteButtons && (
              <button
                type="button"
                className="shrink-0 rounded-full bg-[#5a7d5a] px-3 py-1.5 text-xs font-bold text-white"
              >
                Invite!
              </button>
            )}
          </div>
        ))}
      </div>

      {onCreateGroup && groupPick.size > 0 && (
        <div className="fixed bottom-20 left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2 space-y-2 px-4">
          <button
            type="button"
            onClick={() =>
              onCreateGroup(
                friends.filter((f) => groupPick.has(f.id)).map((f) => f.name),
              )
            }
            className="w-full rounded-full bg-[#3d523d] py-3.5 text-center text-base font-bold text-white shadow-lg"
          >
            Create group ({groupPick.size})
          </button>
        </div>
      )}

      {showInviteButtons && onInviteAll && (
        <div
          className={`fixed left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2 px-4 ${onCreateGroup && groupPick.size > 0 ? "bottom-36" : "bottom-20"}`}
        >
          <button
            type="button"
            onClick={onInviteAll}
            className="w-full rounded-full bg-[#5a7d5a] py-4 text-center text-base font-bold text-white shadow-lg"
          >
            Invite all 9 free friends
          </button>
        </div>
      )}
    </div>
  );
}
