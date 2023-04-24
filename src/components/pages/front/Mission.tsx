import { IMission } from "@/assets/state/missions";
import Heading from "@/components/content/Heading";

export interface MissionProps extends IMission {

}

const Mission = ({ title, image, imageAlt, text }: MissionProps) => {
  return (
    <li className="flex flex-col items-center flex-1 gap-4 p-0 -mx-4 rounded-lg border-primary motion-safe:transition-[margin_padding_border] sm:mx-0 lg:p-4 border-2 xl:p-8">
      <Heading.H3 className="lg:h-[5ex] motion-safe:transition-all">
        {title}
      </Heading.H3>
      <img
        className="w-full sm:w-2/3 lg:w-full text-[0px]"
        loading="lazy"
        alt={imageAlt}
        src={image.src}
        width={image.width}
        height={image.height}
      />
      <div aria-label="Mission description" className="text-lg">
        {text}
      </div>
    </li>
  );
};

export default Mission;