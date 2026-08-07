import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Thin gradient progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? h.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-[2px]">
      <div
        className="h-full origin-left"
        style={{ background: "var(--spectrum)", transform: `scaleX(${p})` }}
      />
    </div>
  );
}

function useScrollProgressIn<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [t, setT] = useState(0.5);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 when the element enters from the bottom, 1 when it leaves at the top
      const raw = (vh - r.top) / (vh + r.height);
      setT(Math.min(1, Math.max(0, raw)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return { ref, t };
}

/** Moves its children vertically as the section scrolls through the viewport. */
export function Parallax({
  children,
  className,
  distance = 70,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const { ref, t } = useScrollProgressIn<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn("will-change-transform motion-reduce:!transform-none", className)}
      style={{ transform: `translate3d(0, ${(0.5 - t) * distance}px, 0)` }}
    >
      {children}
    </div>
  );
}

/** Image that scales down and un-masks as it scrolls into view (rrcorp-style). */
export function ParallaxImage({
  src,
  alt,
  className,
  ratio = "aspect-[4/3]",
  zoom = 0.14,
  shift = 40,
}: {
  src: string;
  alt: string;
  className?: string;
  ratio?: string;
  zoom?: number;
  shift?: number;
}) {
  const { ref, t } = useScrollProgressIn<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn(
        "group relative overflow-hidden rounded-[1.75rem] border border-border bg-secondary",
        ratio,
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        width={1280}
        height={960}
        className="absolute inset-0 size-full object-cover motion-reduce:!transform-none"
        style={{
          transform: `scale(${1 + zoom * (1 - t)}) translate3d(0, ${(0.5 - t) * shift}px, 0)`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-25"
        style={{ background: "var(--spectrum)" }}
      />
    </div>
  );
}

/** Counts up to `to` the first time it becomes visible. */
export function CountUp({
  to,
  suffix = "",
  duration = 1600,
  className,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setV(Math.round(to * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return (
    <span ref={ref} className={className}>
      {v.toLocaleString()}
      {suffix}
    </span>
  );
}
