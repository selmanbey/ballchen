export type BallPosition = {
  x: number;
  y: number;
};

export type BallTrajectory = {
  x: number;
  y: number;
  upX: boolean;
  upY: boolean;
};

export type BallType = "friend" | "enemy";

export type BallIds = {
  [key in BallType]: string[];
};

export interface BallAtom {
  position: BallPosition;
  trajectory: BallTrajectory;
  color: string;
  type: BallType;
}
