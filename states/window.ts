import { atom } from "recoil";

export const windowBoundariesAtom = atom({
  key: "windowBoundariesAtom",
  default: {
    up: 0,
    down: 300,
    left: 0,
    right: 300,
  },
});
