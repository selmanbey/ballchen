import { atom, atomFamily } from "recoil";

type Trajectory = {
  x: number;
  y: number;
  upX: boolean;
  upY: boolean;
};

export type BallType = "friend" | "enemy";

export type BallIds = {
  [key in BallType]: string[];
};

export const ballIdsAtom = atom<BallIds>({
  key: "ballIdsAtom",
  default: { friend: [], enemy: [] },
});

export interface BallAtom {
  x: number;
  y: number;
  trajectory: Trajectory;
  color: string;
  type: BallType;
}

export const ballAtom = atomFamily<BallAtom, string>({
  key: "ballAtom",
  default: {
    x: 0,
    y: 0,
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
