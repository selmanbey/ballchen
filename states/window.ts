import { atom } from "recoil";
import { WindowBoundaries } from "types/window";

export const windowBoundariesAtom = atom<WindowBoundaries>({
  key: "windowBoundariesAtom",
  default: {
    up: 0,
    down: 0,
    left: 0,
    right: 0,
  },
});
