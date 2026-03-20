"use client";

import { X } from "lucide-react";
import Image from "next/image";
import type { Friend } from "@/lib/connected/mock";

type Props = {
  friend: Friend | null;
  onClose: () => void;
};

function stripHandle(s: string): string {
  return s.trim().replace(/^@/, "");
}

function youtubeHref(raw: string): string | undefined {
  const t = raw.trim();
  if (!t) return undefined;
  if (/^https?:\/\//i.test(t)) return t;
  const h = stripHandle(t);
  return `https://www.youtube.com/@${encodeURIComponent(h)}`;
}

function ProfileRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const v = value.trim();
  if (!v) return null;
  const isExternal = href?.startsWith("http");
  const content = href ? (
    <a
      href={href}
      {...(isExternal
        ? { target: "_blank" as const, rel: "noopener noreferrer" }
        : {})}
      className="text-right font-medium text-[#3d523d] underline decoration-[#c5d4c5] underline-offset-2 hover:text-[#2d402d]"
    >
      {v}
    </a>
  ) : (
    <span className="text-right font-medium text-neutral-800">{v}</span>
  );
  return (
    <div className="flex gap-3 border-b border-[#f0ebe3] py-2.5 text-sm last:border-b-0">
      <span className="w-[108px] shrink-0 text-neutral-500">{label}</span>
      <div className="min-w-0 flex-1 break-words">{content}</div>
    </div>
  );
}

export function FriendProfileModal({ friend, onClose }: Props) {
  if (!friend) return null;

  const p = friend.profile;
  const tel = friend.phone.replace(/\s/g, "");

  const ig = p.instagram ? stripHandle(p.instagram) : "";
  const xH = p.x ? stripHandle(p.x) : "";
  const tt = p.tiktok ? stripHandle(p.tiktok) : "";
  const fb = p.facebook ? stripHandle(p.facebook) : "";

  const phoneShown = p.phone?.trim();
  const phoneHref = phoneShown && tel ? `tel:${tel}` : undefined;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/45 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="friend-profile-title"
    >
      <button
        type="button"
        className="absolute inset-0 h-[42%] w-full sm:h-full"
        aria-label="Close profile"
        onClick={onClose}
      />
      <div className="relative flex max-h-[min(90vh,640px)] w-full max-w-[430px] flex-col rounded-t-3xl bg-[#faf8f4] shadow-2xl sm:max-h-[85vh] sm:rounded-3xl">
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-[#e8e4dc] px-5 pb-4 pt-5">
          <div className="flex min-w-0 flex-1 gap-4">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl ring-2 ring-[#c5d4c5]">
              <Image
                src={friend.avatar}
                alt=""
                fill
                className="object-cover"
                sizes="80px"
              />
              {friend.emoji ? (
                <span className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm shadow">
                  {friend.emoji}
                </span>
              ) : null}
            </div>
            <div className="min-w-0 pt-0.5">
              <h2
                id="friend-profile-title"
                className="text-xl font-bold text-neutral-900"
              >
                {friend.name}
              </h2>
              <p className="mt-1 text-sm text-neutral-500">{friend.status}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-200/90 text-neutral-600 hover:bg-neutral-300/90"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          <div className="rounded-2xl bg-white px-4 py-1 ring-1 ring-[#e8e4dc]">
            <ProfileRow label="Living in" value={p.livingIn} />
            <ProfileRow label="Home town" value={p.homeTown} />
            <ProfileRow
              label="Instagram"
              value={p.instagram ?? ""}
              href={
                ig ? `https://instagram.com/${encodeURIComponent(ig)}` : undefined
              }
            />
            <ProfileRow
              label="X"
              value={p.x ?? ""}
              href={xH ? `https://x.com/${encodeURIComponent(xH)}` : undefined}
            />
            <ProfileRow
              label="TikTok"
              value={p.tiktok ?? ""}
              href={
                tt ? `https://www.tiktok.com/@${encodeURIComponent(tt)}` : undefined
              }
            />
            <ProfileRow label="Snapchat" value={p.snapchat ?? ""} />
            <ProfileRow
              label="Facebook"
              value={p.facebook ?? ""}
              href={
                fb ? `https://www.facebook.com/${encodeURIComponent(fb)}` : undefined
              }
            />
            <ProfileRow
              label="YouTube"
              value={p.youtube ?? ""}
              href={p.youtube ? youtubeHref(p.youtube) : undefined}
            />
            <ProfileRow label="Email" value={p.email} href={`mailto:${p.email}`} />
            <ProfileRow
              label="Phone"
              value={phoneShown ?? ""}
              href={phoneHref}
            />
            <ProfileRow label="School" value={p.school ?? ""} />
            <ProfileRow label="Job" value={p.job ?? ""} />
            <ProfileRow label="Zodiac" value={p.zodiac ?? ""} />
          </div>
        </div>
      </div>
    </div>
  );
}
