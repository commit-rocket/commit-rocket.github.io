import { NextPage } from "next";

export type Page<EP extends {} = {}> = NextPage<{
  className: string;
  pathname: string;
  initialLoad: boolean;
  reduceMotion: boolean;
} & EP>;