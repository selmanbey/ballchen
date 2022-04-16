import colors from "styles/colors";
import React, { FC, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { scoreAtom } from "states/game";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import TrophySvg from "./TrophySvg";
import Spinner from "./Spinner";

interface ScoreRecord {
  id: string;
  player: string;
  score: number;
  date: string;
}

const BustDiv = styled.div`
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

const BustSubtext = styled(motion.p)`
  margin: 0;
  margin-bottom: 4vh;
  color: ${colors.dark};
  font-size: 3vw;

  span {
    color: ${colors.primary};
  }
`;

const BustSubtextButton = styled(BustSubtext)`
  cursor: pointer;
  color: ${colors.primary};
  font-weight: 800;
  transition: color 0.4s;

  &:hover {
    color: ${colors.dark};
  }
`;

const BustButton = styled(motion.button)`
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

const BustScoreForm = styled(motion.form)`
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

const BustNameInput = styled.input`
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

const BustNameSubmit = styled.button`
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

const ScoreLi = styled.li`
  padding-bottom: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

const ScoreIndex = styled.span`
  margin-right: 0.5vw;
  color: ${colors.primary};
`;

const ScoreNumber = styled.span`
  margin-left: 0.5vw;
  color: ${colors.secondary};
`;

const BestScore = styled.div`
  display: inline-block;
  margin-left: 0.8vw;
`;

const LBPullOn = styled(motion.div)`
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

const LBDialog = styled(motion.div)`
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

const LeaderBoardTitle = styled.p`
  margin: 0;
  margin-bottom: 18px;
  color: ${colors.primary};
  font-size: 1.8vw;
  letter-spacing: 0.1vw;
  font-weight: 900;
`;

interface ResultsProps {
  restart: () => void;
}

const getScoreText = (score: number) => {
  if (score < 10) return "meh";
  if (score < 20) return "not too bad";
  if (score < 30) return "good stuff";
  if (score < 40) return "fire in the house";
  if (score < 50) return "like a true boss";
  return "whaat!";
};

const Results: FC<ResultsProps> = ({ restart }) => {
  const score = useRecoilValue(scoreAtom);
  const [scores, setScores] = useState<ScoreRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [boardOn, setBoardOn] = useState(false);
  const [scoreInputOn, setScoreInputOn] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);

  useEffect(() => {
    if (!boardOn) return;

    setIsLoading(true);
    fetch("/api/score", { method: "GET" })
      .then((res) => res.json())
      .then((scoresRes) => setScores(scoresRes))
      .finally(() => setIsLoading(false));
  }, [boardOn]);

  const addScoreToLeaderBoard = (player: string, score: number) => {
    if (!player) return;
    if (!score) return;

    fetch("/api/score", {
      method: "POST",
      body: JSON.stringify({
        player,
        score,
      }),
    });
  };

  return (
    <>
      <BustDiv>
        <BustButton
          key={`bust-botton-${buttonHovered.toString()}`}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          onClick={restart}
          onMouseOver={() => setButtonHovered(true)}
          onMouseLeave={() => setButtonHovered(false)}
        >
          {buttonHovered ? "RESTART?" : "BUSTED!"}
        </BustButton>

        <BustSubtext>
          ...with <span>{score}</span> bällchen score.{" "}
          <span>{getScoreText(score)}</span>.
        </BustSubtext>

        {score > 0 && !scoreInputOn && !playerName && (
          <AnimatePresence>
            <BustSubtextButton
              key="bust-subtext-button"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              transition={{ ease: "easeInOut" }}
              onClick={() => {
                setBoardOn(false);
                setScoreInputOn(true);
              }}
            >
              add to leader board?
            </BustSubtextButton>
          </AnimatePresence>
        )}

        {scoreInputOn && (
          <AnimatePresence>
            <BustScoreForm
              key="bust-score-form"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onSubmit={() => {
                setScoreInputOn(false);
                addScoreToLeaderBoard(playerName, score);
              }}
            >
              <BustSubtext>
                <span>your name: </span>
              </BustSubtext>
              <BustNameInput
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
              <BustNameSubmit type="submit">{">"}</BustNameSubmit>
            </BustScoreForm>
          </AnimatePresence>
        )}
      </BustDiv>

      {!boardOn && (
        <AnimatePresence>
          <LBPullOn
            key="lb-pull-on"
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            exit={{ x: 100 }}
            whileHover={{ boxShadow: `-2px 2px 0 0 ${colors.accent}` }}
            onClick={() => {
              setScoreInputOn(false);
              setBoardOn(true);
            }}
          >
            leaderboard
          </LBPullOn>
        </AnimatePresence>
      )}
      {boardOn && (
        <AnimatePresence>
          <LBDialog
            key="lb-dialog"
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            whileHover={{ boxShadow: `-2px 0 0 0 ${colors.accent}` }}
            onClick={() => {
              setBoardOn(false);
            }}
          >
            <LeaderBoardTitle>leaderboard</LeaderBoardTitle>
            {isLoading && (
              <Spinner
                spinnerStyle={{ top: "126px", left: "calc(48px + 4vw)" }}
              />
            )}
            <ul>
              {scores.map(({ id, player, score }, idx) => (
                <ScoreLi key={id}>
                  <ScoreIndex>{idx + 1}. </ScoreIndex>
                  {player} <ScoreNumber>({score})</ScoreNumber>
                  <BestScore>{idx === 0 && <TrophySvg />}</BestScore>
                </ScoreLi>
              ))}
            </ul>
          </LBDialog>
        </AnimatePresence>
      )}
    </>
  );
};

export default Results;
