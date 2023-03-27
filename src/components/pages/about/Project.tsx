import { IProject } from "@/assets/state/projects";
import LinkButton from "@/components/controls/LinkButton";
import { modal } from "@/utils/swal";
import { useCallback } from "react";

export interface ProjectProps extends IProject {

}

const Project = ({ title, description, thumbnail, thumbnailAlt, href, linkText, linkRel }: ProjectProps) => {

  const onImageClick = useCallback(() => {
    modal.fire({
      title: thumbnailAlt,
      html: <>
        <img
          className="object-contain w-full h-full rounded-lg aspect-video"
          alt={thumbnailAlt}
          src={thumbnail.src}
          width={thumbnail.width}
          height={thumbnail.height}
        />
      </>,
      customClass: {
        popup: "image-only",
        htmlContainer: "aspect-video"
      }
    });
  }, [thumbnailAlt]);

  return (
    <li className="flex flex-col gap-4 w-96">
      <p className="text-xl font-semibold text-center text-primary">
        {title}
      </p>
      <button onClick={onImageClick}>
        <img
          className="border-2 rounded-lg aspect-video border-primary"
          alt={thumbnailAlt}
          src={thumbnail.src}
          width={thumbnail.width}
          height={thumbnail.height}
        />
      </button>
      <div className="flex flex-col gap-4">
        {description}
      </div>
      <LinkButton color="secondary" href={href} className="mt-auto" rel={linkRel}>
        {linkText ?? "Visit"}
      </LinkButton>
    </li>
  );
};

export default Project;