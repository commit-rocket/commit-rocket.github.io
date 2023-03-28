import NewsIcon from "@heroicons/react/24/solid/NewspaperIcon";
import EnvelopeIcon from "@heroicons/react/24/solid/EnvelopeIcon";
import PencilSquareIcon from "@heroicons/react/24/solid/PencilSquareIcon";

import DiscordIcon from "@/assets/images/icons/discord";


import { ReactNode } from "react";

interface IContactMethod {
  title: ReactNode;
  href?: string;
  icon: React.ForwardRefExoticComponent<any>;
  iconAlt: string;
}

const contactMethods: IContactMethod[] = [
  {
    title: "Newsletter Signup",
    href: "/#sign-up",
    icon: NewsIcon,
    iconAlt: "Newspaper icon",
  },
  {
    title: "feedback@commitrocket.com",
    href: "mailto:feedback@commitrocket.com",
    icon: EnvelopeIcon,
    iconAlt: "Envelope icon"
  },
  {
    title: "Feedback Form",
    href: "/contribute#feedback",
    icon: PencilSquareIcon,
    iconAlt: "Form icon"
  },
  {
    title: <>
      Discord <br />
      <span className="text-sm font-semibold text-neutral-700">
        (Coming Soon™)
      </span>
    </>,
    icon: DiscordIcon,
    iconAlt: "Discord icon"
  }
];

export default contactMethods;