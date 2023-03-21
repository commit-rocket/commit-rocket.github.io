import Link from "./Link";

import Logo from "@/assets/images/brand/logo-200x200.webp";

const Footer = () => {
  return (
    <footer className="flex items-center justify-center text-primary-contrast">
      <div className="flex flex-col w-full gap-4 p-8 border-2 max-w-7xl rounded-t-md bg-primary bg-dots from-primary-light border-primary-light">
        <div className="flex flex-col items-center gap-2 p-2 rounded-md bg-white/20 sm:flex-row">
          <div className="flex items-center gap-2">
            <img
              className="w-12 h-12"
              alt="Commit Rocket Logo"
              src={Logo.src}
              width={Logo.width}
              height={Logo.height}
            />
            <span className="font-semibold text-black">
              Commit Rocket
            </span>
          </div>
          <span className="hidden text-black/50 sm:block">
            -
          </span>
          <div className="text-black/50">
            © Rik den Breejen
          </div>
        </div>
        <div className="flex flex-col justify-between w-full gap-8 md:flex-row">
          <div className="flex flex-col">
            <p className="mb-2 text-lg font-semibold">Commit Rocket</p>
            <Link
              color="white"
              href="/blog"
              title="Commit Rocket Blog"
              underline
            >
              Blog
            </Link>
            <Link
              color="white"
              href="https://github.com/commit-rocket/commit-rocket"
              title="Commit Rocket Source-Code"
              underline
              external
            >
              Github
            </Link>
          </div>
          <div className="flex flex-col">
            <p className="mb-2 text-lg font-semibold">Website</p>
            <Link
              color="white"
              href="https://github.com/commit-rocket/commit-rocket-website"
              title="Commit Rocket Website Source-Code"
              underline
              external
            >
              Frontend Source
            </Link>
            <Link
              color="white"
              href="https://github.com/commit-rocket/commit-rocket-website-backend"
              title="Commit Rocket Website Backend Source-Code"
              underline
              external
            >
              Backend Source
            </Link>
          </div>
          <div className="flex flex-col">
            <p className="mb-2 text-lg font-semibold">More</p>
            <Link
              color="white"
              href="/about"
              title="About the creators of Commit Rocket"
              underline
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;