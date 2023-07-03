import styled, { css } from 'styled-components';

export default styled.input`
width: 100%;
border:none;
background: #FFF;
border: 2px solid #FFF;
height:52px;
outline: none;
box-shadow: 0px 4px 10px rgba(0,0,0,0.4) ;
border-radius:4px;
padding: 0 16px;
font-size: 16px;
transition: border-color 0.2s ease-in;
appearance:none;

&:focus{
  border: 2px solid ${({ theme }) => theme.color.primary.main};
}

${({ theme, error }) => error && css`
  color:  ${theme.color.danger.main};
  border-color: ${theme.color.danger.main} !important;
`}

&[disabled] {
  background-color:  ${({ theme }) => theme.color.gray[100]};
  border-color:  ${({ theme }) => theme.color.gray[200]};
}

`;
