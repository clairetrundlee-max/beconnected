"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { AvailabilityModal } from "@/components/connected/AvailabilityModal";
import { ConnectedStatusBar } from "@/components/connected/ConnectedStatusBar";
import {
  profileDaySections,
  type ProfileTimeBlock,
  weekStrip,
} from "@/lib/connected/mock";

type Props = {
  onSlotNavigate: (eventId: string, tab: "events" | "feed") => void;
  onCreateGroup?: (memberNames: string[]) => void;
};

export function HomeScreen({ onSlotNavigate, onCreateGroup }: Props) {
  const [selectedId, setSelectedId] = useState("jun-1");
  const [modal, setModal] = useState<{
    dayHeading: string;
    block: ProfileTimeBlock;
  } | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const listRef = useRef<HTMLDivElement>(null);
  const weekScrollRef = useRef<HTMLDivElement>(null);

  const scrollToDay = useCallback((detailId: string) => {
    setSelectedId(detailId);

    const scrollWeekToPill = () => {
      const strip = weekScrollRef.current;
      if (!strip) return;
      const btn = strip.querySelector<HTMLElement>(`[data-detail-id="${detailId}"]`);
      if (btn) {
        const left = btn.offsetLeft - strip.clientWidth / 2 + btn.clientWidth / 2;
        strip.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
      }
    };

    const scrollListToSection = () => {
      const list = listRef.current;
      const el = sectionRefs.current[detailId];
      if (!list || !el) return;
      const pad = 10;
      const nextTop =
        list.scrollTop + (el.getBoundingClientRect().top - list.getBoundingClientRect().top) - pad;
      list.scrollTo({
        top: Math.max(0, nextTop),
        behavior: "smooth",
      });
    };

    scrollWeekToPill();
    queueMicrotask(scrollListToSection);
    requestAnimationFrame(() => {
      scrollListToSection();
      requestAnimationFrame(scrollListToSection);
    });
    window.setTimeout(scrollListToSection, 80);
  }, []);

  return (
    <div className="flex h-[calc(100dvh-5.75rem)] max-h-[calc(100dvh-5.75rem)] flex-col overflow-hidden bg-[#f5f2eb]">
      <ConnectedStatusBar />
      <header className="flex shrink-0 items-start justify-between px-4 pb-2 pr-14 pt-1">
        <div>
          <h1 className="text-xl font-bold text-neutral-900">Home</h1>
          <p className="text-sm text-neutral-500">My week · May 20 – Jun 3</p>
        </div>
      </header>

      <section className="mb-2 shrink-0 px-4">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-wide text-neutral-500">
          This week
        </h2>
        <div
          ref={weekScrollRef}
          className="-mx-1 flex gap-2 overflow-x-auto overscroll-x-contain px-1 pb-2 pt-0.5 [scrollbar-width:thin]"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {weekStrip.map((d) => {
            const isSel = d.detailId === selectedId;
            return (
              <button
                key={d.detailId}
                type="button"
                data-detail-id={d.detailId}
                onClick={() => scrollToDay(d.detailId)}
                style={{ scrollSnapAlign: "start" }}
                className={`min-w-[76px] max-w-[76px] shrink-0 rounded-xl px-2 py-2 text-center shadow-sm ring-1 ring-[#e0dcd0] transition-colors ${
                  isSel
                    ? "bg-[#7a9a7a] text-white ring-[#6a8a6a]"
                    : "bg-white active:bg-neutral-50"
                }`}
              >
                <p
                  className={`text-[10px] font-medium ${isSel ? "text-white/85" : "text-neutral-500"}`}
                >
                  {d.day}
                </p>
                <p className="text-lg font-bold leading-tight">{d.date}</p>
                <p
                  className={`text-[9px] ${isSel ? "text-white/70" : "text-neutral-400"}`}
                >
                  {d.month}
                </p>
                {d.friendAvatars.length > 0 && (
                  <div
                    className={`mt-1.5 flex justify-center ${isSel ? "[&_img]:ring-[#5d7a5d]" : ""}`}
                  >
                    <div className="flex -space-x-1.5">
                      {d.friendAvatars.slice(0, 3).map((src, i) => (
                        <div
                          key={i}
                          className={`relative h-7 w-7 overflow-hidden rounded-full ring-2 ${
                            isSel ? "ring-[#5d7a5d]" : "ring-white"
                          }`}
                        >
                          <Image
                            src={src}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="28px"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {d.hoursFree != null && (
                  <p
                    className={`mt-0.5 text-[9px] font-semibold leading-tight ${isSel ? "text-emerald-100" : "text-[#5a7d5a]"}`}
                  >
                    {d.hoursFree} hrs free
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </section>

      <div
        ref={listRef}
        className="relative min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain px-4 pb-6 [-webkit-overflow-scrolling:touch]"
      >
        {profileDaySections.map((section) => (
          <div
            key={section.id}
            ref={(el) => {
              sectionRefs.current[section.id] = el;
            }}
            className="mb-6 scroll-mt-3"
            id={`home-day-${section.id}`}
          >
            <h3 className="mb-3 border-b border-[#e0dcd0] pb-2 text-sm font-bold text-neutral-800">
              {section.heading}
            </h3>
            <div className="space-y-3">
              {section.blocks.map((b, i) => (
                <TimeBlock
                  key={`${section.id}-${i}`}
                  title={b.title}
                  time={b.time}
                  meta={b.meta}
                  muted={b.muted}
                  onTap={() => setModal({ dayHeading: section.heading, block: b })}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <AvailabilityModal
        open={modal != null}
        onClose={() => setModal(null)}
        dayHeading={modal?.dayHeading ?? ""}
        block={
          modal?.block ?? {
            title: "",
            time: "",
            meta: "",
            slotFriends: [],
            slotEvents: [],
          }
        }
        onSlotNavigate={(eventId, tab) => {
          setModal(null);
          onSlotNavigate(eventId, tab);
        }}
        onCreateGroup={onCreateGroup}
      />
    </div>
  );
}

function TimeBlock({
  title,
  time,
  meta,
  muted,
  onTap,
}: {
  title: string;
  time: string;
  meta: string;
  muted?: boolean;
  onTap: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onTap}
      className={`w-full rounded-2xl p-4 text-left shadow-sm ring-1 ring-[#e0dcd0] active:opacity-95 ${
        muted ? "bg-[#ebe8e0]" : "bg-white active:bg-[#f8f6f1]"
      }`}
    >
      <p className="font-semibold text-neutral-900">{title}</p>
      <p className="text-sm text-neutral-500">{time}</p>
      <p className={`mt-1 text-xs ${muted ? "text-neutral-500" : "font-medium text-[#4a6b4a]"}`}>
        {meta}
        <span className="mt-2 block text-[10px] font-normal text-neutral-400">
          {muted ? "Tap for details" : "Tap for friends & events"}
        </span>
      </p>
    </button>
  );
}
