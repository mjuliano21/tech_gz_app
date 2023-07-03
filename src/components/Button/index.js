import PropsType from 'prop-types';
import { StyleButton } from './styles';
import Spinner from '../Spinner';

export default function Button({
  type, disabled, isLoading, children, danger, onClick,
}) {
  return (
    <StyleButton type={type} disabled={disabled || isLoading} danger={danger} onClick={onClick}>
      {!isLoading && children}
      {isLoading && <Spinner size={35} />}
    </StyleButton>
  );
}

Button.propTypes = {
  children: PropsType.node.isRequired,
  type: PropsType.string,
  disabled: PropsType.bool,
  isLoading: PropsType.bool,
  danger: PropsType.bool,
  onClick: PropsType.func,
};

Button.defaultProps = {
  type: 'Button',
  disabled: false,
  isLoading: false,
  danger: false,
  onClick: undefined,
};
