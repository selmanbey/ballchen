import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { windowBoundariesAtom } from "states/window";
import { gameStateAtom } from "states/game";
import { loopTimeAtom, scoreAtom } from "states/game";
import { ballAtom, ballIdsAtom } from "states/balls";
import { useEffect } from "react";
import { BallType, BallTrajectory, BallIds } from "types/ball";
import { audioOnAtom } from "states/settings";
import { playDeath, playFriendGain } from "utils/audio";
import { WindowBoundaries } from "types/window";

const getNewPosition = (
  curPosition: { x: number; y: number },
  curTrajectory: BallTrajectory,
  windowBoundaries: WindowBoundaries
) => {
  const newPosition = { ...curPosition };
  const newTrajectory = { ...curTrajectory };

  if (
    curPosition.y <= windowBoundaries.up ||
    curPosition.y >= windowBoundaries.down
  ) {
    newTrajectory.upY = !curTrajectory.upY;
  }

  if (
    curPosition.x <= windowBoundaries.left ||
    curPosition.x >= windowBoundaries.right
  ) {
    newTrajectory.upX = !curTrajectory.upX;
  }

  newPosition.x = newTrajectory.upX
    ? newPosition.x + newTrajectory.x
    : newPosition.x - newTrajectory.x;
  newPosition.y = newTrajectory.upY
    ? newPosition.y + newTrajectory.y
    : newPosition.y - newTrajectory.y;

  return { newPosition, newTrajectory };
};

const useBall = (id: string) => {
  const audioOn = useRecoilValue(audioOnAtom);
  const loopTime = useRecoilValue(loopTimeAtom);
  const windowBoundaries = useRecoilValue(windowBoundariesAtom);

  const [gameState, setGameState] = useRecoilState(gameStateAtom);

  const setScore = useSetRecoilState(scoreAtom);
  const setBallchenProps = useSetRecoilState(ballAtom(id));
  const deleteBallchen = useResetRecoilState(ballAtom(id));
  const deleteBallchenFromIds = useRecoilCallback(({ set }) => () => {
    set(ballIdsAtom, (ballchenIds: BallIds) => ({
      ...ballchenIds,
      friend: ballchenIds.friend.filter((bid) => bid !== id),
    }));
  });

  useEffect(() => {
    if (!setBallchenProps) return;
    if (gameState !== "IN_PLAY") return;

    setBallchenProps(({ position, trajectory, ...rest }) => {
      const { newPosition, newTrajectory } = getNewPosition(
        position,
        trajectory,
        windowBoundaries
      );

      return { position: newPosition, trajectory: newTrajectory, ...rest };
    });
  }, [loopTime, setBallchenProps, windowBoundaries]);

  const handleContact = (ballType: BallType) => {
    if (gameState !== "IN_PLAY") return;
    if (ballType === "friend") {
      deleteBallchen();
      deleteBallchenFromIds();
      setScore((score) => score + 1);
    }
    if (ballType === "enemy") setGameState("READY_FOR_NEXT_GAME");
  };

  const playAudio = (ballType: BallType) => {
    if (!audioOn) return;
    if (gameState !== "IN_PLAY") return;
    if (ballType === "friend") playFriendGain();
    if (ballType === "enemy") playDeath();
  };

  return { handleContact, playAudio };
};

export default useBall;
