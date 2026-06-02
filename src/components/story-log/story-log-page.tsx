"use client";

import { useEffect, useState } from "react";
import { PageHeader, PageShell } from "@/components/ui/page-shell";
import { CardHeader, SurfaceCard } from "@/components/ui/surface-card";
import { getJourneyEntries } from "@/lib/journey-storage";
import type { JourneyEntry } from "@/types/journey-entry";

function sortNewestFirst(entries: JourneyEntry[]) {
  return [...entries].sort((firstEntry, secondEntry) => {
    return (
      new Date(secondEntry.createdAt).getTime() -
      new Date(firstEntry.createdAt).getTime()
    );
  });
}

function formatEntryDate(createdAt: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(createdAt));
}

export function StoryLogPage() {
  const [entries, setEntries] = useState<JourneyEntry[]>([]);

  useEffect(() => {
    setEntries(sortNewestFirst(getJourneyEntries()));
  }, []);

  return (
    <PageShell>
      <PageHeader
        label="Story Log"
        title="Living Memory"
        description="记录旅途中真正值得留下的片段，而不是堆积流水账。"
      />

      <SurfaceCard>
        <CardHeader title="Recent Entries" description="近期记录" />

        <div className="mt-8 space-y-6">
          {entries.length === 0 ? (
            <div className="rounded-lg border border-white/70 bg-background/70 p-6">
              <h3 className="text-xl font-medium text-foreground">
                No memories yet
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                还没有旅程记录
              </p>
            </div>
          ) : (
            entries.map((entry) => (
              <article
                key={entry.id}
                className="grid gap-4 md:grid-cols-[140px_1fr]"
              >
                <p className="text-sm text-muted-foreground">
                  {formatEntryDate(entry.createdAt)}
                </p>
                <div className="rounded-lg border border-white/70 bg-background/70 p-5">
                  <h3 className="text-xl font-medium text-foreground">
                    Journey Entry
                  </h3>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                    {entry.content}
                  </p>
                </div>
              </article>
            ))
          )}
        </div>
      </SurfaceCard>
    </PageShell>
  );
}
