import { StaticImageData } from "next/image";
import RikPicture from "@/assets/images/people/rik.webp";

export interface IMember {
  name: string;
  title: string;
  image: StaticImageData;
  links: {
    name: string;
    href: string;
  }[];
}

const members: IMember[] = [
  {
    image: RikPicture,
    name: "Rik",
    title: "Lead Developer & Founder",
    links: [
      {
        href: "https://github.com/Rikthepixel",
        name: "GitHub"
      },
      {
        href: "mailto:rikdenbreejen@commitrocket.com",
        name: "Email"
      },
      {
        href: "https://www.rikdenbreejen.nl",
        name: "Website"
      },
      {
        href: "https://www.linkedin.com/in/rik-den-breejen-a84aa71a7/",
        name: "LinkedIn"
      }
    ]
  }
];

export default members;