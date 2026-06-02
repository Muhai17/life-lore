import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export function SurfaceCard({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLElement> & { children: ReactNode }) {
  return (
    <section
      className={cn(
        "rounded-lg border border-white/70 bg-white/58 p-6 shadow-[0_18px_54px_rgba(44,52,64,0.06)]",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export function CardHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h2 className="text-lg font-medium leading-7 text-foreground">
        {title}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
