"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { ConnectedStatusBar } from "@/components/connected/ConnectedStatusBar";
import { friendRequests, user } from "@/lib/connected/mock";

const AUDIENCE_OPTIONS = [
  { key: "close" as const, label: "Close friends" },
  { key: "all" as const, label: "All friends" },
  { key: "public" as const, label: "Public" },
];

function ToggleRow({
  label,
  on,
  onChange,
}: {
  label: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between border-t border-neutral-100 py-3 first:border-t-0 first:pt-2">
      <span className="text-sm font-medium text-neutral-800">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => onChange(!on)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
          on ? "bg-[#5a7d5a]" : "bg-neutral-300"
        }`}
      >
        <span
          className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
            on ? "left-5" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}

function SettingsBox({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-white px-4 py-2 shadow-sm ring-1 ring-[#e8e4dc]">
      <p className="border-b border-neutral-100 py-2 text-xs font-bold uppercase tracking-wide text-neutral-400">
        {title}
      </p>
      {children}
    </section>
  );
}

export function SettingsScreen() {
  const [locationSharing, setLocationSharing] = useState({
    close: true,
    all: true,
    public: false,
  });
  const [availabilitySharing, setAvailabilitySharing] = useState({
    close: true,
    all: true,
    public: false,
  });
  const [calendars, setCalendars] = useState({
    apple: true,
    google: true,
  });

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#f5f2eb]">
      <ConnectedStatusBar />
      <header className="flex items-center justify-center pb-2 pl-14 pr-14 pt-0.5">
        <h1 className="text-xl font-bold text-neutral-900">Settings</h1>
      </header>

      <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-4 pb-28">
        <div className="flex flex-col items-center rounded-2xl bg-white py-6 shadow-sm ring-1 ring-[#e8e4dc]">
          <div className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-[#7a9a7a]">
            <Image src={user.avatar} alt="" fill className="object-cover" sizes="80px" />
          </div>
          <p className="mt-2 font-semibold text-neutral-900">{user.name}</p>
          <button type="button" className="mt-1 text-sm font-medium text-[#4a6b4a]">
            Edit profile
          </button>
        </div>

        <SettingsBox title="Location Settings">
          {AUDIENCE_OPTIONS.map(({ key, label }) => (
            <ToggleRow
              key={key}
              label={label}
              on={locationSharing[key]}
              onChange={(v) =>
                setLocationSharing((s) => ({ ...s, [key]: v }))
              }
            />
          ))}
        </SettingsBox>

        <SettingsBox title="Share Availability">
          {AUDIENCE_OPTIONS.map(({ key, label }) => (
            <ToggleRow
              key={key}
              label={label}
              on={availabilitySharing[key]}
              onChange={(v) =>
                setAvailabilitySharing((s) => ({ ...s, [key]: v }))
              }
            />
          ))}
        </SettingsBox>

        <SettingsBox title="Calendar Settings">
          <ToggleRow
            label="Apple Calendar"
            on={calendars.apple}
            onChange={(v) => setCalendars((s) => ({ ...s, apple: v }))}
          />
          <ToggleRow
            label="Google Calendar"
            on={calendars.google}
            onChange={(v) => setCalendars((s) => ({ ...s, google: v }))}
          />
        </SettingsBox>

        <section>
          <h2 className="mb-2 text-sm font-bold text-neutral-900">
            Friend requests ({friendRequests.length})
          </h2>
          <div className="space-y-2">
            {friendRequests.map((fr) => (
              <div
                key={fr.id}
                className="flex items-center gap-3 rounded-xl bg-white p-3 ring-1 ring-[#e8e4dc]"
              >
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={fr.avatar}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="44px"
                  />
                </div>
                <p className="min-w-0 flex-1 font-medium text-neutral-900">
                  {fr.name}
                </p>
                <button
                  type="button"
                  className="rounded-lg bg-[#5a7d5a] px-3 py-1.5 text-xs font-bold text-white"
                >
                  Accept
                </button>
                <button
                  type="button"
                  className="rounded-lg bg-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-600"
                >
                  Decline
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
