"use client";

import { Sparkles } from "lucide-react";
import { ConnectedStatusBar } from "@/components/connected/ConnectedStatusBar";
import { intentEvent } from "@/lib/connected/mock";

type Props = {
  onClose: () => void;
  onImIn: () => void;
};

export function InviteSentScreen({ onClose, onImIn }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/40">
      <div className="flex h-full w-full max-w-[430px] flex-col bg-[#f5f2eb]">
        <ConnectedStatusBar />
        <header className="px-4 py-3 text-center">
          <h1 className="text-xl font-bold text-neutral-900">Connected.</h1>
        </header>

        <div className="mx-4 mb-4 rounded-xl bg-neutral-800 px-4 py-3 text-white shadow-lg">
          <p className="text-[10px] font-bold uppercase tracking-wide text-neutral-400">
            Push notification
          </p>
          <p className="mt-1 font-semibold">
            Claire wants to go to Outdoor Concert
          </p>
          <p className="mt-1 text-sm text-neutral-300">
            Saturday June 8 · 6pm — You&apos;re free that day. Jake & Maya are
            also going.
          </p>
        </div>

        <div className="flex flex-col gap-3 px-4">
          <button
            type="button"
            onClick={onImIn}
            className="flex items-center justify-center gap-2 rounded-full bg-[#5a7d5a] py-4 text-base font-bold text-white"
          >
            <Sparkles className="h-5 w-5 text-amber-300" />
            I&apos;m In!
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-neutral-200 py-3 text-sm font-semibold text-neutral-700"
          >
            Maybe Later
          </button>
        </div>

        <div className="mx-4 mt-6 rounded-xl bg-white p-4 shadow-sm ring-1 ring-[#e8e4dc]">
          <p className="text-xs font-bold uppercase text-[#4a6b4a]">
            Going · 4 confirmed
          </p>
          <div className="mt-2 flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-[#c5d4c5]"
              />
            ))}
          </div>
        </div>

        <div className="mx-4 mt-3 space-y-3">
          <div className="rounded-xl bg-white p-4 ring-1 ring-[#e8e4dc]">
            <p className="font-semibold text-neutral-900">Added to your calendar</p>
            <p className="text-sm text-neutral-500">
              {intentEvent.title} · Sat June 8 · 6pm
            </p>
            <p className="mt-2 text-xs text-neutral-400">
              Your free time on June 8 is now marked as planned.
            </p>
          </div>
          <div className="rounded-xl bg-white p-4 ring-1 ring-[#e8e4dc]">
            <p className="font-semibold text-neutral-900">Reminder set</p>
            <p className="text-sm text-neutral-500">
              You&apos;ll get a nudge Saturday at 4pm.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
