import { getThemeAudio } from "utils/audio";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import useMouseIn from "hooks/useMouseIn";
import { audioOnAtom } from "states/settings";
import { gameStateAtom, loopTimeAtom } from "states/game";

const useLoop = (): null => {
  const gameState = useRecoilValue(gameStateAtom);
  const audioOn = useRecoilValue(audioOnAtom);
  const [themeAudioSrcNode, setThemeAudioSrcNode] =
    useState<AudioBufferSourceNode>(null);

  const stopLoop = () => {
    if (!themeAudioSrcNode) return;
    themeAudioSrcNode.loop = false;
    themeAudioSrcNode.stop();
    setThemeAudioSrcNode(null);
  };

  const mouseIn = useMouseIn();
  const setLoopTime = useSetRecoilState(loopTimeAtom);

  // THEME MUSIC
  useEffect(() => {
    if (gameState !== "IN_PLAY") {
      stopLoop();
      return;
    }

    if (!audioOn) {
      stopLoop();
      return;
    }

    if (gameState === "IN_PLAY" && audioOn) {
      if (themeAudioSrcNode) return;
      getThemeAudio().then((srcNode) => {
        setTimeout(() => srcNode.start(), 400);
        setThemeAudioSrcNode(srcNode);
      });
      return;
    }

    return () => stopLoop();
  }, [gameState, audioOn]);

  // LOOP TIME
  useEffect(() => {
    let frameId: number = 0;
    if (!mouseIn) return () => cancelAnimationFrame(frameId);

    if (gameState !== "IN_PLAY") {
      setLoopTime(0);
      return () => cancelAnimationFrame(frameId);
    }

    const frame = (time: number) => {
      setLoopTime(time);
      frameId = requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);

    return () => cancelAnimationFrame(frameId);
  }, [gameState, mouseIn, setLoopTime]);

  return null;
};

export default useLoop;
