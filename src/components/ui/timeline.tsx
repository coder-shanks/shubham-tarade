"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({
  data,
  className,
}: {
  data: TimelineEntry[];
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className={cn("w-full font-sans", className)} ref={containerRef}>
      <div ref={ref} className="relative mx-auto max-w-5xl">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-8 lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:items-start lg:gap-10 lg:pt-12"
          >
            <div className="sticky top-24 z-20 hidden self-start lg:block">
              <div className="relative flex items-center">
                <div className="absolute -left-1.5 h-3 w-3 rounded-full border border-border bg-background" />
                <h3 className="pl-4 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {item.title}
                </h3>
              </div>
            </div>

            <div className="relative w-full min-w-0 pl-8 lg:pl-0">
              <h3 className="mb-3 block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground lg:hidden">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-3 top-0 w-px overflow-hidden bg-gradient-to-b from-transparent via-border to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-0"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-px rounded-full bg-gradient-to-b from-primary via-[var(--cli-orange)] to-transparent"
          />
        </div>
      </div>
    </div>
  );
};
