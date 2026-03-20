"use client";

import { ChevronLeft, ExternalLink } from "lucide-react";
import Image from "next/image";
import { ConnectedStatusBar } from "@/components/connected/ConnectedStatusBar";
import { intentEvent } from "@/lib/connected/mock";

type Props = {
  onBack: () => void;
  onInviteAll: () => void;
};

const interested = [
  {
    name: "Harper Walsh",
    sub: "Free all day.",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
  },
  {
    name: "Sofia Reyes",
    sub: "Interested · Free 3pm onward.",
    avatar:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop",
  },
];

const alsoFree = [
  {
    name: "Mia Torres",
    sub: "Free all day · Haven't seen this.",
    avatar:
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=100&h=100&fit=crop",
  },
  {
    name: "Emma Nguyen",
    sub: "Free evening · Loves live music.",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
  },
];

export function FriendsFreeEventScreen({ onBack, onInviteAll }: Props) {
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
        <h1 className="min-w-0 flex-1 text-base font-bold leading-tight text-neutral-900">
          Friends free for {intentEvent.title} · Jun 8
        </h1>
      </header>

      <div className="mx-4 mb-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-[#e0dcd0]">
          <p className="text-2xl font-bold text-neutral-800">9</p>
          <p className="text-xs text-neutral-500">Friends Free that day</p>
        </div>
        <div className="rounded-2xl bg-[#e8f0e0] p-4 text-center shadow-sm ring-1 ring-[#c5d4b8]">
          <p className="text-2xl font-bold text-[#3d523d]">3</p>
          <p className="text-xs text-[#4a6b4a]">Already Interested</p>
        </div>
      </div>

      <div className="mx-4 mb-4">
        <a
          href={intentEvent.eventWebsiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-3.5 text-sm font-bold text-[#3d523d] shadow-sm ring-2 ring-[#5a7d5a] active:bg-[#f5f2eb]"
        >
          <ExternalLink className="h-4 w-4 shrink-0" strokeWidth={2.25} />
          Event Details &amp; Tickets
        </a>
      </div>

      <section className="px-4">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-wide text-neutral-500">
          Already interested
        </h2>
        <div className="space-y-2">
          {interested.map((p) => (
            <PersonRow key={p.name} {...p} />
          ))}
        </div>
      </section>

      <section className="mt-4 px-4">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-wide text-neutral-500">
          Also free that day
        </h2>
        <div className="space-y-2">
          {alsoFree.map((p) => (
            <PersonRow key={p.name} {...p} subtle />
          ))}
        </div>
      </section>

      <div className="mt-auto p-4 pb-28">
        <button
          type="button"
          onClick={onInviteAll}
          className="w-full rounded-full bg-[#5a7d5a] py-4 text-base font-bold text-white shadow-md"
        >
          Invite all 9 free friends
        </button>
      </div>
    </div>
  );
}

function PersonRow({
  name,
  sub,
  avatar,
  subtle,
}: {
  name: string;
  sub: string;
  avatar: string;
  subtle?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white p-3 ring-1 ring-[#e8e4dc]">
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
        <Image src={avatar} alt="" fill className="object-cover" sizes="44px" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-neutral-900">{name}</p>
        <p className="text-xs text-neutral-500">{sub}</p>
      </div>
      <button
        type="button"
        className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold text-white ${
          subtle ? "bg-[#8faa8f]" : "bg-[#5a7d5a]"
        }`}
      >
        {subtle ? "Invite?" : "Invite!"}
      </button>
    </div>
  );
}
