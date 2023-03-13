import { motion } from "framer-motion";

import { IMember } from "@/assets/state/team";
import LinkButton from "@/components/controls/LinkButton";

const memberAnim = {
  hidden: {
    translateY: "5%",
    transition: {
      duration: 0.15,
      ease: "easeOut"
    }
  },
  show: {
    translateY: "0%",
    transition: {
      duration: 0.15,
      ease: "easeOut"
    }
  }
} as const;

const Member = ({ image, name, title, text, links, animate }: IMember & { animate: boolean; }) => (
  <motion.div
    variants={animate ? memberAnim : {}}
    className="flex flex-col items-center w-full max-w-full gap-2 p-4 rounded-md shadow motion-safe:transition-all sm:p-6 md:w-fit shadow-primary"
    aria-label="Member"
  >
    <div className="flex flex-col items-center max-w-full gap-2 sm:flex-row md:flex-col">
      <img
        className="object-cover w-40 h-40 rounded-full shadow-md aspect-auto md:w-60 md:h-60"
        aria-label="Link"
        src={image.src}
        width={image.width}
        height={image.height}
      />
      <div className="flex flex-col max-w-full gap-2 py-4 text-center w-72 md:py-0">
        <p className="text-2xl font-semibold text-secondary" aria-label="Name">{name}</p>
        <p className="font-semibold text-primary" aria-label="Title / Role">{title}</p>
        <p className="text-fill-contrast " aria-label="Text">{text}</p>
      </div>
    </div>
    <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2" aria-label="Links">
      {links.map((link, i) => (
        <LinkButton
          key={i}
          href={link.href}
          color="secondary"
          aria-label="Link"
        >
          {link.name}
        </LinkButton>
      ))}
    </div>
  </motion.div>
);

export default Member;