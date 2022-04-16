import colors from "styles/colors";
import { motion } from "framer-motion";
import { FC } from "react";
import styled, { keyframes } from "styled-components";

const IntroDiv = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GameTitle = styled(motion.div)`
  display: flex;
  color: ${colors.primary};
`;

const GameTitleChar = styled(motion.p)`
  font-family: "Square Peg";
  font-size: 30vw;
  font-weight: 900;
  position: relative;
  margin: 0;
  padding: 0;
  user-select: none;
`;

const Umlaut = styled.span`
  position: absolute;
  font-family: "Square Peg";
  top: 14vw;
  width: 2.5vw;
  height: 2.5vw;
  background-color: ${colors.primary};
  border-radius: 50%;
  font-size: 1.2vw;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.primary};
  transform: scale(1);
  transition: background-color 0.3s, transform 1s;
`;

const bgHighlight = keyframes`
  from {
    background-color: ${colors.primary};
	color: ${colors.primary};
  }

  to {
    background-color: ${colors.secondary};
	color: ${colors.secondary};
  }
`;

const UmlautRight = styled(Umlaut)`
  box-sizing: border-box;
  cursor: pointer;
  left: 7.2vw;
  border: 0.6px solid;
  border-color: transparent;

  &:hover {
    background-color: ${colors.secondary};
    color: ${colors.primary};
    border-color: ${colors.accent};
    transform: scale(8);
    z-index: 1;
    animation: none;
  }

  animation: ${bgHighlight} 1.5s ease infinite alternate;
`;

const UmlautLeft = styled(Umlaut)`
  left: 5vw;
`;

interface IntroProps {
  start: () => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delay: 0.1,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: -4, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { ease: "easeInOut", duration: 0.6 } },
};

const Intro: FC<IntroProps> = ({ start }) => {
  return (
    <IntroDiv>
      <GameTitle variants={container} initial="hidden" animate="show">
        <GameTitleChar variants={item}>b</GameTitleChar>
        <GameTitleChar variants={item}>
          a
          <UmlautLeft />
          <UmlautRight onClick={start}>start</UmlautRight>
        </GameTitleChar>
        <GameTitleChar variants={item}>l</GameTitleChar>
        <GameTitleChar variants={item}>l</GameTitleChar>
        <GameTitleChar variants={item}>c</GameTitleChar>
        <GameTitleChar variants={item}>h</GameTitleChar>
        <GameTitleChar variants={item}>e</GameTitleChar>
        <GameTitleChar variants={item}>n</GameTitleChar>
      </GameTitle>
    </IntroDiv>
  );
};

export default Intro;
