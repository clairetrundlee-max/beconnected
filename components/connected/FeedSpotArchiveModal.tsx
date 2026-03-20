"use client";

import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useSpotStoryPosts } from "@/components/connected/SpotStoryPostsContext";
import {
  discoverEventById,
  feedSpotPastPostsForEvent,
} from "@/lib/connected/mock";

type Props = {
  eventId: string | null;
  onClose: () => void;
};

function ArchiveCellImage({ src }: { src: string }) {
  if (src.startsWith("blob:")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- user capture; blob URLs
      <img
        src={src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }
  return (
    <Image
      src={src}
      alt=""
      fill
      className="object-cover"
      sizes="(max-width:430px) 33vw, 140px"
    />
  );
}

export function FeedSpotArchiveModal({ eventId, onClose }: Props) {
  const { userPostsByEventId } = useSpotStoryPosts();

  if (!eventId) return null;

  const ev = discoverEventById(eventId);
  const title = ev?.title ?? "This spot";
  const userFirst = userPostsByEventId[eventId] ?? [];
  const posts = [...userFirst, ...feedSpotPastPostsForEvent(eventId)];

  return (
    <div
      className="fixed inset-0 z-[70] flex flex-col bg-[#f5f2eb]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="feed-spot-archive-title"
    >
      <div className="mx-auto flex h-full w-full max-w-[430px] flex-col bg-[#f5f2eb] shadow-2xl sm:my-auto sm:max-h-[min(92dvh,820px)] sm:rounded-2xl sm:ring-1 sm:ring-[#e8e4dc]">
        <header className="flex shrink-0 items-center gap-2 border-b border-[#e8e4dc] bg-white px-1 py-2.5 pr-3">
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-neutral-800 hover:bg-neutral-100"
            aria-label="Back to feed"
          >
            <ChevronLeft className="h-7 w-7" strokeWidth={2} />
          </button>
          <div className="min-w-0 flex-1">
            <h2
              id="feed-spot-archive-title"
              className="truncate text-base font-bold text-neutral-900"
            >
              {title}
            </h2>
            <p className="text-xs text-neutral-500">
              Story posts friends shared here
            </p>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {posts.length === 0 ? (
            <p className="px-6 py-10 text-center text-sm text-neutral-500">
              No story posts from this spot yet.
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-0.5 p-0.5">
              {posts.map((p) => (
                <div
                  key={p.id}
                  className="relative aspect-square overflow-hidden bg-neutral-200"
                >
                  <ArchiveCellImage src={p.imageUrl} />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-1 pb-1.5 pt-8">
                    <p className="truncate text-[10px] font-semibold text-white">
                      {p.authorName}
                    </p>
                    <p className="text-[9px] text-white/90">{p.timeLabel}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
