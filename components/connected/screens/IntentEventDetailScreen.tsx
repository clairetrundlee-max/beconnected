"use client";

import { Check, ChevronLeft, Music } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ConnectedStatusBar } from "@/components/connected/ConnectedStatusBar";
import { intentEvent } from "@/lib/connected/mock";

type Props = {
  onBack: () => void;
  onWantToGo: () => void;
  /** Opens main Events screen on the Saved tab */
  onOpenEventsSaved: () => void;
};

export function IntentEventDetailScreen({
  onBack,
  onWantToGo,
  onOpenEventsSaved,
}: Props) {
  const [savedForLater, setSavedForLater] = useState(false);

  return (
    <div className="flex min-h-dvh flex-col bg-[#f5f2eb]">
      <ConnectedStatusBar />
      <header className="flex items-center gap-2 px-2 py-2">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full p-2"
          aria-label="Back"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-bold text-neutral-900">Events</h1>
      </header>

      <div className="mb-3 flex gap-2 overflow-x-auto px-4">
        {["All", "Saved", "This Week", "Next Week"].map((t, i) =>
          t === "Saved" ? (
            <button
              key={t}
              type="button"
              onClick={onOpenEventsSaved}
              className="shrink-0 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-neutral-800 ring-1 ring-[#e0dcd0] active:bg-neutral-100"
            >
              Saved
            </button>
          ) : (
            <span
              key={t}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${
                i === 0 ? "bg-[#5a7d5a] text-white" : "bg-white ring-1 ring-[#e0dcd0]"
              }`}
            >
              {t}
            </span>
          ),
        )}
        <span className="shrink-0 rounded-full bg-amber-100 px-2 py-1.5 text-[10px] font-bold text-amber-800">
          New Event
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-32">
        <div className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-[#e8e4dc]">
          <div className="relative aspect-[16/10] bg-gradient-to-br from-indigo-400 to-purple-600">
            <Image
              src={intentEvent.image}
              alt=""
              fill
              className="object-cover"
              sizes="400px"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <Music className="h-16 w-16 text-white/90" />
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold text-neutral-900">
              {intentEvent.title}
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              {intentEvent.dateLine} · {intentEvent.distance}
            </p>
            <p className="mt-2 text-sm text-neutral-500">{intentEvent.ticket}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onWantToGo}
                className="rounded-full bg-[#5a7d5a] px-6 py-3 text-sm font-bold text-white"
              >
                I Want to Go
              </button>
              {savedForLater ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#c5d4c5] px-6 py-3 text-sm font-bold text-[#2d402d] ring-1 ring-[#a8bda8]">
                  <Check className="h-5 w-5" strokeWidth={2.5} />
                  Saved
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => setSavedForLater(true)}
                  className="rounded-full bg-neutral-200 px-6 py-3 text-sm font-semibold text-neutral-700 active:bg-neutral-300"
                >
                  Save for Later
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-[#eef4ee] p-4 ring-1 ring-[#c5d4c5]">
          <p className="text-sm text-neutral-700">
            <span className="font-semibold">Harper also saved this!</span> You&apos;re
            both free June 8 – invite him?
          </p>
          <button
            type="button"
            className="mt-3 rounded-full bg-[#5a7d5a] px-5 py-2 text-sm font-bold text-white"
          >
            Yes!
          </button>
        </div>
      </div>
    </div>
  );
}
