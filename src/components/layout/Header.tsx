import { useRef, useState } from "react";
import { useRouter } from "next/router";
import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";

import Logo from "@/assets/images/brand/logo-200x200.webp";

import Link from "../controls/Link";
import Button from "../controls/Button";
import NavLink from "./NavLink";
import useOutsideClick from "@/hooks/useOutsideClick";
import NavDropdown from "./NavDropdown";

const Header = () => {
  const router = useRouter();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemsContainerRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  useOutsideClick([buttonRef, itemsContainerRef], (e) => {
    setOpen(false);
  });

  return (
    <header className="relative flex items-center w-full gap-4 p-4 transition-all border-b-2 md:px-8 md:gap-12 border-cr-primary-light/10">
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
      <Button
        ref={buttonRef}
        className="p-2 ml-auto rounded-full md:hidden"
        color="primary"
        aria-label="Expands the header"
        aria-expanded={open}
        aria-controls="header-items"
        onClick={() => setOpen(!open)}
      >
        <Bars3Icon
          className="w-6 h-6"
          width="1em"
          height="1em"
        />
      </Button>
      <div
        ref={itemsContainerRef}
        className="absolute flex flex-col bg-cr-fill gap-0 p-4 top-full inset-x-4 rounded-2xl border-2 border-cr-primary z-10 data-[expanded='false']:hidden md:data-[expanded='false']:flex md:flex-row md:items-center md:p-0 md:border-none md:static md:bg-transparent md:gap-12"
        id="header-items"
        data-expanded={open}
      >
        <NavLink href="/" currentHref={router.pathname}>
          Home
        </NavLink>
        <NavLink href="/contribute" currentHref={router.pathname}>
          Contribute
        </NavLink>
        <NavLink href="/blog" currentHref={router.pathname}>
          Blog
        </NavLink>
        <NavDropdown summary="More">
          <NavLink href="/about" currentHref={router.pathname}>
            About
          </NavLink>
          <NavLink href="/contact" currentHref={router.pathname}>
            Contact
          </NavLink>
        </NavDropdown>
      </div>
    </header>
  );
};

export default Header;