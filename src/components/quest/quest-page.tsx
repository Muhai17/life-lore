import { Button } from "@/components/ui/button";
import { PageHeader, PageShell } from "@/components/ui/page-shell";
import { CardHeader, SurfaceCard } from "@/components/ui/surface-card";

const milestones = [
  "Project foundation",
  "Journey surface",
  "Static lore pages",
  "Design cleanup",
];

export function QuestPage() {
  return (
    <PageShell>
      <PageHeader
        label="Quest"
        title="Main Line"
        description="聚焦当前主线，不让旅途被过多支线分散。"
      />

      <SurfaceCard>
        <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm text-muted-foreground">Current Quest</p>
            <h2 className="mt-3 text-3xl font-medium text-foreground">
              Build Life Lore MVP
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              打造 Life Lore 第一版
            </p>

            <div className="mt-8">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress 进度</span>
                <span className="font-medium text-primary">40%</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-muted">
                <div className="h-full w-[40%] rounded-full bg-primary" />
              </div>
            </div>

            <Button className="mt-8" variant="secondary">
              View Details 查看详情
            </Button>
          </div>

          <div className="rounded-lg bg-background/70 p-5">
            <CardHeader title="Milestones" description="阶段节点" />
            <div className="mt-5 space-y-3">
              {milestones.map((milestone) => (
                <div
                  key={milestone}
                  className="rounded-md border border-white/70 bg-white/54 px-4 py-3 text-sm text-foreground"
                >
                  {milestone}
                </div>
              ))}
            </div>
          </div>
        </div>
      </SurfaceCard>
    </PageShell>
  );
}
