

interface Options {
  props: Record<string, string | string[] | Date | number | undefined>;
  prefix: "og" | "profile" | "article" | "book" | "og:image" | "og:audio" | "og:video" | "og:locale";
}

const toSnakeCase = (key: string) => {
  return key.replace(/[A-Z]/g, (upper) => "_" + upper.toLowerCase());
};

const toOpenGraphValue = (val: string | number | Date) => {
  if (typeof val === "string" || typeof val === "number") return String(val);
  if (val instanceof Date) return val.toISOString();
};

const toOpenGraph = ({ props, prefix }: Options) => {
  return Object.keys(props).map((key, i) => {
    const givenValue = props[key];
    if (!givenValue) return null;
    const values = Array.isArray(givenValue) ? givenValue : [givenValue];
    const propertyName = toSnakeCase(key);

    return values.map((value, j) => {
      return <meta
        key={`${i}${j}${key}${prefix}`}
        property={`${prefix}:${propertyName}`}
        content={toOpenGraphValue(value)}
      />;
    });
  }).flatMap((val) => val);

};

export default toOpenGraph;