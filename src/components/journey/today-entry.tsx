import { Button } from "@/components/ui/button";
import { CardHeader, SurfaceCard } from "@/components/ui/surface-card";

export function TodayEntry() {
  return (
    <SurfaceCard>
      <CardHeader title="Today Entry" description="今日记录" />

      <textarea
        className="mt-5 min-h-48 w-full resize-none rounded-lg border border-white/80 bg-background/70 p-4 text-sm text-foreground outline-none placeholder:text-muted-foreground"
        placeholder="记录你的经历、想法、感受……"
      />

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">0 / 1000</p>
        <Button>Advance Journey 推进旅程</Button>
      </div>
    </SurfaceCard>
  );
}
