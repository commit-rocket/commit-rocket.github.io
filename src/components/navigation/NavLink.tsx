import { cva } from "class-variance-authority";
import { ReactNode } from "react";
import Link from "./Link";

export interface NavLinkProps {
  href: string,
  currentHref: string,
  children: ReactNode;
}

export const style = cva(`
  text-lg font-bold py-2
  aria-[current='page']:text-primary-light 
  group-data-[in-group='true']/dropdown:text-base group-data-[in-group='true']/dropdown:py-0
`);

const CLASSNAME = style();

const NavLink = ({ href, currentHref, children }: NavLinkProps) => {
  const active = currentHref === href;
  return (
    <Link
      className={CLASSNAME}
      aria-current={active ? "page" : undefined}
      color="primary"
      href={href}
    >
      {children}
    </Link>
  );
};


export default NavLink;