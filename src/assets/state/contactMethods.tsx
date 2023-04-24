import { ReactNode, RefAttributes, SVGProps } from "react";

import NewsIcon from "@heroicons/react/24/solid/NewspaperIcon";
import EnvelopeIcon from "@heroicons/react/24/solid/EnvelopeIcon";
import PencilSquareIcon from "@heroicons/react/24/solid/PencilSquareIcon";

import DiscordIcon from "@/assets/images/icons/discord";



interface IContactMethod {
  title: ReactNode;
  href?: string;
  icon: React.ForwardRefExoticComponent<any> | React.FC<SVGProps<SVGSVGElement> & RefAttributes<SVGSVGElement>>;
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
      <span className="text-sm font-semibold text-cr-fill-contrast">
        (Coming Soon™)
      </span>
    </>,
    icon: DiscordIcon,
    iconAlt: "Discord icon"
  }
];

export default contactMethods;