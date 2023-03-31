export const isSSR = typeof window === "undefined";
export const isBrowser = !isSSR;

export const asImport = <Props>(component: React.ComponentType<Props>) => {
  return () => Promise.resolve({ "default": component });
};