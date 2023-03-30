import { StaticImageData } from "next/image";
import RikPicture from "@/assets/images/people/rik.webp";

export interface IMember {
  fullName: string;
  firstName?: string;
  lastName?: string;
  gender?: string; // Open Graph only accepts "male" & "female", but put in here whatever you want
  title: string;
  image: StaticImageData;
  links: {
    name: string;
    href: string;
  }[];
}

export const people = {
  "rik": {
    image: RikPicture,
    fullName: "Rik den Breejen",
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
} satisfies Record<string, IMember>;

const members = Object.values<IMember>(people);

export default members;