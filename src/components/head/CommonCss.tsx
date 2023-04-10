import React from "react";

const CommonCss = () => {
  const css = `
    .w-full {
       width: 100%; 
    }

    .flex { 
      display: flex; 
    }

    .items-center { 
      align-items: center; 
    }

    .justify-center { 
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