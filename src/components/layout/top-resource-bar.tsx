import { BookMarked, Flame, Gem, ScrollText, Users } from "lucide-react";

const resources = [
  {
    label: "Knowledge Scroll",
    description: "知识卷轴",
    value: 438,
    icon: ScrollText,
  },
  {
    label: "Creation Shard",
    description: "创世碎片",
    value: 217,
    icon: Gem,
  },
  {
    label: "Companions",
    description: "同行者",
    value: 89,
    icon: Users,
  },
  {
    label: "Coin Pouch",
    description: "金币袋",
    value: 44,
    icon: BookMarked,
  },
  {
    label: "Life Ember",
    description: "生命火种",
    value: 120,
    icon: Flame,
  },
];

export function TopResourceBar() {
  return (
    <header className="sticky top-0 z-10 border-b border-white/60 bg-background/82 px-4 py-4 backdrop-blur-xl md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="shrink-0">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
            Resources
          </p>
          <p className="mt-1 text-sm text-muted-foreground">旅途资源</p>
        </div>

        <div className="flex w-full min-w-0 gap-2 overflow-x-auto pb-1 xl:flex-1 xl:justify-end xl:overflow-visible xl:pb-0">
          {resources.map((resource) => {
            const Icon = resource.icon;

            return (
              <div
                key={resource.label}
                className="flex h-16 w-[128px] shrink-0 items-center gap-2 rounded-lg border border-white/70 bg-white/55 px-3 shadow-[0_10px_30px_rgba(44,52,64,0.05)] xl:w-[176px] xl:gap-3"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-secondary/70 text-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-xs font-medium text-foreground">
                    {resource.label}
                  </span>
                  <span className="block truncate text-[11px] text-muted-foreground">
                    {resource.description}
                  </span>
                  <span className="mt-0.5 block text-sm font-medium text-primary">
                    {resource.value}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
}
