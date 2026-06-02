import { Button } from "@/components/ui/button";
import { CardHeader, SurfaceCard } from "@/components/ui/surface-card";

export function MainQuest() {
  return (
    <SurfaceCard>
      <CardHeader title="Main Quest" description="当前主线" />

      <div className="mt-6">
        <p className="text-sm text-muted-foreground">当前主线任务</p>
        <h3 className="mt-2 text-2xl font-medium text-foreground">
          Build Life Lore MVP
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          打造 Life Lore 第一版
        </p>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress 进度</span>
          <span className="font-medium text-primary">40%</span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-muted">
          <div className="h-full w-[40%] rounded-full bg-primary" />
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-background/70 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Next Step
        </p>
        <p className="mt-2 text-sm text-foreground">下一步目标</p>
      </div>

      <Button className="mt-5" variant="secondary">
        View Details 查看详情
      </Button>
    </SurfaceCard>
  );
}
