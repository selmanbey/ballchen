import { BallType } from "types/ball";
import { GameState } from "types/game";

export const getBallAnimations = (gameState: GameState, ballType: BallType) => {
  return {
    initial: { opacity: 0 },
    animate: { opacity: gameState === "IN_PLAY" ? 1 : 0 },
    exit: { opacity: 0 },
    transition: { duration: 0.4 },
    whileHover:
      gameState === "IN_PLAY"
        ? {
            scale: ballType === "friend" ? 3 : 1.2,
            opacity: 0,
          }
        : {},
  };
};
