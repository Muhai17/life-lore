import { JourneyPaths } from "@/components/journey/journey-paths";
import { JourneyRecap } from "@/components/journey/journey-recap";
import { MainQuest } from "@/components/journey/main-quest";
import { TodayEntry } from "@/components/journey/today-entry";
import { TodayRewards } from "@/components/journey/today-rewards";
import { PageHeader, PageShell } from "@/components/ui/page-shell";

export function JourneyPage() {
  return (
    <PageShell>
      <PageHeader
        label="Journey"
        title="Life Exploration"
        description="用清醒而温柔的节奏，整理今天的路径、任务与收获。"
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.08fr_0.92fr]">
        <JourneyPaths />
        <TodayEntry />
        <MainQuest />
        <div className="xl:col-span-2">
          <TodayRewards />
        </div>
        <div className="xl:col-span-2">
          <JourneyRecap />
        </div>
      </div>
    </PageShell>
  );
}
