import { NextPage } from "next";

export type Page<EP extends {} = {}> = NextPage<{
  className: string;
  initialLoad: boolean;
  reduceMotion: boolean;
} & EP>;