import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { windowBoundariesAtom } from "states/window";
import { gameStateAtom } from "states/game";
import { loopTimeAtom, scoreAtom } from "states/game";
import colors from "styles/colors";
import {
  ballAtom,
  BallAtom,
  BallIds,
  ballIdsAtom,
  BallType,
} from "states/balls";
import { audioOnAtom } from "states/settings";
import { playPop, playStart } from "utils/audio";
import { useEffect, useMemo } from "react";

let FRIEND_SPEED = 2;
let ENEMY_SPEED = 4;

let RECORDED_BALL_IDS: string[] = [];

const generateBallId = () => {
  let id = Math.random().toString();
  while (RECORDED_BALL_IDS.includes(id)) {
    id = Math.random().toString();
  }
  RECORDED_BALL_IDS.push(id);
  return id;
};

const generateRandomBallType = (odds: number = 0.7) =>
  Math.random() > odds ? "enemy" : "friend";

const useGame = () => {
  const setScore = useSetRecoilState(scoreAtom);
  const audioOn = useRecoilValue(audioOnAtom);
  const [gameState, setGameState] = useRecoilState(gameStateAtom);
  const windowBoundaries = useRecoilValue(windowBoundariesAtom);
  const loopTime = useRecoilValue(loopTimeAtom);
  /** a human trackable/readable version of the loop time */
  const gameTime = useMemo(() => {
    return Math.floor(loopTime / 1000);
  }, [loopTime]);

  const [ballchenIds, setBallchenIds] = useRecoilState(ballIdsAtom);
  const setBallchen = useRecoilCallback(
    ({ set }) =>
      (id: string, props: Partial<BallAtom>) => {
        set(ballAtom(id), (ballProps) => ({ ...ballProps, ...props }));
      }
  );

  const createBallchen = (ballchenId: string, type: BallType) => {
    setBallchenIds((ids) => ({
      ...ids,
      [type]: [...ids[type], ballchenId],
    }));

    const speed = type === "friend" ? FRIEND_SPEED : ENEMY_SPEED;
    const color = type === "friend" ? colors.secondary : colors.primary;

    const initialProps: BallAtom = {
      x: Math.floor(Math.random() * windowBoundaries.right),
      y: Math.floor(Math.random() * windowBoundaries.down),
      trajectory: {
        x: Math.floor(Math.random() * speed),
        y: Math.floor(Math.random() * speed),
        upX: Math.random() < 0.5,
        upY: Math.random() < 0.5,
      },
      type,
      color,
    };

    // Stabilize speed
    const randomDirection = Math.random() < 0.5 ? "x" : "y";
    initialProps.trajectory[randomDirection] = speed;

    setBallchen(ballchenId, initialProps);
  };

  const stopBallchens = (ids: BallIds) => {
    const stop = (id: string) =>
      setBallchen(id, { trajectory: { x: 0, y: 0, upX: false, upY: false } });
    ids.friend.forEach((id) => stop(id));
    ids.enemy.forEach((id) => stop(id));
  };

  const deleteBallchens = useRecoilCallback(({ reset }) => (ids: BallIds) => {
    RECORDED_BALL_IDS = [];
    ids.friend.forEach((id) => reset(ballAtom(id)));
    ids.enemy.forEach((id) => reset(ballAtom(id)));
  });

  useEffect(() => {
    // if player is busted, stop all the balls at spot
    if (gameState === "READY_FOR_NEXT_GAME") {
      stopBallchens(ballchenIds);
      return;
    }

    // if player started new game, restrart game stats
    if (gameState === "IN_PLAY") {
      ENEMY_SPEED = 4;
      setScore(0);
      deleteBallchens(ballchenIds);
      setBallchenIds({ friend: [], enemy: [] });
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState !== "IN_PLAY") return;

    if (gameTime === 0) return;
    if (gameTime % 2 !== 0) {
      createBallchen(generateBallId(), generateRandomBallType(0));
      createBallchen(generateBallId(), generateRandomBallType(1));
    }
    if (gameTime % 4 === 0) {
      ENEMY_SPEED += 1;
    }
  }, [gameTime]);

  const restart = () => {
    if (audioOn) playStart();
    setGameState("IN_PLAY");
  };

  const createBallOnBackgroundClick = () => {
    if (gameState !== "IN_PLAY") return;
    if (ballchenIds.friend.length >= 20) return;
    if (audioOn) playPop();
    createBallchen(generateBallId(), generateRandomBallType(1));
  };

  return { restart, createBallOnBackgroundClick };
};

export default useGame;
