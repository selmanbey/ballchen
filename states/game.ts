import { atom } from "recoil";

export type GameState =
  | "READY_FOR_FIRST_GAME"
  | "IN_PLAY"
  | "READY_FOR_NEXT_GAME";

export const gameStateAtom = atom<GameState>({
  key: "gameStateAtom",
  default: "READY_FOR_FIRST_GAME",
});

export const loopTimeAtom = atom<number>({
  key: "loopTimeAtom",
  default: 0,
});

export const scoreAtom = atom<number>({
  key: "scoreAtom",
  default: 0,
});
