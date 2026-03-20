"use client";

import { Check, Phone, Plus, Search } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import {
  FriendsTimePickerModal,
  type FriendsTimePick,
} from "@/components/connected/FriendsTimePickerModal";
import { FriendProfileModal } from "@/components/connected/FriendProfileModal";
import { ConnectedStatusBar } from "@/components/connected/ConnectedStatusBar";
import {
  buildFriendsPickerDays,
  formatFriendsScreenTimeRange,
  friends,
  friendsScreenClockToMinutes,
  friendsScreenFriendIdsForMinutesRange,
  friendsScreenSlotSummaryForRange,
} from "@/lib/connected/mock";

type Filter = "free" | "all" | "time";

type Props = {
  title?: string;
  showInviteButtons?: boolean;
  onInviteAll?: () => void;
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
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const [selectedDateId, setSelectedDateId] = useState<string | null>(null);
  const [timePick, setTimePick] = useState<FriendsTimePick | null>(null);
  const [groupPick, setGroupPick] = useState<Set<string>>(() => new Set());
  const [profileFriendId, setProfileFriendId] = useState<string | null>(null);

  const friendPickerDates = useMemo(
    () => buildFriendsPickerDays(new Date(), 28),
    [timePickerOpen],
  );

  const profileFriend = useMemo(
    () =>
      profileFriendId
        ? (friends.find((f) => f.id === profileFriendId) ?? null)
        : null,
    [profileFriendId],
  );

  const chips: { id: Filter; label: string }[] = [
    { id: "free", label: "Free Now" },
    { id: "all", label: "All Friends" },
    { id: "time", label: "Select time" },
  ];

  const selectedDateLabel = useMemo(() => {
    if (!selectedDateId) return null;
    const d = friendPickerDates.find((x) => x.id === selectedDateId);
    return d ? `${d.day} ${d.month} ${d.date}` : null;
  }, [selectedDateId, friendPickerDates]);

  const timeRangeLabel = useMemo(() => {
    if (!timePick) return null;
    return formatFriendsScreenTimeRange(timePick.start, timePick.end);
  }, [timePick]);

  const slotLabel = useMemo(() => {
    if (!timePick) return null;
    return friendsScreenSlotSummaryForRange(
      friendsScreenClockToMinutes(
        timePick.start.hour12,
        timePick.start.minute,
        timePick.start.ampm,
      ),
      friendsScreenClockToMinutes(
        timePick.end.hour12,
        timePick.end.minute,
        timePick.end.ampm,
      ),
    );
  }, [timePick]);

  const friendsForView = useMemo(() => {
    if (filter === "all") return friends;
    if (filter === "free") return friends.filter((f) => f.free);
    if (filter === "time" && timePick) {
      const startMin = friendsScreenClockToMinutes(
        timePick.start.hour12,
        timePick.start.minute,
        timePick.start.ampm,
      );
      const endMin = friendsScreenClockToMinutes(
        timePick.end.hour12,
        timePick.end.minute,
        timePick.end.ampm,
      );
      const ids = new Set(
        friendsScreenFriendIdsForMinutesRange(startMin, endMin),
      );
      return friends.filter((f) => ids.has(f.id));
    }
    if (filter === "time") return [];
    return friends;
  }, [filter, timePick]);

  const freeBubbles = friendsForView;

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#f5f2eb]">
      <ConnectedStatusBar />
      <header className="flex items-center justify-between px-4 pb-2 pr-14">
        <h1 className="text-xl font-bold text-neutral-900">
          {title ?? "Friends"}
        </h1>
        <span className="text-sm text-neutral-500">
          {filter === "time" && selectedDateLabel
            ? selectedDateLabel
            : filter === "time" && friendPickerDates[0]
              ? `${friendPickerDates[0].day} ${friendPickerDates[0].month} ${friendPickerDates[0].date}`
              : "Sat June 1"}
        </span>
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
                  setSelectedDateId(null);
                  setTimePick(null);
                }
              }}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                filter === c.id
                  ? "bg-[#5a7d5a] text-white"
                  : "bg-white text-neutral-600 ring-1 ring-[#e0dcd0]"
              }`}
            >
              {c.id === "time" && timePick && filter === "time"
                ? `Select time · ${formatFriendsScreenTimeRange(timePick.start, timePick.end)}`
                : c.label}
            </button>
          ))}
        </div>
      )}

      {!showInviteButtons && filter === "time" && (
        <div className="mx-4 mb-3 rounded-xl bg-[#5a7d5a] px-4 py-3 text-center text-sm font-bold text-white">
          {timePick && selectedDateLabel && timeRangeLabel ? (
            <>
              {selectedDateLabel.toUpperCase()} ·{" "}
              {timeRangeLabel.toUpperCase()}
              {slotLabel ? ` · ${slotLabel.toUpperCase()}` : ""} ·{" "}
              {friendsForView.length} FRIEND
              {friendsForView.length !== 1 ? "S" : ""} FREE
            </>
          ) : (
            <>PICK A DATE &amp; TIME</>
          )}
        </div>
      )}

      {timePickerOpen && !showInviteButtons && (
        <FriendsTimePickerModal
          open={timePickerOpen}
          onClose={() => setTimePickerOpen(false)}
          dates={friendPickerDates}
          initial={timePick}
          onApply={(pick) => {
            setTimePick(pick);
            setSelectedDateId(pick.dateId);
          }}
        />
      )}

      <div className="mb-3 flex min-h-[88px] gap-3 overflow-x-auto px-4 pb-1">
        {filter === "time" && !timePick && (
          <p className="flex items-center px-1 text-sm text-neutral-500">
            Choose a start and end time to see who’s free.
          </p>
        )}
        {freeBubbles.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setProfileFriendId(f.id)}
            className="flex shrink-0 flex-col items-center gap-1 rounded-xl pb-1 pt-0.5 outline-none ring-[#5a7d5a] focus-visible:ring-2"
            aria-label={`${f.name} profile`}
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
        {filter === "time" && !timePick && (
          <p className="rounded-xl bg-white px-4 py-8 text-center text-sm leading-relaxed text-neutral-500 ring-1 ring-[#e8e4dc]">
            Tap <span className="font-semibold text-[#5a7d5a]">Select time</span>{" "}
            and set a start and end time — friends free for that whole range
            appear below.
          </p>
        )}
        {filter === "time" && timePick && friendsForView.length === 0 && (
          <p className="rounded-xl bg-white px-4 py-6 text-center text-sm text-neutral-500 ring-1 ring-[#e8e4dc]">
            No friends free in that window.
          </p>
        )}
        {friendsForView.map((f) => (
          <div
            key={f.id}
            className="flex items-center gap-2 rounded-xl bg-white p-3 shadow-sm ring-1 ring-[#e8e4dc]"
          >
            <button
              type="button"
              onClick={() => setProfileFriendId(f.id)}
              className="flex min-w-0 flex-1 items-center gap-2 rounded-lg text-left outline-none ring-[#5a7d5a] focus-visible:ring-2"
              aria-label={`${f.name} profile`}
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
            </button>
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

      <FriendProfileModal
        friend={profileFriend}
        onClose={() => setProfileFriendId(null)}
      />
    </div>
  );
}
