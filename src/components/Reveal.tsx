"use client";

/**
 * Scroll-triggered animation component — Next.js SSR friendly
 * 
 * Strategy: SSR mein content visible render hoga (no opacity-0 flash).
 * Client mount hone ke baad, sirf below-viewport elements ko hide karke
 * IntersectionObserver se animate karenge. Isse back navigation par
 * content kabhi blank nahi dikhega.
 */
import { PropsWithChildren, useEffect, useRef, useState } from "react";

type AnimationType =
  | "fade"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "scale"
  | "pop";

type RevealProps = PropsWithChildren<{
  delayMs?: number;
  className?: string;
  animation?: AnimationType;
  duration?: number;
  threshold?: number;
}>;

export default function Reveal({
  children,
  delayMs = 0,
  className = "",
  animation = "fade",
  duration = 800,
  threshold = 0.1,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // SSR mein visible = true — server rendered HTML mein content dikhega
  const [visible, setVisible] = useState(true);
  // Client mount hua ya nahi — hydration mismatch se bachne ke liye
  const [mounted, setMounted] = useState(false);

  const animationStyles = {
    fade: {
      initial: "opacity-0",
      animate: "opacity-100",
    },
    "slide-up": {
      initial: "opacity-0 translate-y-8",
      animate: "opacity-100 translate-y-0",
    },
    "slide-down": {
      initial: "opacity-0 -translate-y-8",
      animate: "opacity-100 translate-y-0",
    },
    "slide-left": {
      initial: "opacity-0 translate-x-8",
      animate: "opacity-100 translate-x-0",
    },
    "slide-right": {
      initial: "opacity-0 -translate-x-8",
      animate: "opacity-100 translate-x-0",
    },
    scale: {
      initial: "opacity-0 scale-95",
      animate: "opacity-100 scale-100",
    },
    pop: {
      initial: "opacity-0 scale-90",
      animate: "opacity-100 scale-100",
    },
  };

  // Step 1: Client mount hone par check karo ki element viewport ke neeche hai ya nahi
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Sirf below-viewport elements ko hide karo — in-view aur above elements visible rahenge
    if (rect.top > viewportHeight) {
      setVisible(false);
    }
    // Agar element viewport mein ya uske upar hai toh visible = true hi rahega (SSR default)
  }, []);

  // Step 2: Hidden elements ke liye IntersectionObserver se scroll animation lagao
  useEffect(() => {
    // Agar already visible hai ya mount nahi hua toh skip karo
    if (visible || !mounted) return;

    const el = ref.current;
    if (!el) return;

    let timeoutId: NodeJS.Timeout;

    const handleIntersect = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      const anyIntersecting = entries.some((entry) => entry.isIntersecting);
      if (anyIntersecting) {
        timeoutId = setTimeout(() => {
          setVisible(true);
        }, delayMs);
        observer.disconnect();
      }
    };

    const obs = new IntersectionObserver(handleIntersect, {
      rootMargin: "100px 0px 0px 0px",
      threshold,
    });

    obs.observe(el);

    return () => {
      obs.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [visible, mounted, delayMs, threshold]);

  const { initial, animate } = animationStyles[animation];

  // SSR aur pre-mount: content visible dikhao (no animation classes)
  // Post-mount: animation classes apply karo
  let animClass = "opacity-100"; // SSR fallback — hamesha visible
  if (mounted) {
    if (visible) {
      animClass = animate;
    } else {
      animClass = initial;
    }
  }

  return (
    <div
      ref={ref}
      className={`
        ${animClass}
        ${mounted ? "transform transition-all" : ""}
        ${className}
      `}
      style={{
        transitionDuration: mounted ? `${duration}ms` : "0ms",
        willChange: mounted && !visible ? "transform, opacity" : "auto",
      }}
    >
      {children}
    </div>
  );
}
