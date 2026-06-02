"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  CheckSquare,
  Compass,
  Flag,
  Map,
  User,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navigationItems = [
  {
    label: "Journey",
    description: "旅途总览",
    href: "/",
    icon: Compass,
  },
  {
    label: "Daily Quest",
    description: "每日任务",
    href: "/daily-quest",
    icon: CheckSquare,
  },
  {
    label: "Story Log",
    description: "旅程日志",
    href: "/story-log",
    icon: BookOpen,
  },
  {
    label: "Paths",
    description: "人生路径",
    href: "/paths",
    icon: Map,
  },
  {
    label: "Quest",
    description: "主线任务",
    href: "/quest",
    icon: Flag,
  },
  {
    label: "Profile",
    description: "个人档案",
    href: "/profile",
    icon: User,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-[252px] shrink-0 border-r border-white/60 bg-sidebar px-4 py-5 shadow-[18px_0_60px_rgba(44,52,64,0.08)] md:flex md:flex-col">
      <div className="flex items-center justify-between px-2">
        <div>
          <p className="text-[11px] font-medium tracking-[0.28em] text-muted-foreground">
            Life Lore
          </p>
          <p className="mt-1 text-sm text-foreground">探索属于你的版图</p>
        </div>
        <div
          aria-label="Reserved profile avatar"
          className="h-10 w-10 rounded-full border border-white/70 bg-[linear-gradient(135deg,hsl(var(--accent)),hsl(var(--secondary)))] shadow-inner"
        />
      </div>

      <nav className="mt-10 space-y-1.5" aria-label="Primary navigation">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === item.href
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex min-h-14 items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors",
                "hover:bg-white/58 hover:text-foreground",
                isActive &&
                  "bg-white/72 text-foreground shadow-[0_12px_34px_rgba(44,52,64,0.08)]"
              )}
            >
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-md border border-transparent text-muted-foreground transition-colors",
                  isActive
                    ? "border-white/70 bg-accent/55 text-primary"
                    : "group-hover:border-white/70 group-hover:bg-white/55 group-hover:text-primary"
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span>
                <span className="block font-medium leading-5">
                  {item.label}
                </span>
                <span className="block text-xs leading-4 text-muted-foreground">
                  {item.description}
                </span>
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-lg border border-white/70 bg-white/42 p-3">
        <p className="text-sm font-medium text-foreground">Take a breath.</p>
        <p className="text-xs leading-5 text-muted-foreground">
          静下来，
          <br />
          看看下一段旅途将通往哪里。
        </p>
      </div>
    </aside>
  );
}
