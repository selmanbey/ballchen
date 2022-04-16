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
import { ballAtom, ballIdsAtom } from "states/balls";
import { audioOnAtom } from "states/settings";
import { playPop, playStart } from "utils/audio";
import { useEffect, useMemo } from "react";
import { BallAtom, BallIds, BallType } from "types/ball";
import { WindowBoundaries } from "types/window";

let FRIEND_SPEED = 2;
let ENEMY_SPEED = 4;

let GENERATED_BALL_IDS: string[] = [];
const generateBallId = () => {
  let id = Math.random().toString();
  while (GENERATED_BALL_IDS.includes(id)) {
    id = Math.random().toString();
  }
  GENERATED_BALL_IDS.push(id);
  return id;
};

const generateRandomBallType = (odds: number = 0.7) =>
  Math.random() > odds ? "enemy" : "friend";

const generateBallProps = (
  type: BallType,
  windowBoundaries: WindowBoundaries
): BallAtom => {
  const speed = type === "friend" ? FRIEND_SPEED : ENEMY_SPEED;
  const color = type === "friend" ? colors.secondary : colors.primary;
  const position = {
    x: Math.floor(Math.random() * windowBoundaries.right),
    y: Math.floor(Math.random() * windowBoundaries.down),
  };
  const trajectory = {
    x: Math.floor(Math.random() * speed),
    y: Math.floor(Math.random() * speed),
    upX: Math.random() < 0.5,
    upY: Math.random() < 0.5,
  };
  // Stabilize speed
  const randomDirection = Math.random() < 0.5 ? "x" : "y";
  trajectory[randomDirection] = speed;

  return {
    position,
    trajectory,
    type,
    color,
  };
};

const useGame = () => {
  const audioOn = useRecoilValue(audioOnAtom);
  const windowBoundaries = useRecoilValue(windowBoundariesAtom);
  const loopTime = useRecoilValue(loopTimeAtom);
  const gameTime = useMemo(() => Math.floor(loopTime / 1000), [loopTime]);

  const [gameState, setGameState] = useRecoilState(gameStateAtom);
  const [ballIds, setBallIds] = useRecoilState(ballIdsAtom);

  const setScore = useSetRecoilState(scoreAtom);
  const setBall = useRecoilCallback(
    ({ set }) =>
      (id: string, props: Partial<BallAtom>) => {
        set(ballAtom(id), (ballProps) => ({ ...ballProps, ...props }));
      }
  );

  const createBall = (ballchenId: string, type: BallType) => {
    const ballProps = generateBallProps(type, windowBoundaries);
    setBall(ballchenId, ballProps);
    setBallIds((ids) => ({
      ...ids,
      [type]: [...ids[type], ballchenId],
    }));
  };

  const stopBalls = (ids: BallIds) => {
    const stop = (id: string) =>
      setBall(id, { trajectory: { x: 0, y: 0, upX: false, upY: false } });
    ids.friend.forEach((id) => stop(id));
    ids.enemy.forEach((id) => stop(id));
  };

  const deleteBalls = useRecoilCallback(({ reset }) => (ids: BallIds) => {
    GENERATED_BALL_IDS = [];
    ids.friend.forEach((id) => reset(ballAtom(id)));
    ids.enemy.forEach((id) => reset(ballAtom(id)));
  });

  useEffect(() => {
    // if player is busted, stop all the balls at spot
    if (gameState === "READY_FOR_NEXT_GAME") {
      stopBalls(ballIds);
      return;
    }

    // if player started new game, restrart game stats
    if (gameState === "IN_PLAY") {
      ENEMY_SPEED = 4;
      setScore(0);
      deleteBalls(ballIds);
      setBallIds({ friend: [], enemy: [] });
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState !== "IN_PLAY") return;

    if (gameTime === 0) return;
    if (gameTime % 2 !== 0) {
      createBall(generateBallId(), generateRandomBallType(0));
      createBall(generateBallId(), generateRandomBallType(1));
    }
    if (gameTime % 8 === 0) {
      ENEMY_SPEED += 1;
    }
  }, [gameTime]);

  const start = () => {
    if (audioOn) playStart();
    setGameState("IN_PLAY");
  };

  const createBallOnBackgroundClick = () => {
    if (gameState !== "IN_PLAY") return;
    if (ballIds.friend.length >= 20) return;
    if (audioOn) playPop();
    createBall(generateBallId(), generateRandomBallType(1));
  };

  return { start, createBallOnBackgroundClick };
};

export default useGame;
