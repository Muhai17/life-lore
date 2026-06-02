import { CardHeader } from "@/components/ui/surface-card";

export function JourneyRecap() {
  return (
    <section className="rounded-lg border border-white/70 bg-[linear-gradient(135deg,hsl(var(--secondary))_0%,hsl(var(--background))_48%,hsl(var(--accent))_100%)] p-6 shadow-[0_18px_54px_rgba(44,52,64,0.06)]">
      <CardHeader title="Journey Recap" description="今日旅程回顾" />

      <div className="mt-8 max-w-2xl">
        <p className="text-2xl font-medium leading-relaxed text-foreground">
          你在工匠之路的码头上完成了第一次重要尝试。
        </p>
        <p className="mt-4 text-lg text-muted-foreground">
          新的灵感正在萌芽。
        </p>
      </div>
    </section>
  );
}
