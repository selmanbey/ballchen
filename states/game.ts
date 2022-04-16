import { atom } from "recoil";
import { GameState } from "types/game";

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
