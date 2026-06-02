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
  const [selectedEntry, setSelectedEntry] = useState<JourneyEntry | null>(null);

  useEffect(() => {
    const storedEntries = sortNewestFirst(getJourneyEntries());

    setEntries(storedEntries);
    setSelectedEntry(storedEntries[0] ?? null);
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
            <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-4">
                {entries.map((entry) => (
                  <article
                    key={entry.id}
                    className="grid gap-4 md:grid-cols-[140px_1fr] xl:grid-cols-1"
                  >
                    <p className="text-sm text-muted-foreground">
                      {formatEntryDate(entry.createdAt)}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSelectedEntry(entry)}
                      className="rounded-lg border border-white/70 bg-background/70 p-5 text-left transition-colors hover:bg-white/60"
                    >
                      <h3 className="text-xl font-medium text-foreground">
                        Journey Entry
                      </h3>
                      <p className="mt-2 line-clamp-3 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                        {entry.content}
                      </p>
                    </button>
                  </article>
                ))}
              </div>

              <div className="rounded-lg border border-white/70 bg-background/70 p-6">
                <h3 className="text-xl font-medium text-foreground">
                  Entry Detail
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">记录详情</p>

                {selectedEntry && (
                  <div className="mt-6">
                    <p className="text-sm text-muted-foreground">
                      {formatEntryDate(selectedEntry.createdAt)}
                    </p>
                    <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-foreground">
                      {selectedEntry.content}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </SurfaceCard>
    </PageShell>
  );
}
