import React from "react";
import { useRecoilState } from "recoil";
import { audioOnAtom } from "states/settings";
import MuteSvg from "./svg/MuteSvg";
import MuteButton from "components/styled/MuteButton";

const Settings = () => {
  const [audioOn, setAudioOn] = useRecoilState(audioOnAtom);

  const toggleMute = () => setAudioOn(!audioOn);

  return (
    <MuteButton onClick={toggleMute}>
      <MuteSvg on={audioOn} />
    </MuteButton>
  );
};

export default Settings;
