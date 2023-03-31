type BaseProps = {
  [key: string | symbol | number]: string | string[] | Date | number | undefined;
};

interface Options<TProps extends BaseProps> {
  props: TProps;
  prefix: "og" | "profile" | "article" | "book" | "og:image" | "og:audio" | "og:video" | "og:locale";
  index?: number;
}

const toSnakeCase = (key: string) => {
  return key.replace(/[A-Z]/g, (upper) => "_" + upper.toLowerCase());
};

const toOpenGraphValue = (val: string | number | Date) => {
  if (typeof val === "string" || typeof val === "number") return String(val);
  if (val instanceof Date) return val.toISOString();
};

const toOpenGraph = <TProps extends BaseProps>({ props, prefix, index }: Options<TProps>) =>
  Object
    .keys(props)
    .map((key) => {
      const givenValue = props[key];
      if (!givenValue) return null;
      const values = Array.isArray(givenValue) ? givenValue : [givenValue];
      const propertyName = toSnakeCase(key);

      return values.map((value) => (
        <meta
          key={`${prefix}:${propertyName}${index ? index : ""}`}
          property={`${prefix}:${propertyName}`}
          content={toOpenGraphValue(value)}
        />
      ));
    })
    .flat();

export default toOpenGraph;