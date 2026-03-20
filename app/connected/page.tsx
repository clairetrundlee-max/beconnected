"use client";

import { ConnectedShell } from "@/components/connected/ConnectedShell";
import { SpotStoryPostsProvider } from "@/components/connected/SpotStoryPostsContext";

export default function ConnectedPage() {
  return (
    <SpotStoryPostsProvider>
      <ConnectedShell />
    </SpotStoryPostsProvider>
  );
}
