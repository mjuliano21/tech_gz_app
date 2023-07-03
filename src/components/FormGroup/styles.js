import styled from 'styled-components';

export const Container = styled.div`
& + & {
  margin-top: 16px;
}

small {
  color: ${({ theme }) => theme.color.danger.main};
  font-size: 12px;
  margin-top: 8px;
}

.form-item {
  position:relative;

  .loader {
    position:absolute;
    right:0;
    right:11px;
    top:8px;
  }
}
`;
