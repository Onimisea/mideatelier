"use client";

import { useAppStore } from "@/store";
import { useEffect, useState } from "react";

interface HydrationProviderProps {
  children: React.ReactNode;
}

export default function HydrationProvider({
  children,
}: HydrationProviderProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    useAppStore.persist.rehydrate();
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#bf6b04]"></div>
      </div>
    );
  }

  return <>{children}</>;
}
