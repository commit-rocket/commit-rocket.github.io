import { MutableRefObject, useEffect, useRef, RefObject } from "react";

const useOutsideClick = (refs: (RefObject<Element> | MutableRefObject<Element>)[], handler: (event: TouchEvent | MouseEvent) => void) => {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const listener = (event: TouchEvent | MouseEvent) => {
      const isContained = refs.some((ref) => {
        if (!event.target || !ref.current) return true;
        return ref.current.contains(event.target as Element);
      });
      if (isContained) return;

      handlerRef.current(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [...refs]);
};

export default useOutsideClick;