import { BookMarked, Flame, Gem, ScrollText, Users } from "lucide-react";
import { CardHeader, SurfaceCard } from "@/components/ui/surface-card";

const rewards = [
  {
    label: "Knowledge Scroll",
    description: "知识卷轴",
    value: "+3",
    icon: ScrollText,
  },
  {
    label: "Creation Shard",
    description: "创世碎片",
    value: "+2",
    icon: Gem,
  },
  {
    label: "Companions",
    description: "同行者",
    value: "+1",
    icon: Users,
  },
  {
    label: "Coin Pouch",
    description: "金币袋",
    value: "+0",
    icon: BookMarked,
  },
  {
    label: "Life Ember",
    description: "生命火种",
    value: "+2",
    icon: Flame,
  },
];

export function TodayRewards() {
  return (
    <SurfaceCard>
      <CardHeader title="Today Rewards" description="今日收获" />

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {rewards.map((reward) => {
          const Icon = reward.icon;

          return (
            <div
              key={reward.label}
              className="rounded-lg border border-white/70 bg-background/70 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary/70 text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-lg font-medium text-primary">
                  {reward.value}
                </span>
              </div>
              <p className="mt-4 text-sm font-medium text-foreground">
                {reward.label}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {reward.description}
              </p>
            </div>
          );
        })}
      </div>
    </SurfaceCard>
  );
}
