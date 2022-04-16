import { FC } from "react";
import styled, { CSSProperties, keyframes } from "styled-components";
import colors from "styles/colors";

const loading = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  background-color: #00000040;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SpinnerDiv = styled.div`
  position: absolute;
  width: 28px;
  height: 28px;
  border: 12px solid ${colors.secondary};
  border-bottom-color: ${colors.primary};
  border-radius: 50%;
  animation: ${loading} 2s linear infinite;
`;

const Spinner: FC<{ spinnerStyle?: CSSProperties }> = ({ spinnerStyle }) => (
  <Backdrop>
    <SpinnerDiv style={spinnerStyle} />
  </Backdrop>
);

export default Spinner;
