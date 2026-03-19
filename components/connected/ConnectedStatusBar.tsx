export function ConnectedStatusBar() {
  return (
    <div className="flex h-11 shrink-0 items-center justify-between px-5 text-[13px] text-neutral-700">
      <span className="font-semibold">9:41</span>
      <div className="flex items-center gap-1 text-[10px]">
        <span>●●●●●</span>
        <span className="text-xs">📶</span>
        <span className="rounded border border-neutral-400 px-1 text-[10px]">
          100%
        </span>
      </div>
    </div>
  );
}
