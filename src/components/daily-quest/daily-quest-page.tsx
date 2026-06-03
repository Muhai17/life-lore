"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Circle, Sparkles, Trash2 } from "lucide-react";
import { PageHeader, PageShell } from "@/components/ui/page-shell";
import { Button } from "@/components/ui/button";
import { CardHeader, SurfaceCard } from "@/components/ui/surface-card";
import {
  deleteDailyQuest,
  getDailyQuests,
  getTodayCompletions,
  saveDailyQuest,
  toggleDailyQuestCompletion,
} from "@/lib/storage/daily-quest-storage";
import type {
  DailyQuest,
  DailyQuestCompletion,
  DailyQuestRewardPreview,
} from "@/types/daily-quest";

const DEFAULT_REWARD_PREVIEWS: DailyQuestRewardPreview[] = [
  {
    resourceType: "knowledgeScroll",
    amount: 5,
  },
  {
    resourceType: "lifeEmber",
    amount: 3,
  },
  {
    resourceType: "creationShard",
    amount: 3,
  },
];

const REWARD_LABELS: Record<DailyQuestRewardPreview["resourceType"], string> = {
  knowledgeScroll: "Knowledge Scroll",
  creationShard: "Creation Shard",
  lifeEmber: "Life Ember",
  companions: "Companions",
  coinPouch: "Coin Pouch",
};

function getDefaultRewardPreview(questCount: number) {
  return DEFAULT_REWARD_PREVIEWS[
    questCount % DEFAULT_REWARD_PREVIEWS.length
  ];
}

function formatRewardPreview(rewardPreview: DailyQuestRewardPreview) {
  return `${REWARD_LABELS[rewardPreview.resourceType]} +${rewardPreview.amount}`;
}

export function DailyQuestPage() {
  const [quests, setQuests] = useState<DailyQuest[]>([]);
  const [completions, setCompletions] = useState<DailyQuestCompletion[]>([]);
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setQuests(getDailyQuests());
    setCompletions(getTodayCompletions());
  }, []);

  function handleAddQuest() {
    const trimmedTitle = title.trim();

    setErrorMessage("");

    if (!trimmedTitle) {
      setErrorMessage("Please name this quest. 请先写下任务名称。");
      return;
    }

    try {
      const newQuest = saveDailyQuest({
        title: trimmedTitle,
        rewardPreview: getDefaultRewardPreview(quests.length),
      });

      setQuests((currentQuests) => [newQuest, ...currentQuests]);
      setTitle("");
    } catch {
      setErrorMessage("Unable to save quest. 暂时无法保存这个任务。");
    }
  }

  function handleToggleCompletion(questId: string) {
    setErrorMessage("");

    try {
      toggleDailyQuestCompletion(questId);
      setCompletions(getTodayCompletions());
    } catch {
      setErrorMessage("Unable to update quest. 暂时无法更新任务状态。");
    }
  }

  function handleDeleteQuest(questId: string) {
    setErrorMessage("");

    try {
      deleteDailyQuest(questId);
      setQuests((currentQuests) => {
        return currentQuests.filter((quest) => quest.id !== questId);
      });
      setCompletions(getTodayCompletions());
    } catch {
      setErrorMessage("Unable to delete quest. 暂时无法删除这个任务。");
    }
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
            {completions.length} / {quests.length}
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
              <div className="mt-3 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2">
                <p className="break-words text-sm font-medium text-destructive">
                  {errorMessage}
                </p>
              </div>
            )}
          </article>

          {quests.length === 0 && (
            <article className="rounded-lg border border-white/70 bg-white/58 p-6 shadow-[0_18px_54px_rgba(44,52,64,0.06)]">
              <h2 className="text-lg font-medium leading-7 text-foreground">
                No quests yet
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                先写下一个今天可以完成的小任务，让旅途有一个清晰的起点。
              </p>
            </article>
          )}

          {quests.map((quest) => {
            const isCompleted = completions.some((completion) => {
              return completion.questId === quest.id;
            });
            const StatusIcon = isCompleted ? CheckCircle2 : Circle;

            return (
              <article
                key={quest.id}
                className={`rounded-lg border p-6 shadow-[0_18px_54px_rgba(44,52,64,0.06)] ${
                  isCompleted
                    ? "border-white/60 bg-white/40"
                    : "border-white/70 bg-white/58"
                }`}
              >
                <div className="flex flex-col items-start gap-4 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => handleToggleCompletion(quest.id)}
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md transition-colors ${
                      isCompleted
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-secondary/70 text-primary hover:bg-secondary"
                    }`}
                    aria-label={
                      isCompleted
                        ? "Mark quest incomplete"
                        : "Mark quest complete"
                    }
                  >
                    <StatusIcon className="h-5 w-5" />
                  </button>
                  <div className="min-w-0 flex-1">
                    <h2
                      className={`break-words text-lg font-medium leading-7 ${
                        isCompleted
                          ? "text-muted-foreground line-through"
                          : "text-foreground"
                      }`}
                    >
                      {quest.title}
                    </h2>
                    {quest.description && (
                      <p className="mt-1 break-words text-sm leading-6 text-muted-foreground">
                        {quest.description}
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {quest.rewardPreview && (
                      <div className="flex items-center gap-2 rounded-md bg-background/70 px-3 py-2 text-sm text-primary">
                        <Sparkles className="h-4 w-4" />
                        {formatRewardPreview(quest.rewardPreview)}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDeleteQuest(quest.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-md bg-background/70 text-muted-foreground transition-colors hover:text-destructive"
                      aria-label="Delete quest"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
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
