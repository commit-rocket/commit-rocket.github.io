import { IMission } from "@/assets/state/missions";

export interface MissionProps extends IMission {

}

const Mission = ({ title, image, imageAlt, text }: MissionProps) => {
  return (
    <li className="flex flex-col items-center flex-1 gap-4 p-8 border-2 rounded-lg border-secondary">
      <h3 className="text-2xl text-primary md:text-3xl lg:h-[5ex] motion-safe:transition-all">
        {title}
      </h3>
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