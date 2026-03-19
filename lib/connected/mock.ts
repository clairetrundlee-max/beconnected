export const user = {
  name: "Claire M.",
  avatar:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  sharing: "Sharing with Close Friends",
};

const A = {
  jake: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
  maya: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
  alex: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
  kai: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop",
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
      title: "Sunday run club",
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
      title: "1:1 with Maya",
      time: "3pm – 3:30pm",
      calendar: "Google Calendar",
    },
  ],
  "2025-06-07": [
    {
      title: "Park pickup soccer",
      time: "3pm – 5pm",
      calendar: "Apple Calendar",
    },
  ],
  "2025-06-08": [
    {
      title: "Outdoor Summer Concert",
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
      title: "Flight to Chicago",
      time: "7:15am departure",
      calendar: "Google Calendar",
    },
  ],
};

export const weekStrip: WeekDay[] = [
  { day: "Sun", date: 20, month: "May", hoursFree: 5, detailId: "may-20", friendAvatars: [A.jake, A.maya, A.alex] },
  { day: "Mon", date: 21, month: "May", hoursFree: 4, detailId: "may-21", friendAvatars: [A.jake, A.alex] },
  { day: "Tue", date: 22, month: "May", hoursFree: 6, detailId: "may-22", friendAvatars: [A.maya, A.jake, A.kai] },
  { day: "Wed", date: 23, month: "May", hoursFree: 6, detailId: "may-23", friendAvatars: [A.alex, A.maya] },
  { day: "Thu", date: 24, month: "May", hoursFree: 8, detailId: "may-24", friendAvatars: [A.jake, A.maya, A.kai] },
  { day: "Fri", date: 25, month: "May", hoursFree: 8, detailId: "may-25", friendAvatars: [A.jake, A.alex, A.kai] },
  { day: "Sat", date: 1, month: "Jun", hoursFree: 11, detailId: "jun-1", friendAvatars: [A.jake, A.maya, A.alex] },
  { day: "Sun", date: 2, month: "Jun", hoursFree: 9, detailId: "jun-2", friendAvatars: [A.maya, A.jake] },
  { day: "Mon", date: 3, month: "Jun", hoursFree: 5, detailId: "jun-3", friendAvatars: [A.maya, A.alex] },
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
          { name: "Jake Rivera", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop", note: "Free all afternoon" },
          { name: "Maya Chan", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop", note: "Free after 3pm" },
          { name: "Alex Park", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop", note: "Free 2–5pm" },
        ],
        slotEvents: [
          { title: "Park pickup soccer", time: "3pm · Central Park", detail: "4 friends interested", eventId: "park-soccer" },
          { title: "Rosemary Wine Bar", time: "5pm open", detail: "Happy hour", eventId: "rosemary" },
        ],
      },
      {
        title: "Evening",
        time: "7pm – 10pm",
        meta: "4 Friends Free",
        slotFriends: [
          { name: "Kai Forbes", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop" },
          { name: "Maya Chan", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop" },
        ],
        slotEvents: [
          { title: "Comedy show — East Village", time: "8pm doors", detail: "2 friends going", eventId: "comedy" },
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
          { name: "Jake Rivera", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" },
          { name: "Alex Park", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop" },
        ],
        slotEvents: [
          { title: "Trivia night", time: "7pm · The Well", detail: "Nearby", eventId: "trivia" },
          { title: "Prospect Park Concert", time: "5pm – 9pm", detail: "Music", eventId: "prospect" },
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
          { name: "Maya Chan", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop" },
        ],
        slotEvents: [
          { title: "Food hall pop-up", time: "12–3pm", detail: "Soho", eventId: "food-hall" },
        ],
      },
      {
        title: "Evening Free",
        time: "6pm – 11pm",
        meta: "5 Friends Free",
        slotFriends: [
          { name: "Jake Rivera", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" },
          { name: "Kai Forbes", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop" },
        ],
        slotEvents: [
          { title: "Outdoor Summer Concert", time: "Sat Jun 8 · 6pm", detail: "Saved by 3 friends", eventId: "outdoor" },
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
          { name: "Alex Park", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop" },
          { name: "Maya Chan", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop" },
        ],
        slotEvents: [
          { title: "Museum free day", time: "11am–5pm", detail: "Brooklyn", eventId: "museum" },
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
          { name: "Jake Rivera", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" },
          { name: "Maya Chan", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop" },
          { name: "Kai Forbes", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop" },
        ],
        slotEvents: [
          { title: "Late jazz set", time: "9pm", detail: "Village", eventId: "jazz" },
          { title: "Karaoke night", time: "10pm", detail: "K-Town", eventId: "karaoke" },
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
          { name: "Jake Rivera", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" },
          { name: "Alex Park", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop" },
        ],
        slotEvents: [
          { title: "Rosemary Wine Bar", time: "Happy hour", detail: "1 friend interested", eventId: "rosemary" },
        ],
      },
      {
        title: "Late night",
        time: "9pm – 2am",
        meta: "12 Friends Free",
        slotFriends: [
          { name: "Kai Forbes", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop" },
        ],
        slotEvents: [
          { title: "DJ set — warehouse", time: "11pm", detail: "Bushwick", eventId: "dj" },
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
          { name: "Jake Rivera", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop", note: "All day" },
          { name: "Maya Chan", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop", note: "Until 6pm" },
          { name: "Alex Park", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop" },
          { name: "Kai Forbes", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop" },
        ],
        slotEvents: [
          { title: "Prospect Park Concert", time: "5pm – 9pm", detail: "2 friends going", eventId: "prospect" },
          { title: "Farmers market", time: "9am – 2pm", detail: "Grand Army Plaza", eventId: "farmers" },
          { title: "Yoga in the park", time: "10am", detail: "Free", eventId: "yoga" },
        ],
      },
      {
        title: "NYC Train",
        time: "9pm – 10pm",
        meta: "Event",
        muted: true,
        slotFriends: [],
        slotEvents: [
          { title: "NYC Train — Penn to Upstate", time: "9:15pm departure", detail: "Your reservation", eventId: "nyc-train" },
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
          { name: "Maya Chan", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop" },
          { name: "Jake Rivera", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" },
        ],
        slotEvents: [
          { title: "Sunday run club", time: "9am", detail: "Prospect Park", eventId: "run-club" },
        ],
      },
      {
        title: "Brunch window",
        time: "11am – 2pm",
        meta: "3 Friends Free",
        slotFriends: [
          { name: "Alex Park", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop" },
        ],
        slotEvents: [
          { title: "Bottomless brunch — Bishop Bar", time: "12pm", detail: "2 spots left", eventId: "brunch" },
        ],
      },
      {
        title: "Evening Free",
        time: "5pm – 11pm",
        meta: "12 Friends Free",
        slotFriends: [
          { name: "Jake Rivera", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" },
          { name: "Kai Forbes", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop" },
        ],
        slotEvents: [
          { title: "Sunset picnic", time: "6pm", detail: "Brooklyn Bridge Park", eventId: "sunset" },
          { title: "Open-air movie", time: "8:30pm", detail: "Skyline Drive-In", eventId: "movie" },
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
          { name: "Maya Chan", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop" },
          { name: "Alex Park", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop" },
        ],
        slotEvents: [
          { title: "Book club", time: "7pm", detail: "Cafe nearby", eventId: "book" },
        ],
      },
    ],
  },
];

/** Friends tab — pick a window on Sat June 1 to see who’s free */
export const friendsScreenTimeSlots = [
  { id: "s1", label: "10am – 12pm" },
  { id: "s2", label: "12 – 2pm" },
  { id: "s3", label: "2 – 4pm" },
  { id: "s4", label: "4 – 6pm" },
  { id: "s5", label: "6 – 8pm" },
  { id: "s6", label: "8 – 10pm" },
] as const;

/** Friend ids free during each slot (mock) */
export const friendIdsFreeAtTimeSlot: Record<string, string[]> = {
  s1: ["1", "4"],
  s2: ["1", "2", "3"],
  s3: ["2", "4"],
  s4: ["1", "2", "3", "4"],
  s5: ["2", "4"],
  s6: ["1", "2"],
};

export type Friend = {
  id: string;
  name: string;
  avatar: string;
  status: string;
  free: boolean;
  /** E.164-ish for tel: — opens Phone app (often surfaces saved contact) */
  phone: string;
  isNew?: boolean;
  emoji?: string;
};

export const friends: Friend[] = [
  {
    id: "1",
    name: "Jake Rivera",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    status: "Free now · until 10pm",
    free: true,
    phone: "+12125550101",
    isNew: true,
    emoji: "🎵",
  },
  {
    id: "2",
    name: "Maya Chan",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    status: "Free from 6pm · open",
    free: true,
    phone: "+12125550102",
    emoji: "❤️",
  },
  {
    id: "3",
    name: "Alex Park",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    status: "Busy all day",
    free: false,
    phone: "+12125550103",
    emoji: "🍜",
  },
  {
    id: "4",
    name: "Kai Forbes",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    status: "Free now · until 8pm",
    free: true,
    phone: "+12125550104",
    emoji: "⭐",
  },
];

/** Horizontally scrollable pool for Events “add to group” picker */
export const eventInvitePool: { id: string; name: string; avatar: string }[] = [
  ...friends.map((f) => ({ id: f.id, name: f.name, avatar: f.avatar })),
  {
    id: "inv-5",
    name: "Riley Chen",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
  },
  {
    id: "inv-6",
    name: "Marcus Webb",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
  },
  {
    id: "inv-7",
    name: "Sofia Ortiz",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    id: "inv-8",
    name: "Dev Patel",
    avatar:
      "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop",
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
    title: "Prospect Park Concert",
    subtitle: "2 friends going",
    time: "5pm – 9pm",
    friendsGoing: 2,
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=240&fit=crop",
  },
  {
    id: "rosemary",
    title: "Rosemary Wine Bar",
    subtitle: "1 friend interested · Open now",
    time: "Happy hour",
    friendsGoing: 1,
    image:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=240&fit=crop",
    tags: ["Happy Hour"],
    openNow: true,
  },
  {
    id: "park-soccer",
    title: "Park pickup soccer",
    subtitle: "4 friends interested",
    time: "3pm · Central Park",
    friendsGoing: 4,
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=240&fit=crop",
  },
  {
    id: "comedy",
    title: "Comedy show — East Village",
    subtitle: "2 friends going",
    time: "8pm doors",
    friendsGoing: 2,
    image:
      "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=400&h=240&fit=crop",
  },
  {
    id: "trivia",
    title: "Trivia night · The Well",
    subtitle: "Nearby",
    time: "7pm",
    friendsGoing: 0,
    image:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=240&fit=crop",
  },
  {
    id: "food-hall",
    title: "Food hall pop-up",
    subtitle: "Soho",
    time: "12–3pm",
    friendsGoing: 0,
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=240&fit=crop",
  },
  {
    id: "museum",
    title: "Museum free day",
    subtitle: "Brooklyn",
    time: "11am–5pm",
    friendsGoing: 0,
    image:
      "https://images.unsplash.com/photo-1566127444979-b3d2b64d6fc0?w=400&h=240&fit=crop",
  },
  {
    id: "jazz",
    title: "Late jazz set",
    subtitle: "Village",
    time: "9pm",
    friendsGoing: 0,
    image:
      "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&h=240&fit=crop",
  },
  {
    id: "karaoke",
    title: "Karaoke night",
    subtitle: "K-Town",
    time: "10pm",
    friendsGoing: 0,
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=240&fit=crop",
  },
  {
    id: "dj",
    title: "DJ set — warehouse",
    subtitle: "Bushwick",
    time: "11pm",
    friendsGoing: 0,
    image:
      "https://images.unsplash.com/photo-1571266028243-e473f6abe5a1?w=400&h=240&fit=crop",
  },
  {
    id: "farmers",
    title: "Farmers market",
    subtitle: "Grand Army Plaza",
    time: "9am – 2pm",
    friendsGoing: 0,
    image:
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=240&fit=crop",
  },
  {
    id: "yoga",
    title: "Yoga in the park",
    subtitle: "Free",
    time: "10am",
    friendsGoing: 0,
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=240&fit=crop",
  },
  {
    id: "nyc-train",
    title: "NYC Train — Penn to Upstate",
    subtitle: "Your reservation",
    time: "9:15pm departure",
    friendsGoing: 0,
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=240&fit=crop",
  },
  {
    id: "run-club",
    title: "Sunday run club",
    subtitle: "Prospect Park",
    time: "9am",
    friendsGoing: 0,
    image:
      "https://images.unsplash.com/photo-1552674605-5d2178b85608?w=400&h=240&fit=crop",
  },
  {
    id: "brunch",
    title: "Bottomless brunch — Bishop Bar",
    subtitle: "2 spots left",
    time: "12pm",
    friendsGoing: 0,
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=240&fit=crop",
  },
  {
    id: "sunset",
    title: "Sunset picnic",
    subtitle: "Brooklyn Bridge Park",
    time: "6pm",
    friendsGoing: 0,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=240&fit=crop",
  },
  {
    id: "movie",
    title: "Open-air movie — Skyline Drive-In",
    subtitle: "Tonight",
    time: "8:30pm",
    friendsGoing: 0,
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=240&fit=crop",
  },
  {
    id: "book",
    title: "Book club",
    subtitle: "Cafe nearby",
    time: "7pm",
    friendsGoing: 0,
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=240&fit=crop",
  },
];

export const intentEvent = {
  id: "outdoor",
  title: "Outdoor Summer Concert",
  dateLine: "Sat June 8 · 6pm",
  distance: "12mi",
  ticket: "Tickets $25 · Doors 5:30pm · All ages welcome.",
  image:
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=280&fit=crop",
  /** Opens in new tab — replace with real ticketing URL in production */
  eventWebsiteUrl: "https://www.ticketmaster.com/",
};

export type SavedItem = {
  id: string;
  title: string;
  meta: string;
  icon: "music" | "bowl" | "mountain";
  badge: string;
  badgeTone: "green" | "gray";
};

export const savedItems: SavedItem[] = [
  {
    id: "s1",
    title: "Outdoor Concert",
    meta: "Sat Jun 8 · 6pm · 4 going",
    icon: "music",
    badge: "Planned!",
    badgeTone: "green",
  },
  {
    id: "s2",
    title: "Ramen Night",
    meta: "Anytime · 2 friends also saved",
    icon: "bowl",
    badge: "Rally?",
    badgeTone: "gray",
  },
  {
    id: "s3",
    title: "Catskills Hike",
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

export type FeedPost =
  | {
      id: string;
      type: "event";
      /** Matches slot / discover event ids — deep link from Profile */
      eventId: string;
      author: string;
      avatar: string;
      headline: string;
      sub: string;
    }
  | {
      id: string;
      type: "photo";
      author: string;
      avatar: string;
      place: string;
      sub: string;
      image: string;
    };

export const feedPosts: FeedPost[] = [
  {
    id: "fe-prospect",
    type: "event",
    eventId: "prospect",
    author: "Jake Rivera",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
    headline: "Jake is going to Prospect Park Concert",
    sub: "5pm – 9pm · 2 others interested",
  },
  {
    id: "fe-rosemary",
    type: "event",
    eventId: "rosemary",
    author: "Maya Chan",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
    headline: "Maya · Rosemary Wine Bar tonight?",
    sub: "Happy hour · Open now",
  },
  {
    id: "fe-outdoor",
    type: "event",
    eventId: "outdoor",
    author: "Kai Forbes",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop",
    headline: "Outdoor Summer Concert — 3 friends saved it",
    sub: "Sat Jun 8 · 6pm",
  },
  {
    id: "f2",
    type: "photo",
    author: "Maya Chan",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
    place: "Bishop Bar",
    sub: "Last night",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
  },
  {
    id: "fe-park-soccer",
    type: "event",
    eventId: "park-soccer",
    author: "Alex Park",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
    headline: "Park pickup soccer · Central Park",
    sub: "3pm · 4 friends interested",
  },
  {
    id: "fe-comedy",
    type: "event",
    eventId: "comedy",
    author: "Jake Rivera",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
    headline: "Comedy show — East Village",
    sub: "8pm doors · 2 going",
  },
  {
    id: "fe-trivia",
    type: "event",
    eventId: "trivia",
    author: "Maya Chan",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
    headline: "Trivia night at The Well",
    sub: "7pm · Nearby",
  },
  {
    id: "fe-food-hall",
    type: "event",
    eventId: "food-hall",
    author: "Kai Forbes",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop",
    headline: "Food hall pop-up · Soho",
    sub: "12–3pm",
  },
  {
    id: "fe-museum",
    type: "event",
    eventId: "museum",
    author: "Alex Park",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
    headline: "Museum free day · Brooklyn",
    sub: "11am–5pm",
  },
  {
    id: "fe-jazz",
    type: "event",
    eventId: "jazz",
    author: "Maya Chan",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
    headline: "Late jazz · Village",
    sub: "9pm",
  },
  {
    id: "fe-karaoke",
    type: "event",
    eventId: "karaoke",
    author: "Jake Rivera",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
    headline: "Karaoke night · K-Town",
    sub: "10pm",
  },
  {
    id: "f3",
    type: "photo",
    author: "Jake Rivera",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
    place: "Prospect Park",
    sub: "Park",
    image:
      "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=400&h=300&fit=crop",
  },
  {
    id: "fe-dj",
    type: "event",
    eventId: "dj",
    author: "Kai Forbes",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop",
    headline: "DJ set — Bushwick warehouse",
    sub: "11pm",
  },
  {
    id: "fe-farmers",
    type: "event",
    eventId: "farmers",
    author: "Maya Chan",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
    headline: "Farmers market · Grand Army Plaza",
    sub: "9am – 2pm",
  },
  {
    id: "fe-yoga",
    type: "event",
    eventId: "yoga",
    author: "Alex Park",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
    headline: "Yoga in the park",
    sub: "10am · Free",
  },
  {
    id: "fe-nyc-train",
    type: "event",
    eventId: "nyc-train",
    author: "Claire M.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
    headline: "NYC Train — Penn to Upstate",
    sub: "9:15pm departure",
  },
  {
    id: "fe-run-club",
    type: "event",
    eventId: "run-club",
    author: "Jake Rivera",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
    headline: "Sunday run club · Prospect Park",
    sub: "9am",
  },
  {
    id: "fe-brunch",
    type: "event",
    eventId: "brunch",
    author: "Maya Chan",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
    headline: "Bottomless brunch — Bishop Bar",
    sub: "12pm · 2 spots left",
  },
  {
    id: "fe-sunset",
    type: "event",
    eventId: "sunset",
    author: "Kai Forbes",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop",
    headline: "Sunset picnic · Brooklyn Bridge Park",
    sub: "6pm",
  },
  {
    id: "fe-movie",
    type: "event",
    eventId: "movie",
    author: "Alex Park",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop",
    headline: "Open-air movie · Skyline Drive-In",
    sub: "8:30pm",
  },
  {
    id: "fe-book",
    type: "event",
    eventId: "book",
    author: "Maya Chan",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
    headline: "Book club · cafe nearby",
    sub: "7pm",
  },
];

export const storyRow = [
  { id: "me", label: "My Story", isAdd: true },
  { id: "jake", label: "Jake", avatar: friends[0].avatar },
  { id: "maya", label: "Maya", avatar: friends[1].avatar },
  { id: "kai", label: "Kai", avatar: friends[3].avatar },
];

export const friendRequests = [
  {
    id: "fr1",
    name: "Sam Lee",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop",
  },
  {
    id: "fr2",
    name: "Jordan Kim",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop",
  },
];
