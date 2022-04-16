import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { cloneDeep } from "lodash";
import { windowBoundariesAtom } from "states/window";
import { gameStateAtom } from "states/game";
import { loopTimeAtom, scoreAtom } from "states/game";
import { ballAtom, BallIds, ballIdsAtom } from "states/balls";
import { useEffect } from "react";

const useBall = (id: string) => {
  const loopTime = useRecoilValue(loopTimeAtom);
  const setScore = useSetRecoilState(scoreAtom);
  const [gameState, setGameState] = useRecoilState(gameStateAtom);
  const windowBoundaries = useRecoilValue(windowBoundariesAtom);

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

    setBallchenProps((ballchenProps) => {
      const newProps = cloneDeep(ballchenProps);

      if (
        ballchenProps.y <= windowBoundaries.up ||
        ballchenProps.y >= windowBoundaries.down
      ) {
        newProps.trajectory.upY = !ballchenProps.trajectory.upY;
      }

      if (
        ballchenProps.x <= windowBoundaries.left ||
        ballchenProps.x >= windowBoundaries.right
      ) {
        newProps.trajectory.upX = !ballchenProps.trajectory.upX;
      }

      newProps.x = newProps.trajectory.upX
        ? newProps.x + newProps.trajectory.x
        : newProps.x - newProps.trajectory.x;
      newProps.y = newProps.trajectory.upY
        ? newProps.y + newProps.trajectory.y
        : newProps.y - newProps.trajectory.y;

      return newProps;
    });
  }, [loopTime, setBallchenProps, windowBoundaries]);

  const handleFriendContact = () => {
    deleteBallchen();
    deleteBallchenFromIds();
    setScore((score) => score + 1);
  };

  const handleEnemyContact = () => {
    setGameState("READY_FOR_NEXT_GAME");
  };

  return { handleFriendContact, handleEnemyContact };
};

export default useBall;
