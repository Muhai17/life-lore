"use client";

import { useEffect, useState } from "react";
import { Circle, Sparkles } from "lucide-react";
import { PageHeader, PageShell } from "@/components/ui/page-shell";
import { Button } from "@/components/ui/button";
import { CardHeader, SurfaceCard } from "@/components/ui/surface-card";
import {
  getDailyQuests,
  saveDailyQuest,
} from "@/lib/storage/daily-quest-storage";
import type { DailyQuest } from "@/types/daily-quest";

export function DailyQuestPage() {
  const [quests, setQuests] = useState<DailyQuest[]>([]);
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setQuests(getDailyQuests());
  }, []);

  function handleAddQuest() {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setErrorMessage("Please name this quest. 请先写下任务名称。");
      return;
    }

    const newQuest = saveDailyQuest({ title: trimmedTitle });

    setQuests((currentQuests) => [newQuest, ...currentQuests]);
    setTitle("");
    setErrorMessage("");
  }

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
            {quests.length}
          </div>
          <p className="mt-6 text-sm leading-6 text-muted-foreground">
            保持节奏，不追求完成全部，只确认今天确实向前了一点。
          </p>
        </SurfaceCard>

        <div className="space-y-3">
          <article className="rounded-lg border border-white/70 bg-white/58 p-6 shadow-[0_18px_54px_rgba(44,52,64,0.06)]">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                  setErrorMessage("");
                }}
                className="h-10 min-w-0 flex-1 rounded-lg border border-white/80 bg-background/70 px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                placeholder="Add a daily quest / 添加每日任务"
                type="text"
              />
              <Button onClick={handleAddQuest}>Add Quest 添加任务</Button>
            </div>
            {errorMessage && (
              <p className="mt-3 text-sm font-medium text-destructive">
                {errorMessage}
              </p>
            )}
          </article>

          {quests.map((quest) => {
            return (
              <article
                key={quest.id}
                className="rounded-lg border border-white/70 bg-white/58 p-6 shadow-[0_18px_54px_rgba(44,52,64,0.06)]"
              >
                <div className="flex flex-col items-start gap-4 sm:flex-row">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary/70 text-primary">
                    <Circle className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-medium leading-7 text-foreground">
                      {quest.title}
                    </h2>
                    {quest.description && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {quest.description}
                      </p>
                    )}
                  </div>
                  {quest.rewardPreview && (
                    <div className="flex shrink-0 items-center gap-2 rounded-md bg-background/70 px-3 py-2 text-sm text-primary">
                      <Sparkles className="h-4 w-4" />
                      +{quest.rewardPreview.amount}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}
