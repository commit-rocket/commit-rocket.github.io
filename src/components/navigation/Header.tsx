import { ReactNode, useState } from "react";
import { useRouter } from "next/router";
import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";

import Link from "./Link";
import Button from "../controls/Button";

export interface HeaderProps {

}

const NavLink = ({ href, currentHref, children }: {
  href: string,
  currentHref: string,
  children: ReactNode;
}) => {
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

const Header = ({ }: HeaderProps) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  return (
    <header className="relative flex items-center w-full gap-12 px-8 py-4">
      <Link color="primary" className="text-2xl font-bold lg:text-4xl" href="/">
        Commit Rocket
      </Link>
      <Button color="secondary" className="p-2 ml-auto rounded-full md:hidden" onClick={() => setOpen(!open)}>
        <Bars3Icon className="w-6 h-6" />
      </Button>
      <div aria-expanded={open} className="absolute flex flex-col bg-fill gap-0 p-4 top-full inset-x-4 rounded-md shadow shadow-primary z-10 aria-[expanded='false']:hidden md:aria-[expanded='false']:flex md:flex-row md:items-center md:p-0 md:shadow-none md:static md:bg-transparent md:gap-12">
        <NavLink href="/" currentHref={router.pathname}>
          Home
        </NavLink>
        <NavLink href="/about" currentHref={router.pathname}>
          About
        </NavLink>
      </div>
    </header>
  );
};

export default Header;