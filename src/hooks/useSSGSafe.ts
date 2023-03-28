import { isBrowser } from "@/utils/ssr";
import { useEffect, useState } from "react";

const useSSGSafe = () => {
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => setIsFirstRender(false), []);

  const safeToRender = !isFirstRender && isBrowser;
  return safeToRender;
};

export default useSSGSafe;