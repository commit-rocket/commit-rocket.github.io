import { ReactNode, useState } from "react";
import { useRouter } from "next/router";
import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";

import Logo from "@/assets/images/brand/logo-200x200.webp";

import Link from "./Link";
import Button from "../controls/Button";
import NavLink from "./NavLink";

const Header = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  return (
    <header className="relative flex items-center w-full gap-4 p-4 transition-all md:px-8 md:gap-12">
      <Link color="primary" className="flex items-center justify-center text-2xl font-bold transition-all lg:text-4xl" href="/">
        <img
          className="object-contain transition-all text-[0px] w-10 h-10 lg:w-12 lg:h-12"
          src={Logo.src}
          width={Logo.width}
          height={Logo.height}
          alt="Commit Rocket Logo"
        />
        <span>Commit Rocket</span>
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