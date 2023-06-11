import Graph1 from "@/assets/images/brand/decor/git/graph-1";
import Graph2 from "@/assets/images/brand/decor/git/graph-2";
import Graph3 from "@/assets/images/brand/decor/git/graph-3";
import Graph4 from "@/assets/images/brand/decor/git/graph-4";
import useSSGSafe from "@/hooks/useSSGSafe";

import React, { useMemo, useRef } from "react";

export interface GraphDecorProps {

}

const colors = [
  "#DC2626",
  "#2563EB",
  "#7C3AED",
  "#A3E635",
  "#F59E0B"
];

const makeColorBrush = () => {
  const notChosenColors = [...colors];

  return () => {
    const colorPool = notChosenColors.length === 0 ? colors : notChosenColors;
    const chosenIndex = Math.floor(Math.random() * colorPool.length);
    const color = colorPool[chosenIndex];

    if (notChosenColors.length !== 0) {
      notChosenColors.splice(chosenIndex, 1);
    }

    return color;
  };
};

const getSide = (perviousSides: boolean[]) => {
  if (perviousSides.length === 0) {
    const side = Math.random() > 0.5;
    perviousSides.unshift(side);
    return side;
  };

  const samePreviousSides = perviousSides.every((value, i, arr) => i === 0 || value === arr[i - 1]);
  const side = samePreviousSides ? !perviousSides.at(0)! : Math.random() > 0.5;

  perviousSides.unshift(side);
  perviousSides.length > 2 && perviousSides.pop();

  return side;
};

const decors = [
  {
    name: "1",
    widthMultiplier: 2,
    aspect: 1900 / 600,
    component: ({ makeColor, ...props }) => (
      <Graph1
        {...props}
        color={makeColor()}
        color1={makeColor()}
      />
    )
  },
  {
    name: "2",
    widthMultiplier: 1,
    aspect: 1600 / 300,
    component: ({ makeColor, ...props }) => (
      <Graph2
        {...props}
        color={makeColor()}
      />
    )
  },
  {
    name: "3",
    widthMultiplier: 1,
    aspect: 2500 / 300,
    component: ({ makeColor, ...props }) => (
      <Graph3
        {...props}
        color={makeColor()}
      />
    )
  },
  {
    name: "4",
    widthMultiplier: 1,
    aspect: 2800 / 300,
    component: ({ makeColor, ...props }) => (
      <Graph4
        {...props}
        color={makeColor()}
        color1={makeColor()}
      />
    )
  }
] as {
  name: string;
  widthMultiplier: number;
  aspect: number;
  component: React.ComponentType<Omit<React.ComponentProps<"svg">, "ref"> & { makeColor: () => string; }>;
}[];

const AMOUNT = 40;

const GraphDecor = ({ }: GraphDecorProps) => {
  const isSafe = useSSGSafe();

  const renderedGraphs = useMemo(() => {
    if (!isSafe) return;

    const controls = {
      currentLength: 60, // rem
      perviousSides: [] as boolean[] // last 2 sides 
    };

    return Array(AMOUNT).fill(true).map((_, i) => {
      const decor = decors[Math.floor(Math.random() * decors.length)];
      const side = getSide(controls.perviousSides);

      const width = 10 * decor.widthMultiplier; // rem
      const height = width * decor.aspect;
      const padding = Math.random() * 40 + 20;
      const style = { "--width-mulitplier": decor.widthMultiplier, "--length": `${controls.currentLength}rem` } as React.CSSProperties;

      controls.currentLength += (height + padding) * 1.5;

      return (
        <decor.component
          key={i}
          makeColor={makeColorBrush()}
          style={style}
          className={`absolute opacity-10 w-[calc(var(--width)_*_var(--width-mulitplier))] top-[var(--length)] [--width:10rem] md:[--width:6rem] motion-safe:transition-all ${side ? "left-0 -scale-100" : "right-0"}`}
        />
      );
    });
  }, [isSafe]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {isSafe && <>
        {renderedGraphs}
      </>}
    </div>
  );
};

export default React.memo(GraphDecor);