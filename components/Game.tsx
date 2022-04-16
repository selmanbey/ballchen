import { AnimatePresence, motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import Ball from "./Ball";
import { gameStateAtom } from "states/game";
import ScoreCounter from "./ScoreCounter";
import Results from "./Results";
import Intro from "./Intro";
import { ballIdsAtom } from "states/balls";
import useWindowBoundaries from "hooks/useWindowBoundaries";
import useLoop from "hooks/useLoop";
import useGame from "hooks/useGame";
import { getGameBackgroundAnimations } from "animations/game";
import React from "react";
import Background from "./styled/Background";

const Game = () => {
  const gameState = useRecoilValue(gameStateAtom);
  const ballchenIds = useRecoilValue(ballIdsAtom);

  const { start, createBallOnBackgroundClick } = useGame();
  useWindowBoundaries();
  useLoop();

  return (
    <Background
      {...getGameBackgroundAnimations(gameState)}
      onClick={createBallOnBackgroundClick}
    >
      {gameState === "READY_FOR_FIRST_GAME" && <Intro start={start} />}
      {gameState === "READY_FOR_NEXT_GAME" && <Results restart={start} />}
      {gameState === "IN_PLAY" && <ScoreCounter />}

      {[...ballchenIds.friend, ...ballchenIds.enemy].map((id) => (
        <AnimatePresence key={id}>
          <Ball id={id} />
        </AnimatePresence>
      ))}
    </Background>
  );
};

export default Game;
