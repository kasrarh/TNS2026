import { RefObject, useEffect } from "react";

/* Allow any HTMLElement subtype (e.g. HTMLDivElement) as the ref target */
export const useAutoScroll = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<HTMLElement | null>,
  speed: number = 10,
  startDelay: number = 1000
) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timer: ReturnType<typeof setTimeout> | null = null;
    let delayTimer: ReturnType<typeof setTimeout> | null = null;
    let stopped = false; // if interaction happens, permanently stop auto-scrolling

    function clearTimers() {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      if (delayTimer) {
        clearTimeout(delayTimer);
        delayTimer = null;
      }
    }

    function stopAutoScroll() {
      if (stopped) return;
      stopped = true;
      clearTimers();
    }

    function step() {
      if (stopped) return;
      if (!el) return;
      // wrap when reaching end
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
        el.scrollLeft = 0;
      }

      el.scrollLeft += 1;
      timer = setTimeout(step, speed);
    }

    // Interaction handlers that permanently stop auto-scroll
    const onInterrupt = () => stopAutoScroll();

    el.addEventListener("pointerdown", onInterrupt, { passive: true });
    el.addEventListener("touchstart", onInterrupt, { passive: true });
    el.addEventListener("wheel", onInterrupt, { passive: true });
    el.addEventListener("mouseenter", onInterrupt);

    // Delay before starting, but skip if stopped by interaction
    delayTimer = setTimeout(() => {
      if (!stopped) {
        step();
      }
    }, startDelay);

    return () => {
      stopped = true;
      clearTimers();
      el.removeEventListener("pointerdown", onInterrupt);
      el.removeEventListener("touchstart", onInterrupt);
      el.removeEventListener("wheel", onInterrupt);
      el.removeEventListener("mouseenter", onInterrupt);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, speed, startDelay]);
};
