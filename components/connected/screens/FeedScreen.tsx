"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { FeedSpotArchiveModal } from "@/components/connected/FeedSpotArchiveModal";
import { FeedStoryViewer } from "@/components/connected/FeedStoryViewer";
import { ConnectedStatusBar } from "@/components/connected/ConnectedStatusBar";
import {
  discoverEventById,
  feedEventIsRestaurantOption,
  feedPosts,
  storyRow,
} from "@/lib/connected/mock";

type Props = {
  focusEventId: string | null;
  onFocusConsumed: () => void;
  /** Opens Friends tab to pick who to invite */
  onInviteToFriends: () => void;
};

export function FeedScreen({
  focusEventId,
  onFocusConsumed,
  onInviteToFriends,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [pulseId, setPulseId] = useState<string | null>(null);
  const [joinedIds, setJoinedIds] = useState<Set<string>>(() => new Set());
  const [spotArchiveEventId, setSpotArchiveEventId] = useState<string | null>(
    null,
  );
  const [storyViewer, setStoryViewer] = useState<{
    locationIndex: number;
  } | null>(null);

  const storyEventIds = useMemo(
    () =>
      storyRow
        .filter(
          (s): s is { id: string; eventId: string } => "eventId" in s,
        )
        .map((s) => s.eventId),
    [],
  );

  const toggleJoined = (postId: string) => {
    setJoinedIds((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
  };

  useEffect(() => {
    if (!focusEventId) return;
    const id = window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          const root = scrollRef.current;
          const el = document.getElementById(`feed-event-${focusEventId}`);
          if (root && el) {
            const y =
              el.getBoundingClientRect().top -
              root.getBoundingClientRect().top +
              root.scrollTop -
              16;
            root.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
            setPulseId(focusEventId);
            window.setTimeout(() => setPulseId(null), 2400);
          }
          onFocusConsumed();
        });
      });
    }, 80);
    return () => window.clearTimeout(id);
  }, [focusEventId, onFocusConsumed]);

  const ring = (eventId: string) =>
    pulseId === eventId
      ? "ring-4 ring-[#5a7d5a] ring-offset-2 ring-offset-[#f5f2eb] transition-shadow"
      : "";

  return (
    <div className="flex h-[calc(100dvh-5.75rem)] max-h-[calc(100dvh-5.75rem)] flex-col overflow-hidden bg-[#f5f2eb]">
      <ConnectedStatusBar />
      <header className="flex items-center justify-between px-4 pb-2 pr-14">
        <h1 className="text-xl font-bold tracking-tight text-neutral-900">
          Connected.
        </h1>
      </header>

      <div className="mb-4 flex gap-3 overflow-x-auto px-4 pb-1">
        {storyRow.map((s) => {
          if ("eventId" in s) {
            const ev = discoverEventById(s.eventId);
            const spotTitle = ev?.title ?? "Spot";
            const hero = ev?.image;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() =>
                  setStoryViewer({
                    locationIndex: Math.max(
                      0,
                      storyEventIds.indexOf(s.eventId),
                    ),
                  })
                }
                className="flex shrink-0 flex-col items-center gap-1 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5a7d5a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f2eb]"
                aria-label={`Story posts at ${spotTitle}`}
              >
                <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-[#7a9a7a] ring-offset-2 ring-offset-[#f5f2eb]">
                  {hero ? (
                    <Image
                      src={hero}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-neutral-200 text-xs font-semibold text-neutral-500">
                      {spotTitle.slice(0, 2)}
                    </div>
                  )}
                </div>
                <span className="max-w-[72px] line-clamp-2 text-center text-[10px] leading-tight text-neutral-600">
                  {spotTitle}
                </span>
              </button>
            );
          }
          return (
            <button
              key={s.id}
              type="button"
              className="flex shrink-0 flex-col items-center gap-1"
              aria-label="Add a post"
            >
              <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-[#7a9a7a] ring-offset-2 ring-offset-[#f5f2eb]">
                <div className="flex h-full w-full items-center justify-center bg-neutral-200 text-2xl text-neutral-500">
                  +
                </div>
              </div>
              <span className="max-w-[72px] truncate text-center text-[10px] text-neutral-600">
                {s.label ?? "Post"}
              </span>
            </button>
          );
        })}
      </div>

      <div
        ref={scrollRef}
        className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 pb-28"
      >
        {feedPosts.map((post) => {
          const ev = discoverEventById(post.eventId);
          const hero = ev?.image;
          return (
            <div
              key={post.id}
              id={`feed-event-${post.eventId}`}
              className={`overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#e8e4dc] ${ring(post.eventId)}`}
            >
              <button
                type="button"
                onClick={() => setSpotArchiveEventId(post.eventId)}
                className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#5a7d5a]"
              >
                <div className="relative aspect-[16/9] w-full bg-neutral-100">
                  {hero ? (
                    <Image
                      src={hero}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width:430px) 100vw, 400px"
                    />
                  ) : null}
                  <span className="absolute bottom-2 right-2 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
                    Tap for story posts
                  </span>
                </div>
                <div className="flex gap-3 p-4">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={post.avatar}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-neutral-900">
                      {post.headline}
                    </p>
                    <p className="text-sm text-neutral-500">{post.sub}</p>
                  </div>
                </div>
              </button>
              <div className="flex flex-wrap items-center gap-2 border-t border-[#e8e4dc] px-4 pb-4 pt-3">
                <button
                  type="button"
                  onClick={() => toggleJoined(post.id)}
                  aria-pressed={joinedIds.has(post.id)}
                  className={`flex min-w-[5.5rem] items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                    joinedIds.has(post.id)
                      ? "bg-[#3d523d] text-white"
                      : "bg-[#5a7d5a] text-white"
                  }`}
                >
                  {joinedIds.has(post.id) ? (
                    <>
                      <Check className="h-5 w-5" strokeWidth={2.5} />
                      <span>Going</span>
                    </>
                  ) : (
                    "Join"
                  )}
                </button>
                <button
                  type="button"
                  onClick={onInviteToFriends}
                  className="rounded-full bg-white px-5 py-2 text-sm font-bold text-[#3d523d] ring-2 ring-[#5a7d5a] ring-offset-1 ring-offset-white active:bg-[#eef4ee]"
                >
                  Invite
                </button>
                {feedEventIsRestaurantOption(post.eventId) && (
                  <a
                    href="https://www.inkind.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full bg-gradient-to-b from-amber-300 to-amber-500 px-5 py-2 text-sm font-bold text-amber-950 shadow-sm ring-1 ring-amber-600/30 active:opacity-90"
                  >
                    inKind
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <FeedStoryViewer
        open={storyViewer !== null}
        eventIds={storyEventIds}
        initialLocationIndex={storyViewer?.locationIndex ?? 0}
        onClose={() => setStoryViewer(null)}
      />

      <FeedSpotArchiveModal
        eventId={spotArchiveEventId}
        onClose={() => setSpotArchiveEventId(null)}
      />
    </div>
  );
}
