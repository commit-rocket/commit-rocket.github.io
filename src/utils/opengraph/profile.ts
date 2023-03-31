import toOpenGraph from "./toOpenGraph";

export interface OgProfile {
  userName: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  index?: number
}

export const makeProfileOgMeta = ({ index, ...props }: OgProfile) => {
  return toOpenGraph({ props, prefix: "profile", index });
};
