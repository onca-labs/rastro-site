"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { pushEvent } from "@/lib/analytics";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** GTM dataLayer event name fired on click (e.g. "start_trial"). */
  event: string;
  /** Extra params merged into the event (e.g. { location: "hero" }). */
  eventParams?: Record<string, unknown>;
  children: ReactNode;
};

/**
 * Anchor that pushes a GTM event on click. A small client island so it can be
 * dropped into server components without making the whole surface client. Any
 * passed `onClick` still runs.
 */
export default function TrackedLink({
  event,
  eventParams,
  onClick,
  children,
  ...rest
}: TrackedLinkProps) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        pushEvent(event, eventParams);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
