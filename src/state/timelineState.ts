import { atom } from "jotai";
import { UserTimelineData } from "@genaipg/components/Slide/Ending/types";

export const timelineAtom = atom<UserTimelineData[]>([]);

export const timelinePlayingAtom = atom(false);