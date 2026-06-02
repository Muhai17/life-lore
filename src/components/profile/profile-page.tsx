import { PageHeader, PageShell } from "@/components/ui/page-shell";
import { CardHeader, SurfaceCard } from "@/components/ui/surface-card";

const traits = [
  "Calm Builder",
  "Reflective Maker",
  "Patient Explorer",
  "Quiet Strategist",
];

export function ProfilePage() {
  return (
    <PageShell>
      <PageHeader
        label="Profile"
        title="Personal Atlas"
        description="这里暂时只展示静态身份轮廓，为未来旅途记录预留空间。"
      />

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[0.82fr_1.18fr]">
        <SurfaceCard>
          <div className="h-20 w-20 rounded-full border border-white/80 bg-[linear-gradient(135deg,hsl(var(--accent)),hsl(var(--secondary)))]" />
          <h2 className="mt-6 text-2xl font-medium text-foreground">
            Life Traveler
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">旅途行者</p>
          <p className="mt-6 text-sm leading-6 text-muted-foreground">
            以温柔、清醒、稳定的方式，持续整理自己的路径与故事。
          </p>
        </SurfaceCard>

        <SurfaceCard>
          <CardHeader title="Current Traits" description="当前特质" />
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {traits.map((trait) => (
              <div
                key={trait}
                className="rounded-lg border border-white/70 bg-background/70 p-4 text-sm font-medium text-foreground"
              >
                {trait}
              </div>
            ))}
          </div>
        </SurfaceCard>
      </section>
    </PageShell>
  );
}
