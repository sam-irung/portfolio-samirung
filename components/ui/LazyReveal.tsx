"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const Reveal = dynamic(() => import("./Reveal"), {
  ssr: true,
  loading: () => <div className="opacity-0" />,
});

export default function LazyReveal({
  children,
  delay,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <Reveal delay={delay} className={className}>
      {children}
    </Reveal>
  );
}