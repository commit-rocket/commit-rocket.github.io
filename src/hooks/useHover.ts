import { MutableRefObject, useEffect, useRef, RefObject, useState } from "react";

const useHover = (ref: (RefObject<Element> | MutableRefObject<Element>)) => {

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const handleMouseOver = () => setIsHovering(true);
    const handleMouseOut = () => setIsHovering(false);

    ref.current.addEventListener("mouseover", handleMouseOver);
    ref.current.addEventListener("mouseout", handleMouseOut);

    return () => {
      if (!ref.current) return;
      ref.current.removeEventListener("mouseover", handleMouseOver);
      ref.current.removeEventListener("mouseout", handleMouseOut);
    };
  }, [ref.current, setIsHovering]);


  return isHovering;
};

export default useHover;