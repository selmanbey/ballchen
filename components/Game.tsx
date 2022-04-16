import { AnimatePresence, motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import Ball from "./Ball";
import { gameStateAtom } from "states/game";
import ScoreCounter from "./ScoreCounter";
import Results from "./Results";
import Intro from "./Intro";
import colors from "styles/colors";
import { ballIdsAtom } from "states/balls";
import styled from "styled-components";
import useWindowBoundaries from "hooks/useWindowBoundaries";
import useLoop from "hooks/useLoop";
import useGame from "hooks/useGame";

const Background = styled(motion.div)`
  cursor: url("/circle.svg"), auto;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: -1;
`;

const Game = () => {
  const gameState = useRecoilValue(gameStateAtom);
  const ballchenIds = useRecoilValue(ballIdsAtom);

  const { restart, createBallOnBackgroundClick } = useGame();
  useWindowBoundaries();
  useLoop();

  return (
    <Background
      animate={{
        backgroundColor:
          gameState === "READY_FOR_NEXT_GAME" ? colors.secondary : colors.bg,
      }}
      initial={false}
      transition={{ duration: 0.4 }}
      onClick={createBallOnBackgroundClick}
    >
      {gameState === "READY_FOR_FIRST_GAME" && <Intro start={restart} />}

      {gameState === "READY_FOR_NEXT_GAME" && <Results restart={restart} />}

      {gameState === "IN_PLAY" && <ScoreCounter />}

      {/* ALL THE BALLZ */}
      {[...ballchenIds.friend, ...ballchenIds.enemy].map((id) => (
        <AnimatePresence key={id}>
          <Ball id={id} />
        </AnimatePresence>
      ))}
    </Background>
  );
};

export default Game;
