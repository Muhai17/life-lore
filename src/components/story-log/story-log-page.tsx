import { PageHeader, PageShell } from "@/components/ui/page-shell";
import { CardHeader, SurfaceCard } from "@/components/ui/surface-card";

const entries = [
  {
    date: "Today",
    title: "First careful attempt",
    description: "你在工匠之路上完成了一次重要尝试。",
  },
  {
    date: "Yesterday",
    title: "A quieter decision",
    description: "你把注意力从杂音中收回，选择继续推进核心版本。",
  },
  {
    date: "This Week",
    title: "Map begins to form",
    description: "Life Lore 的旅途结构开始显现出稳定的轮廓。",
  },
];

export function StoryLogPage() {
  return (
    <PageShell>
      <PageHeader
        label="Story Log"
        title="Living Memory"
        description="记录旅途中真正值得留下的片段，而不是堆积流水账。"
      />

      <SurfaceCard>
        <CardHeader title="Recent Entries" description="近期记录" />

        <div className="mt-8 space-y-6">
          {entries.map((entry) => (
            <article
              key={entry.title}
              className="grid gap-4 md:grid-cols-[140px_1fr]"
            >
              <p className="text-sm text-muted-foreground">{entry.date}</p>
              <div className="rounded-lg border border-white/70 bg-background/70 p-5">
                <h3 className="text-xl font-medium text-foreground">
                  {entry.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {entry.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </SurfaceCard>
    </PageShell>
  );
}
