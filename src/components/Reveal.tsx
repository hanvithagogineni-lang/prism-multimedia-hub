import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "mask" | "scale" | "left";
};

export function Reveal({ children, className, delay = 0, variant = "up" }: RevealProps) {
  const { ref, shown } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      data-shown={shown ? "true" : "false"}
      className={cn(`reveal reveal-${variant}`, className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function RevealText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const { ref, shown } = useInView<HTMLSpanElement>();
  const words = text.split(" ");
  return (
    <span ref={ref} className={cn("inline", className)}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="word-mask">
          <span
            data-shown={shown ? "true" : "false"}
            className="reveal reveal-up inline-block"
            style={{ transitionDelay: `${delay + i * 55}ms` }}
          >
            {w}
          </span>
          <span>&nbsp;</span>
        </span>
      ))}
    </span>
  );
}
