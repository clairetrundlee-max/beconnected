"use client";

import { Calendar, Camera, Check, MapPin, Music, Plus } from "lucide-react";
import Image from "next/image";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import { ConnectedStatusBar } from "@/components/connected/ConnectedStatusBar";
import {
  nextUserSpotPostId,
  useSpotStoryPosts,
} from "@/components/connected/SpotStoryPostsContext";
import {
  discoverEventById,
  discoverEvents,
  eventInvitePool,
  intentEvent,
  savedItems,
} from "@/lib/connected/mock";

type Props = {
  focusEventId: string | null;
  onFocusConsumed: () => void;
  onOpenIntentDetail: () => void;
  /** When true (e.g. from intent detail Saved chip), switch to Saved sub-tab once */
  openSavedFromIntent?: boolean;
  onOpenSavedFromIntentConsumed?: () => void;
  onCreateGroup?: (memberNames: string[]) => void;
};

const filters = [
  "All",
  "Today",
  "Popular",
  "Music",
  "Food",
  "Outdoors",
];

const pulseRing =
  "ring-4 ring-[#5a7d5a] ring-offset-2 ring-offset-[#f5f2eb] transition-shadow";

function EventFriendsAvailable({
  eventId,
  onCreateGroup,
}: {
  eventId: string;
  onCreateGroup?: (memberNames: string[]) => void;
}) {
  const [selected, setSelected] = useState<Set<string>>(() => new Set());

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const namesForGroup = eventInvitePool
    .filter((p) => selected.has(p.id))
    .map((p) => p.name);

  return (
    <div className="mt-4">
      <p className="mb-2 text-[11px] font-medium text-neutral-500">
        Scroll — tap <span className="font-semibold">+</span> on each face to add
        to your group
      </p>
      <div
        className="-mx-1 flex gap-4 overflow-x-auto overflow-y-visible py-1 pl-1 pr-2 [scrollbar-width:thin] snap-x snap-mandatory"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {eventInvitePool.map((p) => {
          const on = selected.has(p.id);
          return (
            <div
              key={`${eventId}-${p.id}`}
              className="relative shrink-0 snap-center scroll-ml-1 pt-0.5"
            >
              <div
                className={`relative h-[52px] w-[52px] overflow-hidden rounded-full bg-neutral-100 ring-2 ring-offset-2 ring-offset-white ${
                  on ? "ring-[#5a7d5a]" : "ring-[#e8e4dc]"
                }`}
              >
                <Image
                  src={p.avatar}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="52px"
                />
              </div>
              <button
                type="button"
                onClick={() => toggle(p.id)}
                className={`absolute -bottom-0.5 -right-0.5 flex h-7 w-7 items-center justify-center rounded-full shadow-md ring-2 ring-white ${
                  on ? "bg-[#5a7d5a] text-white" : "bg-[#dce8dc] text-[#2d402d]"
                }`}
                aria-label={on ? `Remove ${p.name}` : `Add ${p.name}`}
                title={p.name}
              >
                {on ? (
                  <Check className="h-3 w-3" strokeWidth={3} />
                ) : (
                  <Plus className="h-3 w-3" strokeWidth={2.5} />
                )}
              </button>
            </div>
          );
        })}
        <button
          type="button"
          className="mt-0.5 flex h-[52px] w-[52px] shrink-0 snap-center items-center justify-center self-start rounded-full bg-[#dce8dc] text-[#2d402d] ring-2 ring-[#c5d4c5] ring-offset-2 ring-offset-white active:bg-[#c5d4c5]"
          aria-label="Add more people"
          title="Add more"
        >
          <Plus className="h-6 w-6" strokeWidth={2.5} />
        </button>
      </div>
      {onCreateGroup && selected.size > 0 && (
        <button
          type="button"
          onClick={() => onCreateGroup(namesForGroup)}
          className="mt-3 w-full rounded-full bg-[#3d523d] py-3 text-sm font-bold text-white shadow-sm"
        >
          Create group ({selected.size})
        </button>
      )}
    </div>
  );
}

export function EventsScreen({
  focusEventId,
  onFocusConsumed,
  onOpenIntentDetail,
  openSavedFromIntent,
  onOpenSavedFromIntentConsumed,
  onCreateGroup,
}: Props) {
  const [top, setTop] = useState("All");
  const [sub, setSub] = useState<"discover" | "saved">("discover");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [pulseId, setPulseId] = useState<string | null>(null);
  const { addUserSpotPost } = useSpotStoryPosts();
  const captureInputRef = useRef<HTMLInputElement>(null);
  const captureEventIdRef = useRef<string | null>(null);
  const [storyToast, setStoryToast] = useState<string | null>(null);

  useEffect(() => {
    if (!storyToast) return;
    const t = window.setTimeout(() => setStoryToast(null), 3200);
    return () => window.clearTimeout(t);
  }, [storyToast]);

  const openHereNowCapture = (eventId: string) => {
    captureEventIdRef.current = eventId;
    captureInputRef.current?.click();
  };

  const onCaptureFile = (e: ChangeEvent<HTMLInputElement>) => {
    const eventId = captureEventIdRef.current;
    captureEventIdRef.current = null;
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !eventId) return;
    const imageUrl = URL.createObjectURL(file);
    addUserSpotPost(eventId, {
      id: nextUserSpotPostId(),
      imageUrl,
      authorName: "You",
      timeLabel: "Just now",
    });
    const spot = discoverEventById(eventId);
    setStoryToast(
      `Photo added to ${spot?.title ?? "this spot"}’s feed stories`,
    );
  };

  useLayoutEffect(() => {
    if (!openSavedFromIntent) return;
    setSub("saved");
    onOpenSavedFromIntentConsumed?.();
  }, [openSavedFromIntent, onOpenSavedFromIntentConsumed]);

  useEffect(() => {
    if (openSavedFromIntent) return;
    if (focusEventId) setSub("discover");
  }, [focusEventId, openSavedFromIntent]);

  useEffect(() => {
    if (!focusEventId || sub !== "discover") return;
    const id = focusEventId;
    const t = window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          const root = scrollRef.current;
          const el =
            id === "outdoor"
              ? document.getElementById("events-intent-outdoor")
              : document.getElementById(`events-discover-${id}`);
          if (root && el) {
            const y =
              el.getBoundingClientRect().top -
              root.getBoundingClientRect().top +
              root.scrollTop -
              12;
            root.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
            setPulseId(id === "outdoor" ? "outdoor" : id);
            window.setTimeout(() => setPulseId(null), 2400);
          }
          onFocusConsumed();
        });
      });
    }, 120);
    return () => window.clearTimeout(t);
  }, [focusEventId, sub, onFocusConsumed]);

  return (
    <div className="flex h-[calc(100dvh-5.75rem)] max-h-[calc(100dvh-5.75rem)] min-h-0 flex-1 flex-col overflow-hidden bg-[#f5f2eb]">
      <ConnectedStatusBar />
      <header className="flex shrink-0 items-center justify-between px-4 pb-2 pr-14">
        <h1 className="text-xl font-bold text-neutral-900">Events</h1>
        <span className="text-sm text-neutral-500">Sat June 1</span>
      </header>

      <div className="mb-2 flex shrink-0 gap-2 px-4">
        <button
          type="button"
          onClick={() => setSub("discover")}
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            sub === "discover"
              ? "bg-[#5a7d5a] text-white"
              : "bg-white ring-1 ring-[#e0dcd0]"
          }`}
        >
          Discover
        </button>
        <button
          type="button"
          onClick={() => setSub("saved")}
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            sub === "saved"
              ? "bg-[#5a7d5a] text-white"
              : "bg-white ring-1 ring-[#e0dcd0]"
          }`}
        >
          Saved
        </button>
      </div>

      {sub === "discover" ? (
        <>
          <div className="mb-3 flex shrink-0 gap-2 overflow-x-auto px-4 pb-1">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setTop(f)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                  top === f
                    ? "bg-[#c5d4c5] text-[#2d402d]"
                    : "bg-white text-neutral-600 ring-1 ring-[#e0dcd0]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="mx-4 mb-2 shrink-0 rounded-lg bg-[#eef4ee] px-3 py-2 text-xs font-medium text-[#3d523d]">
            🎵 2 friends going to events near you today
          </div>

          <div
            ref={scrollRef}
            className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-y-contain px-4 pb-28 [-webkit-overflow-scrolling:touch]"
          >
            <button
              id="events-intent-outdoor"
              type="button"
              onClick={onOpenIntentDetail}
              className={`w-full overflow-hidden rounded-2xl bg-white text-left shadow-md ring-2 ring-[#7a9a7a] ring-offset-2 ring-offset-[#f5f2eb] ${
                pulseId === "outdoor" ? pulseRing : ""
              }`}
            >
              <div className="relative aspect-[16/9]">
                <Image
                  src={intentEvent.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="400px"
                />
                <span className="absolute left-2 top-2 rounded-md bg-amber-400 px-2 py-0.5 text-[10px] font-bold text-amber-950">
                  Intent Mode
                </span>
              </div>
              <div className="p-4">
                <h2 className="text-lg font-bold text-neutral-900">
                  {intentEvent.title}
                </h2>
                <p className="text-sm text-neutral-500">
                  {intentEvent.dateLine} · Tap to plan with friends
                </p>
              </div>
            </button>

            {discoverEvents.map((e) => (
              <article
                key={e.id}
                id={`events-discover-${e.id}`}
                className={`overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#e8e4dc] ${
                  pulseId === e.id ? pulseRing : ""
                }`}
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={e.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="400px"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-bold text-neutral-900">{e.title}</h2>
                  <p className="text-sm text-neutral-500">
                    {e.time} · {e.subtitle}
                  </p>
                  {e.tags && (
                    <span className="mt-2 inline-block rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
                      {e.tags[0]}
                    </span>
                  )}
                  <div className="mt-3 flex items-center gap-3 text-neutral-400">
                    <Music className="h-4 w-4" />
                    <Calendar className="h-4 w-4" />
                    <MapPin className="h-4 w-4" />
                  </div>
                  <EventFriendsAvailable
                    eventId={e.id}
                    onCreateGroup={onCreateGroup}
                  />
                </div>
              </article>
            ))}
          </div>
        </>
      ) : (
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 pb-28">
          <input
            ref={captureInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="sr-only"
            aria-hidden
            tabIndex={-1}
            onChange={onCaptureFile}
          />
          {storyToast ? (
            <p
              className="rounded-xl bg-[#3d523d] px-3 py-2.5 text-center text-sm font-semibold text-white shadow-sm"
              role="status"
            >
              {storyToast}
            </p>
          ) : null}
          {savedItems.map((s) => (
            <div
              key={s.id}
              className="rounded-xl bg-white p-3 ring-1 ring-[#e8e4dc]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#eef4ee] text-lg">
                  {s.icon === "music" && "🎵"}
                  {s.icon === "bowl" && "🍜"}
                  {s.icon === "mountain" && "⛰️"}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-neutral-900">{s.title}</p>
                  <p className="text-xs text-neutral-500">{s.meta}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold ${
                    s.badgeTone === "green"
                      ? "bg-[#c5d4c5] text-[#2d402d]"
                      : "bg-neutral-200 text-neutral-600"
                  }`}
                >
                  {s.badge}
                </span>
              </div>
              <button
                type="button"
                onClick={() => openHereNowCapture(s.eventId)}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#5a7d5a] py-2.5 text-sm font-bold text-white shadow-sm active:bg-[#4a6b4a]"
                aria-label={`Here now — add a photo to feed stories for ${s.title}`}
              >
                <Camera className="h-4 w-4" strokeWidth={2.5} />
                Here now
              </button>
            </div>
          ))}
          <div className="rounded-xl bg-[#eef4ee] p-4 ring-1 ring-[#c5d4c5]">
            <p className="text-sm font-semibold text-neutral-800">
              Friends with matching saves
            </p>
            <p className="mt-1 text-sm text-neutral-600">
              Harper + Sofia also saved Fareground — 3 of you are free next Tuesday.
            </p>
            <button
              type="button"
              className="mt-3 w-full rounded-full bg-[#5a7d5a] py-3 text-sm font-bold text-white"
            >
              Make it happen →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
