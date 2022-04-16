import { motion } from "framer-motion";
import styled from "styled-components";

const BallShape = styled(motion.div)`
  display: block;
  position: absolute;
  width: 28px;
  height: 28px;
  border-radius: 50%;
`;

export default BallShape;
