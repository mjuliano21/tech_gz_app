import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0px 4px 0px 4px;
  box-sizing: border-box;
  font-family: 'Sora', sans-serif;
  font-size: 16px;
}

body {
  background : ${({ theme }) => theme.color.background};
  font-size: 16px;
  color: ${({ theme }) => theme.color.gray[900]};
}

button {
 cursor: pointer;
}
`;
