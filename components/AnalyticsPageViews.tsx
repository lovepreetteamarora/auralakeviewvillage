"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** Direct GA4 only: one page view for initial load and each pathname change. */
export function AnalyticsPageViews() {
  const pathname = usePathname();
  const previous = useRef<string | null>(null);
  useEffect(() => {
    if (!pathname || previous.current === pathname) return;
    const target = window as Window & { gtag?: (...args: unknown[]) => void };
    if (!target.gtag) return;
    previous.current = pathname;
    target.gtag("event", "page_view", {
      page_title: document.title,
      page_location: `${window.location.origin}${pathname}`,
    });
  }, [pathname]);
  return null;
}
