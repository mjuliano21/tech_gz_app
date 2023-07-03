import styled, { css } from 'styled-components';

export const StyleButton = styled.button`
height:52px;
border:none;
padding: 0 16px;
background: ${({ theme }) => theme.color.primary.main};
font-size: 16px;
box-shadow: 0px 4px 10px rgba(0,0,0,0.4) ;
font-weight: bold;
color:#FFF;
border-radius:4px;
transition: background 0.2s ease-in;
display:flex;
align-items:center;
justify-content:center;

&:hover {
  background: ${({ theme }) => theme.color.primary.ligth};
}

&:active {
  background: ${({ theme }) => theme.color.primary.dark};
}

&[disabled] {
  background: #CCC !important;
  cursor: default !important;
}

  ${({ theme, danger }) => danger && css`
    background: ${theme.color.danger.main};

    &:hover {
      background: ${theme.color.danger.light};
    }

    &:active {
      background: ${theme.color.danger.dark};
    }
  `}
`;
