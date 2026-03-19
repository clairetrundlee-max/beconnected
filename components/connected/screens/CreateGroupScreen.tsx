"use client";

import { Calendar, ChevronLeft, MessageCircle, Sparkles } from "lucide-react";
import { ConnectedStatusBar } from "@/components/connected/ConnectedStatusBar";

type Props = {
  memberNames: string[];
  onBack: () => void;
};

export function CreateGroupScreen({ memberNames, onBack }: Props) {
  const list =
    memberNames.length > 0
      ? memberNames.join(", ")
      : "your selected friends";

  return (
    <div className="relative z-[70] flex min-h-dvh flex-col bg-[#f5f2eb]">
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
        <h1 className="text-lg font-bold text-neutral-900">Create a group</h1>
      </header>

      <div className="px-4 pb-4">
        <p className="text-sm text-neutral-600">
          You&apos;re planning with{" "}
          <span className="font-semibold text-neutral-900">{list}</span>.
          Continue in the app you prefer:
        </p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3 px-4 pb-28">
        <a
          href="https://calendar.google.com/calendar/u/0/r/eventedit"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-2 ring-[#e8e4dc] active:bg-[#f8f6f1]"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#eef4ee] text-[#3d523d]">
            <Calendar className="h-6 w-6" strokeWidth={2} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-neutral-900">Send a calendar invite</p>
            <p className="text-xs text-neutral-500">
              Open Google Calendar (or your default) to send invites
            </p>
          </div>
        </a>

        <a
          href="https://partiful.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-2 ring-[#e8e4dc] active:bg-[#f8f6f1]"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-800">
            <Sparkles className="h-6 w-6" strokeWidth={2} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-neutral-900">Create a Partiful</p>
            <p className="text-xs text-neutral-500">
              Plan the hang on Partiful in your browser
            </p>
          </div>
        </a>

        <a
          href="sms:&body=Let's%20start%20a%20group%20chat%20—%20who's%20in?"
          className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-2 ring-[#e8e4dc] active:bg-[#f8f6f1]"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-800">
            <MessageCircle className="h-6 w-6" strokeWidth={2} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-neutral-900">Create a group chat</p>
            <p className="text-xs text-neutral-500">
              Opens Messages to start a new thread (mobile)
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}
