import { NextPage } from "next";

export type Page = NextPage<{
    className: string;
    initialLoad: boolean;
    reduceMotion: boolean
}>;