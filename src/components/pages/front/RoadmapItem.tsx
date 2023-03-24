import { IRoadmapItem } from "@/assets/state/roadmap";

export interface RoadmapItemProps extends IRoadmapItem {

}

const Divider = ({ hideOnSmall }: { hideOnSmall?: boolean; }) => (
  <div className={`relative w-[2px] bg-primary mx-3 group-first-of-type/item:rounded-t-full group-last-of-type/item:rounded-b-full ${hideOnSmall ? "hidden md:block" : "block md:hidden"}`} aria-hidden>
    <div className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 border-2 rounded-full top-1/2 left-1/2 border-primary bg-fill" />
  </div>
);

const RoadmapItem = ({ title, text }: RoadmapItemProps) => {
  const id = title.replace(" ", "-");
  return (
    <li aria-labelledby={id} className="relative flex flex-1 group/item">
      <Divider />
      <div className="relative flex flex-col flex-1 gap-4 py-4 pl-4 md:flex-row md:pl-0 md:py-0 md:gap-0">
        <h3 id={id} className="flex items-center text-2xl font-bold md:px-8 md:w-1/4 md:py-4 md:justify-end md:text-end">
          {title}
        </h3>
        <Divider hideOnSmall />
        <div className="md:p-8 md:w-3/4">
          <div aria-label="Deliverables" className="flex flex-col gap-2 text-lg">
            {text}
          </div>
        </div>
      </div>
    </li>
  );
};

export default RoadmapItem;