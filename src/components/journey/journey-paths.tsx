import { CardHeader, SurfaceCard } from "@/components/ui/surface-card";

const paths = [
  {
    englishName: "Scholar Path",
    chineseName: "学者之路",
    level: 7,
    progress: 68,
  },
  {
    englishName: "Artisan Path",
    chineseName: "工匠之路",
    level: 5,
    progress: 52,
  },
  {
    englishName: "Explorer Path",
    chineseName: "探索者之路",
    level: 4,
    progress: 41,
  },
  {
    englishName: "Guardian Path",
    chineseName: "守护者之路",
    level: 3,
    progress: 33,
  },
  {
    englishName: "Growth Path",
    chineseName: "成长者之路",
    level: 6,
    progress: 74,
  },
];

export function JourneyPaths() {
  return (
    <SurfaceCard>
      <div className="flex items-end justify-between gap-4">
        <CardHeader title="Journey Paths" description="人生旅途" />
      </div>

      <div className="mt-5 space-y-4">
        {paths.map((path) => (
          <div key={path.englishName} className="min-w-0">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {path.englishName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {path.chineseName}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-xs text-muted-foreground">
                  Level {path.level}
                </p>
                <p className="text-sm font-medium text-primary">
                  {path.progress}%
                </p>
              </div>
            </div>
            <div className="mt-2 h-2 rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,hsl(var(--primary)),hsl(var(--accent)))]"
                style={{ width: `${path.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </SurfaceCard>
  );
}
