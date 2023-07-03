import styled, { keyframes } from 'styled-components';

const load = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const StyledSpinner = styled.div`
   color: ${({ theme }) => theme.color.primary.main};
  font-size: ${({ size }) => `${size}px`};
  text-indent: -9999em;
  overflow: hidden;
  width: 1em;
  height:1em;
  border-radius:50%;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: ${load} 1.7s infinite ease;
  animation: ${load} 1s linear infinite;
  //box-shadow:0 0 3px #0388db;

  border: 10px solid #f3f3f3;
  border-top: 10px solid #3498db;
  border-radius: 75%;
`;
