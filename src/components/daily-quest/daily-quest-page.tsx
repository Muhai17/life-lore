import { CheckCircle2, Circle, Sparkles } from "lucide-react";
import { PageHeader, PageShell } from "@/components/ui/page-shell";
import { CardHeader, SurfaceCard } from "@/components/ui/surface-card";

const quests = [
  {
    title: "Write one honest reflection",
    description: "写下一段真实的今日感受",
    reward: "Knowledge Scroll +2",
    done: true,
  },
  {
    title: "Shape a small creation",
    description: "完成一个微小但完整的作品动作",
    reward: "Creation Shard +1",
    done: false,
  },
  {
    title: "Reach out with warmth",
    description: "向一位同行者表达感谢或支持",
    reward: "Companions +1",
    done: false,
  },
];

export function DailyQuestPage() {
  return (
    <PageShell>
      <PageHeader
        label="Daily Quest"
        title="Small Steps"
        description="用三个安静的小任务，为今天的旅途留下清晰刻度。"
      />

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[0.7fr_1.3fr]">
        <SurfaceCard>
          <CardHeader title="Today Focus" description="今日专注" />
          <div className="mt-8 flex h-28 w-28 items-center justify-center rounded-full bg-secondary/70 text-3xl font-medium text-primary">
            1 / 3
          </div>
          <p className="mt-6 text-sm leading-6 text-muted-foreground">
            保持节奏，不追求完成全部，只确认今天确实向前了一点。
          </p>
        </SurfaceCard>

        <div className="space-y-3">
          {quests.map((quest) => {
            const Icon = quest.done ? CheckCircle2 : Circle;

            return (
              <article
                key={quest.title}
                className="rounded-lg border border-white/70 bg-white/58 p-6 shadow-[0_18px_54px_rgba(44,52,64,0.06)]"
              >
                <div className="flex flex-col items-start gap-4 sm:flex-row">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary/70 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-medium leading-7 text-foreground">
                      {quest.title}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {quest.description}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 rounded-md bg-background/70 px-3 py-2 text-sm text-primary">
                    <Sparkles className="h-4 w-4" />
                    {quest.reward}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}
