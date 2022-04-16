import { atom, atomFamily } from "recoil";
import { BallAtom, BallIds } from "types/ball";

export const ballIdsAtom = atom<BallIds>({
  key: "ballIdsAtom",
  default: { friend: [], enemy: [] },
});

export const ballAtom = atomFamily<BallAtom, string>({
  key: "ballAtom",
  default: {
    position: { x: 0, y: 0 },
    trajectory: {
      x: 0,
      y: 0,
      upX: true,
      upY: true,
    },
    type: "enemy",
    color: "transparent",
  },
});
