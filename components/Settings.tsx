import React from "react";
import { useRecoilState } from "recoil";
import { audioOnAtom } from "states/settings";
import styled from "styled-components";
import MuteSvg from "./MuteSvg";

const MuteButton = styled.button`
  cursor: pointer;
  position: absolute;
  background: none;
  border: none;
  bottom: 36px;
  left: 36px;
  z-index: 1;
`;

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
