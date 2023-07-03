import { PropTypes } from 'prop-types';
import { useEffect } from 'react';
import { Container } from './styles';

import checkIcon from '../../../assets/images/icons/check.svg';
import successIcon from '../../../assets/images/icons/success.svg';

export default function ToastMessage({ message, onRemoveMessagem }) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessagem(message.id);

      return () => {
        clearTimeout(timeoutId);
      };
    }, message.duration || 3000);
  }, [message, onRemoveMessagem]);

  function handleRemoveToast() {
    onRemoveMessagem(message.id);
  }

  return (
    <Container type={message.type} onClick={handleRemoveToast} tabIndex={0} role="button">
      {message.type === 'danger' && <img src={checkIcon} alt="Danger" width="30" />}
      {message.type === 'success' && <img src={successIcon} alt="Success" width="30" />}

      <strong>{message.text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  onRemoveMessagem: PropTypes.func.isRequired,
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    duration: PropTypes.number,
    type: PropTypes.oneOf(['success', 'danger', 'default']),
  }).isRequired,
};
