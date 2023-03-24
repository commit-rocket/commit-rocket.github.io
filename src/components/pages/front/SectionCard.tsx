import React, { ReactNode } from "react";

interface SectionCardProps {
  headerId: string;
  headerChildren: ReactNode;
  children: ReactNode;
}

const SectionCard = ({ children, headerChildren, headerId }: SectionCardProps) => {
  return (
    <section
      aria-labelledby={headerId}
      className="flex flex-col flex-1 gap-4 p-4 bg-center border-2 rounded-lg bg-secondary/20 border-secondary/20"
    >
      <h2 id={headerId} className="text-2xl font-semibold">
        {headerChildren}
      </h2>
      {children}
    </section>
  );
};

export default SectionCard;