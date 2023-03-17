import { ReactNode } from "react";
import Link from "./Link";

export interface NavLinkProps {
  href: string,
  currentHref: string,
  children: ReactNode;
}

const NavLink = ({ href, currentHref, children }: NavLinkProps) => {
  const active = currentHref === href;
  return (
    <Link
      className="text-lg font-bold py-2 border-y border-primary hover:border-primary-light aria-[current='page']:text-primary-dark aria-[current='page']:border-primary first-of-type:border-t-2 last-of-type:border-b-2 md:border-0 md:first-of-type:border-t-0 md:last-of-type:border-b-0"
      aria-current={active ? "page" : undefined}
      color="primary"
      href={href}
    >
      {children}
    </Link>
  );
};


export default NavLink