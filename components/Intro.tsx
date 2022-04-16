import React, { FC } from "react";
import {
  Title,
  Char,
  IntroDiv,
  UmlautLeft,
  UmlautRight,
} from "./styled/IntroComps";
import { titleParentAnim, titleCharAnim } from "animations/intro";

const Intro: FC<{ start: () => void }> = ({ start }) => {
  return (
    <IntroDiv>
      <Title variants={titleParentAnim} initial="hidden" animate="show">
        <Char variants={titleCharAnim}>b</Char>
        <Char variants={titleCharAnim}>
          a
          <UmlautLeft />
          <UmlautRight onClick={start}>start</UmlautRight>
        </Char>
        <Char variants={titleCharAnim}>l</Char>
        <Char variants={titleCharAnim}>l</Char>
        <Char variants={titleCharAnim}>c</Char>
        <Char variants={titleCharAnim}>h</Char>
        <Char variants={titleCharAnim}>e</Char>
        <Char variants={titleCharAnim}>n</Char>
      </Title>
    </IntroDiv>
  );
};

export default Intro;
