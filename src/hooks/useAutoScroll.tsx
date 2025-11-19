import { RefObject, useEffect } from "react";

export const useAutoScroll = (
  ref: RefObject<HTMLElement>,
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
      // remove listeners below via cleanup (they will be removed in return cleanup too)
    }

    function step() {
      if (stopped) return;
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
  }, [ref, speed, startDelay]);
};
