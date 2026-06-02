import { PageHeader, PageShell } from "@/components/ui/page-shell";

const paths = [
  {
    title: "Scholar Path",
    description: "学者之路",
    state: "Seeking clarity",
    progress: "68%",
  },
  {
    title: "Artisan Path",
    description: "工匠之路",
    state: "Making steadily",
    progress: "52%",
  },
  {
    title: "Explorer Path",
    description: "探索者之路",
    state: "Opening terrain",
    progress: "41%",
  },
  {
    title: "Guardian Path",
    description: "守护者之路",
    state: "Holding balance",
    progress: "33%",
  },
];

export function PathsPage() {
  return (
    <PageShell>
      <PageHeader
        label="Paths"
        title="Inner Terrain"
        description="以更宽阔的视角，观察不同人生路径正在如何生长。"
      />

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {paths.map((path) => (
          <article
            key={path.title}
            className="rounded-lg border border-white/70 bg-white/58 p-6 shadow-[0_18px_54px_rgba(44,52,64,0.06)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-medium leading-7 text-foreground">
                  {path.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {path.description}
                </p>
              </div>
              <p className="text-lg font-medium text-primary">
                {path.progress}
              </p>
            </div>
            <div className="mt-8 rounded-lg bg-background/70 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Current State
              </p>
              <p className="mt-2 text-sm text-foreground">{path.state}</p>
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
