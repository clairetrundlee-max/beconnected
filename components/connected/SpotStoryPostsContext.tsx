"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { FeedSpotPastPost } from "@/lib/connected/mock";

type SpotStoryPostsContextValue = {
  userPostsByEventId: Record<string, FeedSpotPastPost[]>;
  addUserSpotPost: (eventId: string, post: FeedSpotPastPost) => void;
};

const SpotStoryPostsContext = createContext<SpotStoryPostsContextValue | null>(
  null,
);

export function SpotStoryPostsProvider({ children }: { children: ReactNode }) {
  const [userPostsByEventId, setUserPostsByEventId] = useState<
    Record<string, FeedSpotPastPost[]>
  >({});

  const addUserSpotPost = useCallback(
    (eventId: string, post: FeedSpotPastPost) => {
      setUserPostsByEventId((prev) => ({
        ...prev,
        [eventId]: [post, ...(prev[eventId] ?? [])],
      }));
    },
    [],
  );

  const value = useMemo(
    () => ({ userPostsByEventId, addUserSpotPost }),
    [userPostsByEventId, addUserSpotPost],
  );

  return (
    <SpotStoryPostsContext.Provider value={value}>
      {children}
    </SpotStoryPostsContext.Provider>
  );
}

export function useSpotStoryPosts(): SpotStoryPostsContextValue {
  const ctx = useContext(SpotStoryPostsContext);
  if (!ctx) {
    throw new Error(
      "useSpotStoryPosts must be used within SpotStoryPostsProvider",
    );
  }
  return ctx;
}

export function nextUserSpotPostId(): string {
  return `user-spot-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
