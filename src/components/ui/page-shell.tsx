import type { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">{children}</div>
    </main>
  );
}

export function PageHeader({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8">
      <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
        {label}
      </p>
      <h1 className="mt-3 text-4xl font-medium leading-tight text-foreground">
        {title}
      </h1>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
