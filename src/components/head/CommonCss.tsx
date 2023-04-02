import React from "react";

const CommonCss = () => {
  const css = `
    :where(.w-full) {
       width: 100%; 
    }

    :where(.flex) { 
      display: flex; 
    }

    :where(.items-center) { 
      align-items: center; 
    }

    :where(.justify-center) { 
      justifiy-content: center 
    }

    details > summary { 
      list-style: none;
     }
    details > summary::-webkit-details-marker { 
      display: none; 
    }

    `.replace(/\s*\n*\t*/gm, "");
  return (
    <style dangerouslySetInnerHTML={{
      __html: css
    }} />
  );
};

export default CommonCss;