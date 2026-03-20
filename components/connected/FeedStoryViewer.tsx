"use client";

import { X } from "lucide-react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { useSpotStoryPosts } from "@/components/connected/SpotStoryPostsContext";
import {
  discoverEventById,
  feedSpotPastPostsForEvent,
  type FeedSpotPastPost,
} from "@/lib/connected/mock";

type Props = {
  open: boolean;
  eventIds: string[];
  initialLocationIndex: number;
  onClose: () => void;
};

function StoryFillImage({ src, alt }: { src: string; alt: string }) {
  if (src.startsWith("blob:")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- user capture; blob URLs
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      sizes="100vw"
      priority
    />
  );
}

function mergePostsForEvent(
  eventId: string,
  userPostsByEventId: Record<string, FeedSpotPastPost[]>,
): FeedSpotPastPost[] {
  const userFirst = userPostsByEventId[eventId] ?? [];
  return [...userFirst, ...feedSpotPastPostsForEvent(eventId)];
}

export function FeedStoryViewer({
  open,
  eventIds,
  initialLocationIndex,
  onClose,
}: Props) {
  const { userPostsByEventId } = useSpotStoryPosts();
  const [locationIdx, setLocationIdx] = useState(0);
  const [postIdx, setPostIdx] = useState(0);
  const pointerDown = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!open) return;
    const safe = Math.max(
      0,
      Math.min(initialLocationIndex, eventIds.length - 1),
    );
    setLocationIdx(safe);
    setPostIdx(0);
  }, [open, initialLocationIndex, eventIds.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const eventId = eventIds[locationIdx] ?? "";
  const posts = useMemo(
    () => mergePostsForEvent(eventId, userPostsByEventId),
    [eventId, userPostsByEventId],
  );

  useEffect(() => {
    if (!open || posts.length === 0) return;
    if (postIdx >= posts.length) setPostIdx(0);
  }, [open, posts.length, postIdx]);

  const current = posts[Math.min(postIdx, Math.max(0, posts.length - 1))];

  const advancePost = useCallback(() => {
    if (eventIds.length === 0) {
      onClose();
      return;
    }
    const id = eventIds[locationIdx];
    const list = mergePostsForEvent(id, userPostsByEventId);
    if (postIdx < list.length - 1) {
      setPostIdx((p) => p + 1);
      return;
    }
    if (locationIdx < eventIds.length - 1) {
      setLocationIdx((l) => l + 1);
      setPostIdx(0);
      return;
    }
    onClose();
  }, [
    eventIds,
    locationIdx,
    postIdx,
    userPostsByEventId,
    onClose,
  ]);

  const goNextLocation = useCallback(() => {
    if (eventIds.length === 0) return;
    setLocationIdx((l) => (l + 1) % eventIds.length);
    setPostIdx(0);
  }, [eventIds.length]);

  const goPrevLocation = useCallback(() => {
    if (eventIds.length === 0) return;
    setLocationIdx((l) => (l - 1 + eventIds.length) % eventIds.length);
    setPostIdx(0);
  }, [eventIds.length]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    pointerDown.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const start = pointerDown.current;
    pointerDown.current = null;
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      /* ignore */
    }
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) > 56 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) goNextLocation();
      else goPrevLocation();
      return;
    }
    if (Math.abs(dx) < 20 && Math.abs(dy) < 20) {
      advancePost();
    }
  };

  const spotTitle = discoverEventById(eventId)?.title ?? "Stories";

  if (!open || eventIds.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex flex-col bg-black"
      role="dialog"
      aria-modal="true"
      aria-label={`Stories — ${spotTitle}`}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-30 flex flex-col gap-2 px-3 pt-[max(0.75rem,env(safe-area-inset-top))]"
      >
        <div className="relative min-h-11 w-full">
          <button
            type="button"
            onClick={onClose}
            className="pointer-events-auto absolute left-0 top-0 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm"
            aria-label="Close stories"
          >
            <X className="h-6 w-6" strokeWidth={2.5} />
          </button>
          <p className="pointer-events-none absolute left-1/2 top-2 max-w-[min(14rem,70vw)] -translate-x-1/2 truncate text-center text-sm font-semibold text-white drop-shadow-md">
            {spotTitle}
          </p>
        </div>
        {posts.length > 0 ? (
          <div className="pointer-events-none flex gap-0.5 px-1">
            {posts.map((_, i) => (
              <div
                key={i}
                className={`h-0.5 min-w-0 flex-1 rounded-full ${
                  i < postIdx
                    ? "bg-white"
                    : i === postIdx
                      ? "bg-white/95"
                      : "bg-white/30"
                }`}
              />
            ))}
          </div>
        ) : null}
      </div>

      <div
        className="relative min-h-0 flex-1 touch-manipulation"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          pointerDown.current = null;
        }}
      >
        {current ? (
          <div className="absolute inset-0">
            <div className="relative h-full w-full">
              <StoryFillImage src={current.imageUrl} alt="" />
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-24">
              <p className="text-sm font-semibold text-white">
                {current.authorName}
              </p>
              <p className="text-xs text-white/85">{current.timeLabel}</p>
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-white/70">
            No stories here yet.
          </div>
        )}
      </div>
    </div>
  );
}
