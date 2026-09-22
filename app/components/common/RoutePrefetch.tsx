"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PREFETCH_ROUTES = ["/menu", "/shop", "/events", "/news"];

export default function RoutePrefetch() {
  const router = useRouter();

  useEffect(() => {
    for (const href of PREFETCH_ROUTES) {
      router.prefetch(href);
    }
  }, [router]);

  return null;
}
