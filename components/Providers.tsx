"use client";

import { ThemeProvider } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import { isClerkConfigured } from "@/lib/clerk-config";

export function Providers({ children }: { children: React.ReactNode }) {
  const content = (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );

  if (isClerkConfigured()) {
    return <ClerkProvider>{content}</ClerkProvider>;
  }

  return content;
}
