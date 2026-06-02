import type { Metadata } from "next";
import { Sidebar } from "@/components/layout/sidebar";
import { TopResourceBar } from "@/components/layout/top-resource-bar";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Life Lore",
  description: "A warm, minimal space for life exploration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-background text-foreground">
          <Sidebar />
          <div className="min-w-0 flex-1">
            <TopResourceBar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
