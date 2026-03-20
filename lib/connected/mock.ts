export const user = {
  name: "Claire Trundle",
  avatar: "/profile/claire-trundle.png",
  sharing: "Sharing with Close Friends",
};

export type UserAboutMeFields = {
  phone: string;
  email: string;
  livingIn: string;
  hometown: string;
  school: string;
  job: string;
};

export const userAboutMeDefaults: UserAboutMeFields = {
  phone: "+1 (512) 555-0198",
  email: "claire.trundle@email.com",
  livingIn: "Austin, TX",
  hometown: "Falls Church, VA",
  school: "University of Texas at Austin",
  job: "Marketing coordinator",
};

export type SettingsSocialPlatform =
  | "instagram"
  | "x"
  | "tiktok"
  | "snapchat"
  | "facebook"
  | "youtube";

export type UserSocialEntry = {
  enabled: boolean;
  handle: string;
};

export const SETTINGS_SOCIAL_PLATFORMS: {
  key: SettingsSocialPlatform;
  label: string;
  placeholder: string;
}[] = [
  { key: "instagram", label: "Instagram", placeholder: "@username or URL" },
  { key: "x", label: "X", placeholder: "@handle" },
  { key: "tiktok", label: "TikTok", placeholder: "@handle" },
  { key: "snapchat", label: "Snapchat", placeholder: "Username" },
  { key: "facebook", label: "Facebook", placeholder: "Profile name or URL" },
  { key: "youtube", label: "YouTube", placeholder: "@channel or URL" },
];

export const userSocialDefaults: Record<
  SettingsSocialPlatform,
  UserSocialEntry
> = {
  instagram: { enabled: true, handle: "@clairetrundle" },
  x: { enabled: true, handle: "@clairer_ATX" },
  tiktok: { enabled: false, handle: "" },
  snapchat: { enabled: false, handle: "" },
  facebook: { enabled: false, handle: "" },
  youtube: { enabled: true, handle: "@ClaireTrundleATX" },
};

/** Friend avatars — week strip & profile slots (women 21–27) */
const F = {
  harper:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop",
  sofia:
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop",
  emma:
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop",
  riley:
    "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=80&h=80&fit=crop",
  mia:
    "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=80&h=80&fit=crop",
  chloe:
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&h=80&fit=crop",
};

export type WeekDay = {
  day: string;
  date: number;
  month: string;
  hoursFree: number | null;
  detailId: string;
  /** Top friends free (avatars, max ~3) */
  friendAvatars: string[];
};

/** Connected Apple / Google — keyed YYYY-MM-DD */
export const connectedCalendarEventsByDate: Record<
  string,
  { title: string; time: string; calendar: "Apple Calendar" | "Google Calendar" }[]
> = {
  "2025-06-01": [
    {
      title: "Lady Bird Lake run club",
      time: "9am – 10:30am",
      calendar: "Apple Calendar",
    },
  ],
  "2025-06-04": [
    {
      title: "Team stand-up",
      time: "10am – 10:30am",
      calendar: "Google Calendar",
    },
    {
      title: "1:1 with Sofia",
      time: "3pm – 3:30pm",
      calendar: "Google Calendar",
    },
  ],
  "2025-06-07": [
    {
      title: "Pickup soccer · Zilker",
      time: "3pm – 5pm",
      calendar: "Apple Calendar",
    },
  ],
  "2025-06-08": [
    {
      title: "Moody Amphitheater summer show",
      time: "6pm – 10pm",
      calendar: "Apple Calendar",
    },
  ],
  "2025-06-15": [
    {
      title: "Brunch reservation",
      time: "11am – 1pm",
      calendar: "Google Calendar",
    },
  ],
  "2025-06-21": [
    {
      title: "Dentist",
      time: "2pm – 3pm",
      calendar: "Apple Calendar",
    },
  ],
  "2025-06-28": [
    {
      title: "Flight AUS → Denver",
      time: "7:15am departure",
      calendar: "Google Calendar",
    },
  ],
};

export const weekStrip: WeekDay[] = [
  { day: "Sun", date: 20, month: "May", hoursFree: 5, detailId: "may-20", friendAvatars: [F.harper, F.sofia, F.emma] },
  { day: "Mon", date: 21, month: "May", hoursFree: 4, detailId: "may-21", friendAvatars: [F.harper, F.emma] },
  { day: "Tue", date: 22, month: "May", hoursFree: 6, detailId: "may-22", friendAvatars: [F.sofia, F.harper, F.mia] },
  { day: "Wed", date: 23, month: "May", hoursFree: 6, detailId: "may-23", friendAvatars: [F.emma, F.sofia] },
  { day: "Thu", date: 24, month: "May", hoursFree: 8, detailId: "may-24", friendAvatars: [F.harper, F.sofia, F.mia] },
  { day: "Fri", date: 25, month: "May", hoursFree: 8, detailId: "may-25", friendAvatars: [F.harper, F.emma, F.mia] },
  { day: "Sat", date: 1, month: "Jun", hoursFree: 11, detailId: "jun-1", friendAvatars: [F.harper, F.sofia, F.emma] },
  { day: "Sun", date: 2, month: "Jun", hoursFree: 9, detailId: "jun-2", friendAvatars: [F.sofia, F.harper] },
  { day: "Mon", date: 3, month: "Jun", hoursFree: 5, detailId: "jun-3", friendAvatars: [F.sofia, F.emma] },
];

export type SlotFriend = { name: string; avatar: string; note?: string };
export type SlotEvent = {
  title: string;
  time: string;
  detail?: string;
  /** Navigates to this event on Events tab */
  eventId: string;
};

/** Home modal: concerts / shows / planned transit → Events; restaurants / places → Feed */
export function homeSlotNavigateTab(eventId: string): "events" | "feed" {
  const eventsPage = new Set([
    "prospect",
    "outdoor",
    "comedy",
    "jazz",
    "karaoke",
    "dj",
    "movie",
    "nyc-train",
    "park-soccer",
    "run-club",
  ]);
  return eventsPage.has(eventId) ? "events" : "feed";
}

export type ProfileTimeBlock = {
  title: string;
  time: string;
  meta: string;
  muted?: boolean;
  /** Shown in tap popup for free slots */
  slotFriends?: SlotFriend[];
  slotEvents?: SlotEvent[];
};

export type ProfileDaySection = {
  id: string;
  heading: string;
  blocks: ProfileTimeBlock[];
};

/** Full day schedules — vertical scroll order matches week strip left → right */
export const profileDaySections: ProfileDaySection[] = [
  {
    id: "may-20",
    heading: "Sunday, May 20",
    blocks: [
      {
        title: "Afternoon Free",
        time: "2pm – 6pm",
        meta: "7 Friends Free",
        slotFriends: [
          { name: "Harper Walsh", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop", note: "Free all afternoon" },
          { name: "Sofia Reyes", avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop", note: "Free after 3pm" },
          { name: "Emma Nguyen", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop", note: "Free 2–5pm" },
        ],
        slotEvents: [
          { title: "Pickup soccer · Zilker", time: "3pm · Great Lawn", detail: "4 friends interested", eventId: "park-soccer" },
          { title: "June's All Day", time: "5pm open", detail: "South Congress", eventId: "rosemary" },
        ],
      },
      {
        title: "Evening",
        time: "7pm – 10pm",
        meta: "4 Friends Free",
        slotFriends: [
          { name: "Mia Torres", avatar: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=80&h=80&fit=crop" },
          { name: "Sofia Reyes", avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop" },
        ],
        slotEvents: [
          { title: "Esther's Follies", time: "8pm doors", detail: "6th Street", eventId: "comedy" },
        ],
      },
    ],
  },
  {
    id: "may-21",
    heading: "Monday, May 21",
    blocks: [
      {
        title: "After work",
        time: "5:30pm – 9pm",
        meta: "6 Friends Free",
        slotFriends: [
          { name: "Harper Walsh", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop" },
          { name: "Emma Nguyen", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop" },
        ],
        slotEvents: [
          { title: "Trivia · Lavaca Street Bar", time: "7pm", detail: "Downtown", eventId: "trivia" },
          { title: "Zilker Summer Sessions", time: "5pm – 9pm", detail: "Music", eventId: "prospect" },
        ],
      },
    ],
  },
  {
    id: "may-22",
    heading: "Tuesday, May 22",
    blocks: [
      {
        title: "Lunch window",
        time: "12pm – 2pm",
        meta: "3 Friends Free",
        slotFriends: [
          { name: "Sofia Reyes", avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop" },
        ],
        slotEvents: [
          { title: "Fareground", time: "12–3pm", detail: "2nd Street", eventId: "food-hall" },
        ],
      },
      {
        title: "Evening Free",
        time: "6pm – 11pm",
        meta: "5 Friends Free",
        slotFriends: [
          { name: "Harper Walsh", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop" },
          { name: "Mia Torres", avatar: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=80&h=80&fit=crop" },
        ],
        slotEvents: [
          { title: "Moody Amphitheater", time: "Sat Jun 8 · 6pm", detail: "Saved by 3 friends", eventId: "outdoor" },
        ],
      },
    ],
  },
  {
    id: "may-23",
    heading: "Wednesday, May 23",
    blocks: [
      {
        title: "Midday Free",
        time: "11am – 3pm",
        meta: "5 Friends Free",
        slotFriends: [
          { name: "Emma Nguyen", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop" },
          { name: "Sofia Reyes", avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop" },
        ],
        slotEvents: [
          { title: "Blanton free day", time: "11am–5pm", detail: "UT campus", eventId: "museum" },
        ],
      },
    ],
  },
  {
    id: "may-24",
    heading: "Thursday, May 24",
    blocks: [
      {
        title: "All evening",
        time: "5pm – midnight",
        meta: "9 Friends Free",
        slotFriends: [
          { name: "Harper Walsh", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop" },
          { name: "Sofia Reyes", avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop" },
          { name: "Mia Torres", avatar: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=80&h=80&fit=crop" },
        ],
        slotEvents: [
          { title: "The Elephant Room", time: "9pm", detail: "Congress", eventId: "jazz" },
          { title: "Karaoke · Elysium", time: "10pm", detail: "Red River", eventId: "karaoke" },
        ],
      },
    ],
  },
  {
    id: "may-25",
    heading: "Friday, May 25",
    blocks: [
      {
        title: "Happy hour window",
        time: "4pm – 7pm",
        meta: "8 Friends Free",
        slotFriends: [
          { name: "Harper Walsh", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop" },
          { name: "Emma Nguyen", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop" },
        ],
        slotEvents: [
          { title: "June's All Day", time: "Happy hour", detail: "SoCo", eventId: "rosemary" },
        ],
      },
      {
        title: "Late night",
        time: "9pm – 2am",
        meta: "12 Friends Free",
        slotFriends: [
          { name: "Mia Torres", avatar: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=80&h=80&fit=crop" },
        ],
        slotEvents: [
          { title: "DJ set — Summit Rooftop", time: "11pm", detail: "Downtown", eventId: "dj" },
        ],
      },
    ],
  },
  {
    id: "jun-1",
    heading: "Saturday, June 1",
    blocks: [
      {
        title: "Morning Free",
        time: "8am – 9pm",
        meta: "10 Friends Free",
        slotFriends: [
          { name: "Harper Walsh", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop", note: "All day" },
          { name: "Sofia Reyes", avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop", note: "Until 6pm" },
          { name: "Emma Nguyen", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop" },
          { name: "Mia Torres", avatar: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=80&h=80&fit=crop" },
        ],
        slotEvents: [
          { title: "Zilker Summer Sessions", time: "5pm – 9pm", detail: "2 friends going", eventId: "prospect" },
          { title: "SFC Farmers' Market", time: "9am – 2pm", detail: "Republic Square", eventId: "farmers" },
          { title: "Yoga · Mueller Lake Park", time: "10am", detail: "Free", eventId: "yoga" },
        ],
      },
      {
        title: "CapMetro + AUS",
        time: "9pm – 10pm",
        meta: "Event",
        muted: true,
        slotFriends: [],
        slotEvents: [
          { title: "CapMetro + Airport Flyer", time: "9:15pm departure", detail: "Your reservation", eventId: "nyc-train" },
        ],
      },
    ],
  },
  {
    id: "jun-2",
    heading: "Sunday, June 2",
    blocks: [
      {
        title: "Morning Free",
        time: "9am – 1pm",
        meta: "8 Friends Free",
        slotFriends: [
          { name: "Sofia Reyes", avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop" },
          { name: "Harper Walsh", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop" },
        ],
        slotEvents: [
          { title: "Lady Bird Lake run club", time: "9am", detail: "Boardwalk", eventId: "run-club" },
        ],
      },
      {
        title: "Brunch window",
        time: "11am – 2pm",
        meta: "3 Friends Free",
        slotFriends: [
          { name: "Emma Nguyen", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop" },
        ],
        slotEvents: [
          { title: "Brunch · Josephine House", time: "12pm", detail: "2 spots left", eventId: "brunch" },
        ],
      },
      {
        title: "Evening Free",
        time: "5pm – 11pm",
        meta: "12 Friends Free",
        slotFriends: [
          { name: "Harper Walsh", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop" },
          { name: "Mia Torres", avatar: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=80&h=80&fit=crop" },
        ],
        slotEvents: [
          { title: "Sunset · Auditorium Shores", time: "6pm", detail: "Lady Bird Lake", eventId: "sunset" },
          { title: "Blue Starlite Drive-In", time: "8:30pm", detail: "Mueller", eventId: "movie" },
        ],
      },
    ],
  },
  {
    id: "jun-3",
    heading: "Monday, June 3",
    blocks: [
      {
        title: "Evening open",
        time: "6pm – 10pm",
        meta: "6 Friends Free",
        slotFriends: [
          { name: "Sofia Reyes", avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop" },
          { name: "Emma Nguyen", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop" },
        ],
        slotEvents: [
          { title: "BookPeople reading", time: "7pm", detail: "North Lamar", eventId: "book" },
        ],
      },
    ],
  },
];

/** Friends tab — date row (legacy / Home strip) */
export type FriendsScreenDateOption = {
  id: string;
  day: string;
  date: number;
  month: string;
};

export const friendsScreenSelectableDates: FriendsScreenDateOption[] =
  weekStrip.map((w) => ({
    id: w.detailId,
    day: w.day,
    date: w.date,
    month: w.month,
  }));

const FRIENDS_PICKER_DAY_NAMES = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
] as const;
const FRIENDS_PICKER_MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

function friendsPickerLocalYmd(d: Date): string {
  const y = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${mo}-${day}`;
}

export function buildFriendsPickerDays(
  from: Date = new Date(),
  count = 28,
): FriendsScreenDateOption[] {
  const y = from.getFullYear();
  const m = from.getMonth();
  const day = from.getDate();
  const out: FriendsScreenDateOption[] = [];
  const n = Math.max(1, Math.min(count, 366));
  for (let i = 0; i < n; i++) {
    const d = new Date(y, m, day + i);
    out.push({
      id: friendsPickerLocalYmd(d),
      day: FRIENDS_PICKER_DAY_NAMES[d.getDay()],
      date: d.getDate(),
      month: FRIENDS_PICKER_MONTH_NAMES[d.getMonth()],
    });
  }
  return out;
}

export function buildFriendsPickerThreeDays(
  from: Date = new Date(),
): FriendsScreenDateOption[] {
  return buildFriendsPickerDays(from, 3);
}

/** Friends tab — pick a window on Sat June 1 to see who’s free */
export const friendsScreenTimeSlots = [
  { id: "s1", label: "10am – 12pm" },
  { id: "s2", label: "12 – 2pm" },
  { id: "s3", label: "2 – 4pm" },
  { id: "s4", label: "4 – 6pm" },
  { id: "s5", label: "6 – 8pm" },
  { id: "s6", label: "8 – 10pm" },
] as const;

const FRIENDS_SCREEN_SLOT_BOUNDS: { id: string; start: number; end: number }[] =
  [
    { id: "s1", start: 10 * 60, end: 12 * 60 },
    { id: "s2", start: 12 * 60, end: 14 * 60 },
    { id: "s3", start: 14 * 60, end: 16 * 60 },
    { id: "s4", start: 16 * 60, end: 18 * 60 },
    { id: "s5", start: 18 * 60, end: 20 * 60 },
    { id: "s6", start: 20 * 60, end: 22 * 60 },
  ];

export function friendsScreenClockToMinutes(
  hour12: number,
  minute: number,
  ampm: "AM" | "PM",
): number {
  const h24 =
    hour12 === 12
      ? ampm === "AM"
        ? 0
        : 12
      : ampm === "PM"
        ? hour12 + 12
        : hour12;
  return h24 * 60 + minute;
}

export function friendsScreenTimeToSlotId(
  hour12: number,
  minute: number,
  ampm: "AM" | "PM",
): string {
  const mins = friendsScreenClockToMinutes(hour12, minute, ampm);
  for (const s of FRIENDS_SCREEN_SLOT_BOUNDS) {
    if (mins >= s.start && mins < s.end) return s.id;
  }
  if (mins < FRIENDS_SCREEN_SLOT_BOUNDS[0].start) return "s1";
  return "s6";
}

export function formatFriendsScreenClock(
  hour12: number,
  minute: number,
  ampm: "AM" | "PM",
): string {
  return `${hour12}:${minute.toString().padStart(2, "0")} ${ampm}`;
}

export function formatFriendsScreenTimeRange(
  start: { hour12: number; minute: number; ampm: "AM" | "PM" },
  end: { hour12: number; minute: number; ampm: "AM" | "PM" },
): string {
  return `${formatFriendsScreenClock(start.hour12, start.minute, start.ampm)} – ${formatFriendsScreenClock(end.hour12, end.minute, end.ampm)}`;
}

/** Friend ids free during each slot (mock) */
export const friendIdsFreeAtTimeSlot: Record<string, string[]> = {
  s1: ["1", "4"],
  s2: ["1", "2", "3"],
  s3: ["2", "4"],
  s4: ["1", "2", "3", "4"],
  s5: ["2", "4"],
  s6: ["1", "2"],
};

export function friendsScreenFriendIdsForMinutesRange(
  startMin: number,
  endMin: number,
): string[] {
  if (endMin <= startMin) return [];
  const overlapping = FRIENDS_SCREEN_SLOT_BOUNDS.filter(
    (s) => s.start < endMin && s.end > startMin,
  );
  if (overlapping.length === 0) return [];
  let acc = new Set<string>(
    friendIdsFreeAtTimeSlot[overlapping[0].id] ?? [],
  );
  for (let i = 1; i < overlapping.length; i++) {
    const ids = new Set(friendIdsFreeAtTimeSlot[overlapping[i].id] ?? []);
    acc = new Set([...acc].filter((id) => ids.has(id)));
  }
  return [...acc];
}

/** Human-readable demo slot window(s) overlapping a minute range. */
export function friendsScreenSlotSummaryForRange(
  startMin: number,
  endMin: number,
): string | null {
  if (endMin <= startMin) return null;
  const overlapping = FRIENDS_SCREEN_SLOT_BOUNDS.filter(
    (s) => s.start < endMin && s.end > startMin,
  );
  if (overlapping.length === 0) return null;
  const labels = overlapping
    .map((s) => friendsScreenTimeSlots.find((t) => t.id === s.id)?.label)
    .filter(Boolean) as string[];
  if (labels.length === 0) return null;
  if (labels.length === 1) return labels[0];
  return `${labels[0]} – ${labels[labels.length - 1]}`;
}

export type FriendProfile = {
  livingIn: string;
  homeTown: string;
  email: string;
  instagram?: string;
  x?: string;
  tiktok?: string;
  snapchat?: string;
  facebook?: string;
  youtube?: string;
  phone?: string;
  school?: string;
  job?: string;
  zodiac?: string;
};

export type Friend = {
  id: string;
  name: string;
  avatar: string;
  status: string;
  free: boolean;
  phone: string;
  profile: FriendProfile;
  isNew?: boolean;
  emoji?: string;
};

export const friends: Friend[] = [
  {
    id: "1",
    name: "Harper Walsh",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    status: "Free now · until 10pm",
    free: true,
    phone: "+15125550101",
    isNew: true,
    emoji: "🎵",
    profile: {
      livingIn: "Austin, TX",
      homeTown: "Houston, TX",
      email: "harper.walsh@email.com",
      instagram: "@harperatx",
      x: "@harperwalsh",
      tiktok: "@harperwalsh",
      school: "UT Austin",
      job: "Graphic designer",
      zodiac: "Leo",
    },
  },
  {
    id: "2",
    name: "Sofia Reyes",
    avatar:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop",
    status: "Free from 6pm · open",
    free: true,
    phone: "+15125550102",
    emoji: "❤️",
    profile: {
      livingIn: "Austin, TX",
      homeTown: "San Antonio, TX",
      email: "sofia.reyes@email.com",
      instagram: "@sofiainatx",
      x: "@sofiareyes",
      school: "UT Austin",
      job: "Nursing student",
      zodiac: "Pisces",
    },
  },
  {
    id: "3",
    name: "Emma Nguyen",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
    status: "Busy all day",
    free: false,
    phone: "+15125550103",
    emoji: "🌮",
    profile: {
      livingIn: "Austin, TX",
      homeTown: "Dallas, TX",
      email: "emma.nguyen@email.com",
      tiktok: "@emmaeatsatx",
      job: "Barista · Patika",
    },
  },
  {
    id: "4",
    name: "Mia Torres",
    avatar:
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=100&h=100&fit=crop",
    status: "Free now · until 8pm",
    free: true,
    phone: "+15125550104",
    emoji: "⭐",
    profile: {
      livingIn: "Austin, TX",
      homeTown: "El Paso, TX",
      email: "mia.torres@email.com",
      instagram: "@miatorres",
      youtube: "MiaInAustin",
      school: "St. Edward's University",
      zodiac: "Sagittarius",
    },
  },
  {
    id: "5",
    name: "Riley Brooks",
    avatar:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&h=100&fit=crop",
    status: "Free after 4pm · Rainey tonight?",
    free: true,
    phone: "+15125550105",
    emoji: "🌿",
    profile: {
      livingIn: "Austin, TX",
      homeTown: "Falls Church, VA",
      email: "riley.brooks@email.com",
      instagram: "@rileybrooks_atx",
      job: "UX researcher",
      zodiac: "Virgo",
    },
  },
  {
    id: "6",
    name: "Chloe Bennett",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop",
    status: "Free · want to Barton Springs?",
    free: true,
    phone: "+15125550106",
    emoji: "☀️",
    profile: {
      livingIn: "Austin, TX",
      homeTown: "Phoenix, AZ",
      email: "chloe.bennett@email.com",
      instagram: "@chloebtx",
      school: "UT Austin",
      job: "Barre instructor",
      zodiac: "Gemini",
    },
  },
];

/** Horizontally scrollable pool for Events “add to group” picker */
export const eventInvitePool: { id: string; name: string; avatar: string }[] = [
  ...friends.map((f) => ({ id: f.id, name: f.name, avatar: f.avatar })),
  {
    id: "inv-7",
    name: "Zoe Mitchell",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
  },
  {
    id: "inv-8",
    name: "Natalie Cruz",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
  },
];

/** Match slot-friend rows to Friends list for tel: links */
export function phoneForFriendName(name: string): string | undefined {
  return friends.find((f) => f.name === name)?.phone;
}

export type EventItem = {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  friendsGoing: number;
  image: string;
  tags?: string[];
  openNow?: boolean;
};

export const discoverEvents: EventItem[] = [
  {
    id: "prospect",
    title: "Zilker Summer Sessions",
    subtitle: "2 friends going · Great Lawn",
    time: "5pm – 9pm",
    friendsGoing: 2,
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=240&fit=crop",
  },
  {
    id: "rosemary",
    title: "June's All Day",
    subtitle: "South Congress · Open now",
    time: "Happy hour",
    friendsGoing: 1,
    image:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=240&fit=crop",
    tags: ["Happy Hour"],
    openNow: true,
  },
  {
    id: "park-soccer",
    title: "Pickup soccer · Zilker",
    subtitle: "4 friends interested",
    time: "3pm · Great Lawn",
    friendsGoing: 4,
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=240&fit=crop",
  },
  {
    id: "comedy",
    title: "Esther's Follies",
    subtitle: "2 friends going · 6th Street",
    time: "8pm doors",
    friendsGoing: 2,
    image:
      "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=400&h=240&fit=crop",
  },
  {
    id: "trivia",
    title: "Trivia · Lavaca Street Bar",
    subtitle: "Downtown Austin",
    time: "7pm",
    friendsGoing: 0,
    image:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=240&fit=crop",
  },
  {
    id: "food-hall",
    title: "Fareground food hall",
    subtitle: "2nd Street District",
    time: "12–3pm",
    friendsGoing: 0,
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=240&fit=crop",
  },
  {
    id: "museum",
    title: "Blanton Museum free day",
    subtitle: "UT campus · Austin",
    time: "11am–5pm",
    friendsGoing: 0,
    image:
      "https://images.unsplash.com/photo-1566127444979-b3d2b64d6fc0?w=400&h=240&fit=crop",
  },
  {
    id: "jazz",
    title: "The Elephant Room",
    subtitle: "Congress Ave jazz",
    time: "9pm",
    friendsGoing: 0,
    image:
      "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&h=240&fit=crop",
  },
  {
    id: "karaoke",
    title: "Karaoke · Elysium",
    subtitle: "Red River Cultural District",
    time: "10pm",
    friendsGoing: 0,
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=240&fit=crop",
  },
  {
    id: "dj",
    title: "DJ set — Summit Rooftop",
    subtitle: "Downtown views",
    time: "11pm",
    friendsGoing: 0,
    image:
      "https://images.unsplash.com/photo-1571266028243-e473f6abe5a1?w=400&h=240&fit=crop",
  },
  {
    id: "farmers",
    title: "SFC Farmers' Market",
    subtitle: "Republic Square",
    time: "9am – 2pm",
    friendsGoing: 0,
    image:
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=240&fit=crop",
  },
  {
    id: "yoga",
    title: "Yoga on the lawn",
    subtitle: "Mueller Lake Park · Free",
    time: "10am",
    friendsGoing: 0,
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=240&fit=crop",
  },
  {
    id: "nyc-train",
    title: "CapMetro + Airport Flyer",
    subtitle: "Your AUS trip leg",
    time: "9:15pm departure",
    friendsGoing: 0,
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=240&fit=crop",
  },
  {
    id: "run-club",
    title: "Lady Bird Lake run club",
    subtitle: "Boardwalk loop",
    time: "9am",
    friendsGoing: 0,
    image:
      "https://images.unsplash.com/photo-1552674605-5d2178b85608?w=400&h=240&fit=crop",
  },
  {
    id: "brunch",
    title: "Brunch · Josephine House",
    subtitle: "Clarksville · 2 spots left",
    time: "12pm",
    friendsGoing: 0,
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=240&fit=crop",
  },
  {
    id: "sunset",
    title: "Sunset at Auditorium Shores",
    subtitle: "Lady Bird Lake",
    time: "6pm",
    friendsGoing: 0,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=240&fit=crop",
  },
  {
    id: "movie",
    title: "Blue Starlite Mini Drive-In",
    subtitle: "Mueller · Tonight",
    time: "8:30pm",
    friendsGoing: 0,
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=240&fit=crop",
  },
  {
    id: "book",
    title: "BookPeople reading",
    subtitle: "North Lamar",
    time: "7pm",
    friendsGoing: 0,
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=240&fit=crop",
  },
  {
    id: "outdoor",
    title: "Moody Amphitheater summer show",
    subtitle: "3 friends saved it · Waterloo Park",
    time: "Sat Jun 8 · 6pm",
    friendsGoing: 3,
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=240&fit=crop",
  },
];

export const intentEvent = {
  id: "outdoor",
  title: "Moody Amphitheater summer show",
  dateLine: "Sat June 8 · 6pm · Waterloo Park",
  distance: "3mi · Downtown Austin",
  ticket: "Tickets $25 · Doors 5:30pm · All ages welcome.",
  image:
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=280&fit=crop",
  /** Opens in new tab — replace with real ticketing URL in production */
  eventWebsiteUrl: "https://www.ticketmaster.com/",
};

export type SavedItem = {
  id: string;
  /** Discover / feed event id — story posts and “here now” attach to this spot */
  eventId: string;
  title: string;
  meta: string;
  icon: "music" | "bowl" | "mountain";
  badge: string;
  badgeTone: "green" | "gray";
};

export const savedItems: SavedItem[] = [
  {
    id: "s1",
    eventId: "outdoor",
    title: "Moody Amphitheater",
    meta: "Sat Jun 8 · 6pm · 4 going",
    icon: "music",
    badge: "Planned!",
    badgeTone: "green",
  },
  {
    id: "s2",
    eventId: "food-hall",
    title: "Fareground lunch crawl",
    meta: "Anytime · 2 friends also saved",
    icon: "bowl",
    badge: "Rally?",
    badgeTone: "gray",
  },
  {
    id: "s3",
    eventId: "run-club",
    title: "Greenbelt hike weekend",
    meta: "Someday · 5 friends interested",
    icon: "mountain",
    badge: "Saved",
    badgeTone: "gray",
  },
];

/** Feed events where “dining / venue” actions show inKind */
export function feedEventIsRestaurantOption(eventId: string): boolean {
  return ["rosemary", "food-hall", "trivia", "brunch"].includes(eventId);
}

export function discoverEventById(id: string): EventItem | undefined {
  return discoverEvents.find((e) => e.id === id);
}

/** Past story-style posts at a spot (shown in Feed spot archive grid). */
export type FeedSpotPastPost = {
  id: string;
  imageUrl: string;
  authorName: string;
  timeLabel: string;
};

const _spot = (
  id: string,
  imageUrl: string,
  authorName: string,
  timeLabel: string,
): FeedSpotPastPost => ({ id, imageUrl, authorName, timeLabel });

/** Grids keyed by the same `eventId` as feed / discover. */
export const feedSpotPastPostsByEventId: Record<string, FeedSpotPastPost[]> = {
  prospect: [
    _spot(
      "sp-pr-1",
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=300&h=300&fit=crop",
      "Sofia Reyes",
      "2d ago",
    ),
    _spot(
      "sp-pr-2",
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
      "Harper Walsh",
      "1w ago",
    ),
    _spot(
      "sp-pr-3",
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=300&h=300&fit=crop",
      "Mia Torres",
      "2w ago",
    ),
    _spot(
      "sp-pr-4",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      "Emma Nguyen",
      "3w ago",
    ),
    _spot(
      "sp-pr-5",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
      "Claire Trundle",
      "1mo ago",
    ),
    _spot(
      "sp-pr-6",
      "https://images.unsplash.com/photo-1429963354344-1fa4872f3157?w=300&h=300&fit=crop",
      "Sofia Reyes",
      "1mo ago",
    ),
  ],
  outdoor: [
    _spot(
      "sp-od-1",
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
      "Mia Torres",
      "Yesterday",
    ),
    _spot(
      "sp-od-2",
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=300&h=300&fit=crop",
      "Sofia Reyes",
      "3d ago",
    ),
    _spot(
      "sp-od-3",
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=300&h=300&fit=crop",
      "Harper Walsh",
      "1w ago",
    ),
  ],
  rosemary: [
    _spot(
      "sp-ro-1",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=300&h=300&fit=crop",
      "Sofia Reyes",
      "Yesterday",
    ),
    _spot(
      "sp-ro-2",
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=300&h=300&fit=crop",
      "Harper Walsh",
      "4d ago",
    ),
    _spot(
      "sp-ro-3",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=300&fit=crop",
      "Mia Torres",
      "1w ago",
    ),
    _spot(
      "sp-ro-4",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=300&h=300&fit=crop",
      "Emma Nguyen",
      "2w ago",
    ),
  ],
  brunch: [
    _spot(
      "sp-br-1",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=300&fit=crop",
      "Sofia Reyes",
      "Last night",
    ),
    _spot(
      "sp-br-2",
      "https://images.unsplash.com/photo-1555992336-fb0d29498d13?w=300&h=300&fit=crop",
      "Harper Walsh",
      "3d ago",
    ),
    _spot(
      "sp-br-3",
      "https://images.unsplash.com/photo-1544148103-07737bfbad88?w=300&h=300&fit=crop",
      "Mia Torres",
      "1w ago",
    ),
  ],
  "food-hall": [
    _spot(
      "sp-fh-1",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&h=300&fit=crop",
      "Mia Torres",
      "5d ago",
    ),
    _spot(
      "sp-fh-2",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=300&fit=crop",
      "Sofia Reyes",
      "1w ago",
    ),
    _spot(
      "sp-fh-3",
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=300&fit=crop",
      "Emma Nguyen",
      "2w ago",
    ),
    _spot(
      "sp-fh-4",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=300&fit=crop",
      "Harper Walsh",
      "3w ago",
    ),
  ],
  trivia: [
    _spot(
      "sp-tr-1",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=300&h=300&fit=crop",
      "Sofia Reyes",
      "2d ago",
    ),
    _spot(
      "sp-tr-2",
      "https://images.unsplash.com/photo-1585699324551-f6f0bb35f28f?w=300&h=300&fit=crop",
      "Harper Walsh",
      "1w ago",
    ),
    _spot(
      "sp-tr-3",
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&h=300&fit=crop",
      "Mia Torres",
      "2w ago",
    ),
  ],
  "park-soccer": [
    _spot(
      "sp-ps-1",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=300&h=300&fit=crop",
      "Emma Nguyen",
      "Today",
    ),
    _spot(
      "sp-ps-2",
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=300&h=300&fit=crop",
      "Harper Walsh",
      "3d ago",
    ),
    _spot(
      "sp-ps-3",
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=300&h=300&fit=crop",
      "Mia Torres",
      "1w ago",
    ),
  ],
  "run-club": [
    _spot(
      "sp-rc-1",
      "https://images.unsplash.com/photo-1552674605-5d2178b85608?w=300&h=300&fit=crop",
      "Sofia Reyes",
      "Sun",
    ),
    _spot(
      "sp-rc-2",
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=300&h=300&fit=crop",
      "Harper Walsh",
      "Last week",
    ),
  ],
};

const feedSpotPastPostsFallback: FeedSpotPastPost[] = [
  _spot(
    "sp-fb-1",
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=300&fit=crop",
    "Friend",
    "1w ago",
  ),
  _spot(
    "sp-fb-2",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
    "Friend",
    "2w ago",
  ),
  _spot(
    "sp-fb-3",
    "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=300&h=300&fit=crop",
    "Friend",
    "3w ago",
  ),
];

export function feedSpotPastPostsForEvent(eventId: string): FeedSpotPastPost[] {
  return feedSpotPastPostsByEventId[eventId] ?? feedSpotPastPostsFallback;
}

export type FeedPost = {
  id: string;
  type: "event";
  /** Matches slot / discover event ids — deep link from Profile */
  eventId: string;
  author: string;
  avatar: string;
  headline: string;
  sub: string;
};

export const feedPosts: FeedPost[] = [
  {
    id: "fe-prospect",
    type: "event",
    eventId: "prospect",
    author: "Harper Walsh",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop",
    headline: "Harper is going to Zilker Summer Sessions",
    sub: "5pm – 9pm · 2 others interested",
  },
  {
    id: "fe-rosemary",
    type: "event",
    eventId: "rosemary",
    author: "Sofia Reyes",
    avatar:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop",
    headline: "Sofia · June's All Day tonight?",
    sub: "Happy hour · South Congress",
  },
  {
    id: "fe-outdoor",
    type: "event",
    eventId: "outdoor",
    author: "Mia Torres",
    avatar:
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=80&h=80&fit=crop",
    headline: "Moody Amphitheater — 3 friends saved it",
    sub: "Sat Jun 8 · 6pm · Waterloo Park",
  },
  {
    id: "fe-park-soccer",
    type: "event",
    eventId: "park-soccer",
    author: "Emma Nguyen",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop",
    headline: "Pickup soccer · Zilker Great Lawn",
    sub: "3pm · 4 friends interested",
  },
  {
    id: "fe-comedy",
    type: "event",
    eventId: "comedy",
    author: "Harper Walsh",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop",
    headline: "Esther's Follies · 6th Street",
    sub: "8pm doors · 2 going",
  },
  {
    id: "fe-trivia",
    type: "event",
    eventId: "trivia",
    author: "Sofia Reyes",
    avatar:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop",
    headline: "Trivia at Lavaca Street Bar",
    sub: "7pm · Downtown",
  },
  {
    id: "fe-food-hall",
    type: "event",
    eventId: "food-hall",
    author: "Mia Torres",
    avatar:
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=80&h=80&fit=crop",
    headline: "Fareground · downtown food hall",
    sub: "12–3pm",
  },
  {
    id: "fe-museum",
    type: "event",
    eventId: "museum",
    author: "Emma Nguyen",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop",
    headline: "Blanton free day · UT campus",
    sub: "11am–5pm",
  },
  {
    id: "fe-jazz",
    type: "event",
    eventId: "jazz",
    author: "Sofia Reyes",
    avatar:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop",
    headline: "The Elephant Room · late set",
    sub: "9pm · Congress",
  },
  {
    id: "fe-karaoke",
    type: "event",
    eventId: "karaoke",
    author: "Harper Walsh",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop",
    headline: "Karaoke · Elysium on Red River",
    sub: "10pm",
  },
  {
    id: "fe-dj",
    type: "event",
    eventId: "dj",
    author: "Mia Torres",
    avatar:
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=80&h=80&fit=crop",
    headline: "DJ set — Summit Rooftop",
    sub: "11pm",
  },
  {
    id: "fe-farmers",
    type: "event",
    eventId: "farmers",
    author: "Sofia Reyes",
    avatar:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop",
    headline: "SFC Farmers' Market · Republic Square",
    sub: "9am – 2pm",
  },
  {
    id: "fe-yoga",
    type: "event",
    eventId: "yoga",
    author: "Emma Nguyen",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop",
    headline: "Yoga · Mueller Lake Park",
    sub: "10am · Free",
  },
  {
    id: "fe-nyc-train",
    type: "event",
    eventId: "nyc-train",
    author: "Claire Trundle",
    avatar: "/profile/claire-trundle.png",
    headline: "CapMetro + ride to AUS",
    sub: "9:15pm departure",
  },
  {
    id: "fe-run-club",
    type: "event",
    eventId: "run-club",
    author: "Harper Walsh",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop",
    headline: "Lady Bird Lake run club",
    sub: "9am · Boardwalk",
  },
  {
    id: "fe-brunch",
    type: "event",
    eventId: "brunch",
    author: "Sofia Reyes",
    avatar:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop",
    headline: "Brunch · Josephine House",
    sub: "12pm · 2 spots left",
  },
  {
    id: "fe-sunset",
    type: "event",
    eventId: "sunset",
    author: "Mia Torres",
    avatar:
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=80&h=80&fit=crop",
    headline: "Sunset · Auditorium Shores",
    sub: "6pm",
  },
  {
    id: "fe-movie",
    type: "event",
    eventId: "movie",
    author: "Emma Nguyen",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop",
    headline: "Blue Starlite Mini Drive-In",
    sub: "8:30pm · Mueller",
  },
  {
    id: "fe-book",
    type: "event",
    eventId: "book",
    author: "Riley Brooks",
    avatar:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=80&h=80&fit=crop",
    headline: "BookPeople reading · North Lamar",
    sub: "7pm",
  },
];

/** Horizontal story rings: spots by event id (not user avatars). */
export type FeedStoryRingItem =
  | { id: string; isAdd: true; label?: string }
  | { id: string; eventId: string };

export const storyRow: FeedStoryRingItem[] = [
  { id: "me", isAdd: true, label: "Post" },
  { id: "sr-prospect", eventId: "prospect" },
  { id: "sr-outdoor", eventId: "outdoor" },
  { id: "sr-brunch", eventId: "brunch" },
  { id: "sr-food-hall", eventId: "food-hall" },
];

export const friendRequests = [
  {
    id: "fr1",
    name: "Amelia Foster",
    avatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop",
  },
  {
    id: "fr2",
    name: "Lauren Diaz",
    avatar:
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=80&h=80&fit=crop",
  },
];
