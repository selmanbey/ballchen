import colors from "styles/colors";
import { GameState } from "types/game";

export const getGameBackgroundAnimations = (gameState: GameState) => ({
  animate: {
    backgroundColor:
      gameState === "READY_FOR_NEXT_GAME" ? colors.secondary : colors.bg,
  },
  initial: false,
  transition: { duration: 0.4 },
});
