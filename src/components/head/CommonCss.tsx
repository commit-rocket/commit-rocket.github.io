import React from "react";

const CommonCss = () => {
  return (
    <style>
      {`
        :where(.w-full) { width: 100%; }
        :where(.flex) { display: flex; }
        :where(.items-center) { align-items: center; }
        :where(.justify-center) { justifiy-content: center }

        
        details>summary { list-style: none; }
        details>summary::-webkit-details-marker { display: none; }
      `}
    </style>
  );
};

export default CommonCss;