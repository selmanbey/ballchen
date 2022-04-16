import { motion } from "framer-motion";
import styled, { keyframes } from "styled-components";
import colors from "styles/colors";

export const IntroDiv = styled.div`
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

export const Title = styled(motion.div)`
  display: flex;
  color: ${colors.primary};
`;

export const Char = styled(motion.p)`
  font-family: "Square Peg";
  font-size: 30vw;
  font-weight: 900;
  position: relative;
  margin: 0;
  padding: 0;
  user-select: none;
`;

export const Umlaut = styled.span`
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

export const UmlautRight = styled(Umlaut)`
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

export const UmlautLeft = styled(Umlaut)`
  left: 5vw;
`;
