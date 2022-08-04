import * as React from "react";
import { useTransition } from "@remix-run/react";
import { cx } from "~/utils";
import { match, P } from "ts-pattern";

function GithubLikeProgress() {
  const transition = useTransition();
  const active = transition.state !== "idle";

  const ref = React.useRef<HTMLDivElement>(null);
  const [animationComplete, setAnimationComplete] = React.useState(true);

  React.useEffect(() => {
    if (!ref.current) return;
    if (active) setAnimationComplete(false);

    Promise.allSettled(
      ref.current.getAnimations().map(({ finished }) => finished)
    ).then(() => !active && setAnimationComplete(true));
  }, [active]);

  return (
    <div
      role="progressbar"
      aria-hidden={!active}
      aria-valuetext={active ? "Loading" : undefined}
      className="fixed inset-x-0 top-0 left-0 z-50 h-1 animate-pulse"
    >
      <div
        ref={ref}
        className={cx(
          "h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500 ease-in-out",
          match([transition.state, animationComplete])
            .with(["idle", true], () => "w-0 opacity-0 transition-none")
            .with(["submitting", P._], () => "w-4/12")
            .with(["loading", P._], () => "w-10/12")
            .otherwise(() => "w-full")
        )}
      />
    </div>
  );
}

export { GithubLikeProgress };
