import { motion } from "framer-motion";
import styled from "styled-components";

const Background = styled(motion.div)`
  cursor: url("/circle.svg"), auto;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: -1;
`;

export default Background