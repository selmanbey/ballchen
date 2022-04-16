import React, { FC, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { scoreAtom } from "states/game";
import { ScoreRecord } from "types/database";
import { AnimatePresence } from "framer-motion";
import TrophySvg from "./svg/TrophySvg";
import Spinner from "./Spinner";
import {
  ResultBox,
  RestartButton,
  ScoreText,
  AddLeaderBoardButton,
  ScoreForm,
  PlayerNameSubmit,
  LeaderBoardPull,
  LeaderBoard,
  LeaderBoardTitle,
  LBItem,
  ScoreIndex,
  ScoreNumber,
  BestScore,
  PlayerNameInput,
} from "./styled/ResultComps";
import {
  getLeaderBoardAnimation,
  getLeaderBoardButtonAnimation,
  getLeaderBoardPullAnimation,
  getRestartButtonAnimation,
  getScoreFormAnimation,
} from "animations/results";

const getScoreText = (score: number) => {
  if (score < 10) return "meh";
  if (score < 25) return "not too bad";
  if (score < 50) return "good stuff";
  if (score < 75) return "fire in the house";
  if (score < 100) return "like a true boss";
  return "whaat!";
};

const Results: FC<{ restart: () => void }> = ({ restart }) => {
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
      <ResultBox>
        <RestartButton
          {...getRestartButtonAnimation(buttonHovered)}
          onClick={restart}
          onMouseOver={() => setButtonHovered(true)}
          onMouseLeave={() => setButtonHovered(false)}
        >
          {buttonHovered ? "RESTART?" : "BUSTED!"}
        </RestartButton>

        <ScoreText>
          ...with <span>{score}</span> bällchen score.{" "}
          <span>{getScoreText(score)}</span>.
        </ScoreText>

        {score > 0 && !scoreInputOn && !playerName && (
          <AnimatePresence>
            <AddLeaderBoardButton
              {...getLeaderBoardButtonAnimation()}
              onClick={() => {
                setBoardOn(false);
                setScoreInputOn(true);
              }}
            >
              add to leader board?
            </AddLeaderBoardButton>
          </AnimatePresence>
        )}

        {scoreInputOn && (
          <AnimatePresence>
            <ScoreForm
              {...getScoreFormAnimation()}
              onSubmit={() => {
                setScoreInputOn(false);
                addScoreToLeaderBoard(playerName, score);
              }}
            >
              <ScoreText>
                <span>your name: </span>
              </ScoreText>
              <PlayerNameInput
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
              <PlayerNameSubmit type="submit">{">"}</PlayerNameSubmit>
            </ScoreForm>
          </AnimatePresence>
        )}
      </ResultBox>

      {!boardOn && (
        <AnimatePresence>
          <LeaderBoardPull
            {...getLeaderBoardPullAnimation()}
            onClick={() => {
              setScoreInputOn(false);
              setBoardOn(true);
            }}
          >
            leaderboard
          </LeaderBoardPull>
        </AnimatePresence>
      )}

      {boardOn && (
        <AnimatePresence>
          <LeaderBoard
            {...getLeaderBoardAnimation()}
            onClick={() => setBoardOn(false)}
          >
            <LeaderBoardTitle>leaderboard</LeaderBoardTitle>
            {isLoading && (
              <Spinner
                spinnerStyle={{ top: "126px", left: "calc(48px + 4vw)" }}
              />
            )}
            <ul>
              {scores.map(({ id, player, score }, idx) => (
                <LBItem key={id}>
                  <ScoreIndex>{idx + 1}. </ScoreIndex>
                  {player} <ScoreNumber>({score})</ScoreNumber>
                  <BestScore>{idx === 0 && <TrophySvg />}</BestScore>
                </LBItem>
              ))}
            </ul>
          </LeaderBoard>
        </AnimatePresence>
      )}
    </>
  );
};

export default Results;
