"use client";

import { ChevronLeft, Settings } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ConnectedBottomNav,
  type ConnectedTab,
} from "@/components/connected/ConnectedBottomNav";
import { HomeScreen } from "@/components/connected/screens/HomeScreen";
import { CalendarScreen } from "@/components/connected/screens/CalendarScreen";
import { FriendsScreen } from "@/components/connected/screens/FriendsScreen";
import { EventsScreen } from "@/components/connected/screens/EventsScreen";
import { FeedScreen } from "@/components/connected/screens/FeedScreen";
import { SettingsScreen } from "@/components/connected/screens/SettingsScreen";
import { IntentEventDetailScreen } from "@/components/connected/screens/IntentEventDetailScreen";
import { FriendsFreeEventScreen } from "@/components/connected/screens/FriendsFreeEventScreen";
import { InviteSentScreen } from "@/components/connected/screens/InviteSentScreen";
import { CreateGroupScreen } from "@/components/connected/screens/CreateGroupScreen";

type IntentStage = null | "detail" | "friends" | "sent";

export function ConnectedShell() {
  const [tab, setTab] = useState<ConnectedTab>("home");
  const [intent, setIntent] = useState<IntentStage>(null);
  const [feedFocusEventId, setFeedFocusEventId] = useState<string | null>(
    null,
  );
  const [eventsFocusEventId, setEventsFocusEventId] = useState<string | null>(
    null,
  );
  const [inviteFromFeed, setInviteFromFeed] = useState(false);
  const [eventsOpenSavedFromIntent, setEventsOpenSavedFromIntent] =
    useState(false);
  const [createGroupMembers, setCreateGroupMembers] = useState<string[] | null>(
    null,
  );
  const tabBeforeSettings = useRef<ConnectedTab>("home");
  const intentBeforeSettings = useRef<IntentStage>(null);

  const clearFeedFocus = useCallback(() => setFeedFocusEventId(null), []);
  const clearEventsFocus = useCallback(() => setEventsFocusEventId(null), []);

  const openSettings = useCallback(() => {
    if (tab !== "settings") {
      tabBeforeSettings.current = tab;
    }
    if (intent !== null) {
      intentBeforeSettings.current = intent;
      setIntent(null);
    } else {
      intentBeforeSettings.current = null;
    }
    setTab("settings");
  }, [tab, intent]);

  const closeSettings = useCallback(() => {
    const backIntent = intentBeforeSettings.current;
    intentBeforeSettings.current = null;
    if (backIntent != null) {
      setTab(tabBeforeSettings.current);
      setIntent(backIntent);
    } else {
      setTab(tabBeforeSettings.current);
    }
  }, []);

  const navigateTab = useCallback(
    (t: ConnectedTab) => {
      if (tab === "settings" && t !== "settings") {
        intentBeforeSettings.current = null;
      }
      setTab(t);
    },
    [tab],
  );

  useEffect(() => {
    if (tab !== "friends") setInviteFromFeed(false);
  }, [tab]);

  return (
    <div className="relative min-h-dvh bg-[#f5f2eb] text-neutral-900">
      <div
        className={`pointer-events-none fixed left-1/2 z-[60] w-full max-w-[430px] -translate-x-1/2 ${createGroupMembers !== null ? "hidden" : ""}`}
        style={{ top: "calc(env(safe-area-inset-top) + 2.75rem)" }}
      >
        {tab === "settings" ? (
          <button
            type="button"
            onClick={closeSettings}
            className="pointer-events-auto absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#faf8f4] text-neutral-700 shadow-sm ring-1 ring-[#e0dcd0] active:bg-[#ebe8e0]"
            aria-label="Back"
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={2} />
          </button>
        ) : (
          <button
            type="button"
            onClick={openSettings}
            className="pointer-events-auto absolute right-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#faf8f4] text-neutral-700 shadow-sm ring-1 ring-[#e0dcd0] active:bg-[#ebe8e0]"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" strokeWidth={2} />
          </button>
        )}
      </div>
      {intent === null && createGroupMembers === null && (
        <>
          {tab === "home" && (
            <HomeScreen
              onSlotNavigate={(eventId, dest) => {
                if (dest === "feed") {
                  setFeedFocusEventId(eventId);
                  setTab("feed");
                } else {
                  setEventsFocusEventId(eventId);
                  setTab("events");
                }
              }}
              onCreateGroup={(names) => setCreateGroupMembers(names)}
            />
          )}
          {tab === "calendar" && <CalendarScreen onNavigate={navigateTab} />}
          {tab === "friends" && (
            <FriendsScreen
              inviteFromFeed={inviteFromFeed}
              onDismissInviteHint={() => setInviteFromFeed(false)}
              onCreateGroup={(names) => setCreateGroupMembers(names)}
            />
          )}
          {tab === "events" && (
            <EventsScreen
              focusEventId={eventsFocusEventId}
              onFocusConsumed={clearEventsFocus}
              onOpenIntentDetail={() => setIntent("detail")}
              openSavedFromIntent={eventsOpenSavedFromIntent}
              onOpenSavedFromIntentConsumed={() =>
                setEventsOpenSavedFromIntent(false)
              }
              onCreateGroup={(names) => setCreateGroupMembers(names)}
            />
          )}
          {tab === "feed" && (
            <FeedScreen
              focusEventId={feedFocusEventId}
              onFocusConsumed={clearFeedFocus}
              onInviteToFriends={() => {
                setInviteFromFeed(true);
                navigateTab("friends");
              }}
            />
          )}
          {tab === "settings" && <SettingsScreen />}
        </>
      )}

      {intent === "detail" && (
        <IntentEventDetailScreen
          onBack={() => setIntent(null)}
          onWantToGo={() => setIntent("friends")}
          onOpenEventsSaved={() => {
            clearEventsFocus();
            setIntent(null);
            setEventsOpenSavedFromIntent(true);
            setTab("events");
          }}
        />
      )}

      {intent === "friends" && (
        <FriendsFreeEventScreen
          onBack={() => setIntent("detail")}
          onInviteAll={() => setIntent("sent")}
        />
      )}

      {intent === "sent" && (
        <InviteSentScreen
          onClose={() => {
            setIntent(null);
            setTab("feed");
          }}
          onImIn={() => {
            setIntent(null);
            setTab("feed");
          }}
        />
      )}

      {intent === null && createGroupMembers === null && (
        <ConnectedBottomNav active={tab} onChange={navigateTab} />
      )}

      {createGroupMembers !== null && (
        <CreateGroupScreen
          memberNames={createGroupMembers}
          onBack={() => setCreateGroupMembers(null)}
        />
      )}
    </div>
  );
}
