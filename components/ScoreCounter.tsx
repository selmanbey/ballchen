import colors from "styles/colors";
import { motion } from "framer-motion";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { scoreAtom } from "states/game";
import styled from "styled-components";

const ActiveScoreDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.bg};

  span {
    position: absolute;
    color: ${colors.accent};
    font-size: 60vh;
    user-select: none;
  }
`;

const ScoreCounter: FC = () => {
  const score = useRecoilValue(scoreAtom);

  return (
    <ActiveScoreDiv>
      <motion.span
        key={score}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        {score}
      </motion.span>
    </ActiveScoreDiv>
  );
};

export default ScoreCounter;
