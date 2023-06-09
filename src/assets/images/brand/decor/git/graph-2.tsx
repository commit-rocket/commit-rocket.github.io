import React, { SVGProps, forwardRef, ForwardedRef } from "react";

const Graph2 = forwardRef(({ color = "#DC2626", ...props }: SVGProps<SVGSVGElement>, ref: ForwardedRef<SVGSVGElement>) => (
  <svg ref={ref} width="300" height="1600" viewBox="0 0 300 1600" fill="none" xmlns="http://www.w3.org/2000/svg" data-reset {...props}>
    <g clip-path="url(.clip0_115_276)">
      <path d="M444.135 -127L490.097 -81.038L182 227.059V379.614C235.533 393.749 275 442.505 275 500.48C275 558.455 235.533 607.211 182 621.346V679.614C235.533 693.749 275 742.505 275 800.48C275 858.455 235.533 907.211 182 921.346V1372.94L490.097 1681.04L444.135 1727L117.133 1400H117V921.078C63.9768 906.602 25 858.093 25 800.48C25 742.867 63.9768 694.358 117 679.882V621.078C63.9768 606.603 25 558.093 25 500.48C25 442.867 63.9768 394.357 117 379.882V200H117.135L444.135 -127Z" fill={color} />
    </g>
    <defs>
      <clipPath className="clip0_115_276">
        <rect width="300" height="1600" />
      </clipPath>
    </defs>
  </svg>

));

export default Graph2;