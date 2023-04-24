import { IMember } from "@/assets/state/team";
import LinkButton from "@/components/controls/LinkButton";

const Member = ({ image, fullName, title, links }: IMember) => (
  <li
    className="flex flex-col items-center w-full max-w-full gap-2 p-4 border-2 rounded-2xl border-cr-primary image-dots from-cr-fill-light motion-safe:transition-all sm:p-6 md:w-fit"
    aria-label="Member"
  >
    <div className="flex flex-col items-center max-w-full gap-2 sm:flex-row md:flex-col">
      <img
        className="object-cover w-40 h-40 rounded-full shadow-md aspect-auto md:w-60 md:h-60"
        aria-label={`A picture of ${fullName}`}
        alt={`A picture of ${fullName}`}
        src={image.src}
        width={image.width}
        height={image.height}
      />
      <div className="flex flex-col max-w-full gap-2 py-4 text-center w-72">
        <p className="text-2xl font-semibold text-cr-primary" aria-label="Name">{fullName}</p>
        <p className="font-semibold text-cr-primary" aria-label="Title / Role">{title}</p>
      </div>
    </div>
    <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2" aria-label="Links">
      {links.map((link, i) => (
        <LinkButton
          key={i}
          href={link.href}
          color="primary"
          aria-label="Link"
        >
          {link.name}
        </LinkButton>
      ))}
    </div>
  </li>
);

export default Member;