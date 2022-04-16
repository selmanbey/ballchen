import colors from "styles/colors";

export const getRestartButtonAnimation = (buttonHovered: boolean) => ({
  key: `restart-botton-${buttonHovered.toString()}`,
  initial: { scale: 0.8 },
  animate: { scale: 1 },
  exit: { scale: 0.8 },
});

export const getLeaderBoardButtonAnimation = () => ({
  key: `add-leaderboard-button`,
  initial: { scale: 0.8 },
  animate: { scale: 1 },
  exit: { scale: 0.8 },
  whileHover: { scale: 1.1 },
  transition: { ease: "easeInOut" },
});

export const getScoreFormAnimation = () => ({
  key: `score-form`,
  initial: { scale: 0.8 },
  animate: { scale: 1 },
  exit: { scale: 0.8 },
});

export const getLeaderBoardPullAnimation = () => ({
  key: "lb-pull-on",
  initial: { x: 100 },
  animate: { x: 0 },
  exit: { x: 100 },
  whileHover: { boxShadow: `-2px 2px 0 0 ${colors.accent}` },
});

export const getLeaderBoardAnimation = () => ({
  key: "leaderboard",
  initial: { x: 400 },
  animate: { x: 0 },
  exit: { x: 400 },
  whileHover: { boxShadow: `-2px 0 0 0 ${colors.accent}` },
});
