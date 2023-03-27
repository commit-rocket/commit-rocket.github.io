import NewsIcon from "@heroicons/react/24/solid/NewspaperIcon";
import EnvelopeIcon from "@heroicons/react/24/solid/EnvelopeIcon";
import PencilSquareIcon from "@heroicons/react/24/solid/PencilSquareIcon";

import DiscordIcon from "@/assets/images/icons/discord";


import { ReactNode } from "react";

interface IContactMethod {
  title: ReactNode;
  href?: string;
  icon: React.ForwardRefExoticComponent<any>;
}

const contactMethods: IContactMethod[] = [
  {
    title: "Newsletter Signup",
    href: "/#sign-up",
    icon: NewsIcon
  },
  {
    title: "feedback@commitrocket.com",
    href: "mailto:feedback@commitrocket.com",
    icon: EnvelopeIcon
  },
  {
    title: "Feedback Form",
    href: "/contribute#feedback",
    icon: PencilSquareIcon
  },
  {
    title: <>
      Discord <br />
      <span className="text-sm font-semibold text-neutral-700">
        (Coming Soon™)
      </span>
    </>,
    icon: DiscordIcon
  }
];

export default contactMethods;