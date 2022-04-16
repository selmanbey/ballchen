import { FC } from "react";
import { useRecoilValue } from "recoil";
import { gameStateAtom } from "states/game";
import { ballAtom } from "states/balls";
import useBall from "hooks/useBall";
import { getBallAnimations } from "animations/ball";
import BallShape from "./styled/BallShape";

const Ball: FC<{ id: string }> = ({ id }) => {
  const ball = useRecoilValue(ballAtom(id));
  const gameState = useRecoilValue(gameStateAtom);

  const { handleContact, playAudio } = useBall(id);

  return (
    <BallShape
      {...getBallAnimations(gameState, ball.type)}
      onHoverStart={() => playAudio(ball.type)}
      onHoverEnd={() => handleContact(ball.type)}
      style={{
        left: `${ball.position.x}px`,
        top: `${ball.position.y}px`,
        backgroundColor: ball.color,
      }}
    />
  );
};

export default Ball;
