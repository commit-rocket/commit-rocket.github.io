import { ReactNode, SyntheticEvent, useCallback, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import ChevronDownIcon from "@heroicons/react/24/solid/ChevronDownIcon";

import { style as navlinkStyle } from "./NavLink";
import { style as linkStyle } from "../controls/Link";
import useOutsideClick from "@/hooks/useOutsideClick";
import useHover from "@/hooks/useHover";

export interface NavDropdownProps {
  summary: ReactNode;
  children: ReactNode;
}

const SUMMARY_CLASSNAME = twMerge(
  navlinkStyle() + " " + linkStyle({ color: "primary" }),
  "flex items-center"
);

const NavDropdown = ({ summary, children }: NavDropdownProps) => {
  const summaryRef = useRef<HTMLDetailsElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState<boolean | undefined>(false);

  const handleToggle = useCallback((e: SyntheticEvent<HTMLDetailsElement, Event>) => {
    const target = e.target as HTMLDetailsElement;
    setOpen(target.open);
  }, []);

  const isSummaryHovering = useHover(summaryRef);
  const isContainerHovering = useHover(containerRef);

  useEffect(() => {
    const isHovering = isSummaryHovering || isContainerHovering;
    if (!isHovering) {
      setOpen(false);
      return;
    }

    setOpen(true);
  }, [isSummaryHovering, isContainerHovering]);

  useOutsideClick([summaryRef, containerRef], () => {
    setOpen(false);
  });

  return (
    <details className="relative group/details" open={open} onToggle={handleToggle}>
      <summary ref={summaryRef} className={SUMMARY_CLASSNAME}>
        {summary}
        <ChevronDownIcon
          className="w-5 h-5 data-[open='true']:rotate-180 transition-all"
          data-open={open}
          width="1em"
          height="1em"
        />
      </summary>
      <div ref={containerRef} className="absolute inset-x-0 flex flex-col gap-2 px-4 py-2 bg-white border-2 rounded-lg group/dropdown border-primary md:w-fit" data-in-group>
        {children}
      </div>
    </details>
  );
};

export default NavDropdown;