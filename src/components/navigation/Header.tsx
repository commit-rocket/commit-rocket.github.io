import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import Link from "./Link";

export interface HeaderProps {

}

const NavLink = ({ href, currentHref, children }: {
  href: string,
  currentHref: string,
  children: ReactNode;
}) => (
  <Link color="primary" className={"text-lg font-bold" + (currentHref === href ? " text-primary-dark" : "")} href={href}>
    {children}
  </Link>
);

const Header = ({ }: HeaderProps) => {
  const router = useRouter();

  return (
    <header className="flex items-center w-full gap-12 px-8 py-4">
      <Link color="primary" className={"text-4xl font-bold"} href="/">
        Commit Rocket
      </Link>
      <NavLink href="/" currentHref={router.asPath}>
        Home
      </NavLink>
      <NavLink href="/about" currentHref={router.asPath}>
        About
      </NavLink>
    </header>
  );
};

export default Header;