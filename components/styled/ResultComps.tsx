import { motion } from "framer-motion";
import styled from "styled-components";
import colors from "styles/colors";

export const ResultBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

export const ScoreText = styled(motion.p)`
  margin: 0;
  margin-bottom: 4vh;
  color: ${colors.dark};
  font-size: 3vw;

  span {
    color: ${colors.primary};
  }
`;

export const AddLeaderBoardButton = styled(ScoreText)`
  cursor: pointer;
  color: ${colors.primary};
  font-weight: 800;
  transition: color 0.4s;

  &:hover {
    color: ${colors.dark};
  }
`;

export const RestartButton = styled(motion.button)`
  font-family: "Barlow";
  font-size: 14vw;
  font-weight: 900;
  border: none;
  background: none;
  color: ${colors.primary};
  transition: color 0.4s;

  &:hover {
    color: ${colors.dark};
  }
`;

export const ScoreForm = styled(motion.form)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    margin: 0;
    margin-right: 1.5vw;
    margin-bottom: 0.7vw;
  }
`;

export const PlayerNameInput = styled.input`
  position: relative;
  box-sizing: border-box;
  font-size: 3vw;
  color: ${colors.secondary};
  background-color: ${colors.bg};
  height: 5vw;
  width: 32vw;
  border: 2px solid ${colors.primary};
  border-radius: 4vw;
  font-size: 2vw;
  padding: 0.5vw 2vw;
`;

export const PlayerNameSubmit = styled.button`
  position: absolute;
  cursor: pointer;
  color: ${colors.bg};
  border: none;
  right: 0;
  width: 5vw;
  height: 5vw;
  border-radius: 4vw;
  background-color: ${colors.primary};
  transition: background-color 0.4s;
  color: ${colors.bg};
  font-size: 2vw;

  &:hover {
    background-color: ${colors.dark};
  }
`;


export const LeaderBoardPull = styled(motion.div)`
  cursor: pointer;
  position: absolute;
  top: 2vh;
  right: -20px;
  padding: 12px 24px;
  padding-right: 36px;
  font-weight: 800;

  background-color: ${colors.bg};
  border: 2px solid ${colors.dark};
  color: ${colors.primary};
  border-radius: 10px;
`;

export const LeaderBoard = styled(motion.div)`
  cursor: pointer;
  position: fixed;
  right: -80px;
  top: 0px;
  height: 100%;
  padding: 48px;
  padding-right: 128px;
  background-color: ${colors.bg};
  border-left: 4px solid ${colors.dark};
  font-size: 1.6vw;
  text-align: left;
  overflow-y: auto;
  z-index: 1;
`;

export const LeaderBoardTitle = styled.p`
  margin: 0;
  margin-bottom: 18px;
  color: ${colors.primary};
  font-size: 1.8vw;
  letter-spacing: 0.1vw;
  font-weight: 900;
`;

export const LBItem = styled.li`
  padding-bottom: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

export const ScoreIndex = styled.span`
  margin-right: 0.5vw;
  color: ${colors.primary};
`;

export const ScoreNumber = styled.span`
  margin-left: 0.5vw;
  color: ${colors.secondary};
`;

export const BestScore = styled.div`
  display: inline-block;
  margin-left: 0.8vw;
`;

