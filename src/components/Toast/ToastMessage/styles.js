import styled, { css } from 'styled-components';

const containerVariantes = {
  success: css`
   background: ${({ theme }) => theme.color.success.main};
    `,
  danger: css`
  background:${({ theme }) => theme.color.danger.main};
    `,
  default: css`
  background:${({ theme }) => theme.color.primary.main};
  `,
};

export const Container = styled.div`
padding: 16px 32px;
color:#fff;
border-radius: 4px;
box-shadow: 0px 20px 20px -16px rgba(0,0,0,0.25);
display:flex;
align-items:center;
justify-content:center;
cursor:pointer;

${({ type }) => containerVariantes[type] || containerVariantes.default};

& + & {
  margin-top: 12px;
}

img {
  margin-right:8px;
}



`;
