import { styled } from 'styled-components';

export const Container = styled.header`
margin-bottom: 24px;

a {
  display:flex;
  align-items:center;
  text-decoration:none;

  span {
    color: ${({ theme }) => theme.color.primary.main};
    font-weight: bold;
  }

  img {
    margin-right: 4px;
  }
}

h1 {
  font-size: 24px;
}
`;
