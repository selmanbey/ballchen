import { FC } from "react";
import { useRecoilValue } from "recoil";
import { motion } from "framer-motion";
import { playDeath, playFriendGain } from "utils/audio";
import { audioOnAtom } from "states/settings";
import { gameStateAtom } from "states/game";
import { ballAtom } from "states/balls";
import useBall from "hooks/useBall";

const Ball: FC<{ id: string }> = ({ id }) => {
  const ball = useRecoilValue(ballAtom(id));
  const gameState = useRecoilValue(gameStateAtom);
  const audioOn = useRecoilValue(audioOnAtom);

  const { handleFriendContact, handleEnemyContact } = useBall(id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: gameState === "IN_PLAY" ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={
        gameState === "IN_PLAY"
          ? {
              scale: ball.type === "friend" ? 3 : 1.2,
              opacity: 0,
            }
          : {}
      }
      onHoverStart={() => {
        if (!audioOn) return;
        if (gameState !== "IN_PLAY") return;
        if (ball.type === "friend") playFriendGain();
        if (ball.type === "enemy") playDeath();
      }}
      onHoverEnd={() => {
        if (gameState !== "IN_PLAY") return;
        if (ball.type === "friend") handleFriendContact();
        if (ball.type === "enemy") handleEnemyContact();
      }}
      style={{
        display: "block",
        position: `absolute`,
        left: `${ball.x}px`,
        top: `${ball.y}px`,
        width: `28px`,
        height: `28px`,
        backgroundColor: `${ball.color}`,
        borderRadius: `50%`,
      }}
    />
  );
};

export default Ball;
