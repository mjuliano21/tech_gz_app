import styled from 'styled-components';

export const Container = styled.header`
padding: 0px 24px 0px 24px;
display: flex;
flex-direction: column;
align-items: center;
margin-bottom: 32px;

.menu {

  a {
    background: ${({ theme }) => theme.color.primary.main};
    color:#fff;

    text-decoration: none;
    font-weight: bolder;

    padding: 8px 16px;
    border-radius: 4px;
    transition: all 0.2s ease-in;
    margin-right:12px;

    &:hover {
      background: transparent;
      color: ${({ theme }) => theme.color.primary.main};
      border: 2px solid ${({ theme }) => theme.color.primary.main};
    }
  }
}
`;
