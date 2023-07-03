import { PropTypes } from 'prop-types';
import {
  useState, forwardRef, useImperativeHandle,
} from 'react';

import useErrors from '../../Hooks/useErrors';

import { Form, ButtonContainer } from './styles';

import Button from '../Button';
import FormGroup from '../FormGroup';
import Input from '../Input';

const NivelForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const [descricao, setDescricao] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    setError, removeError, getErrorMessageByFieldName, errors,
  } = useErrors();

  const isFormularioValido = (descricao && errors?.length === 0);

  useImperativeHandle(ref, () => ({
    setFieldsValues: (nivel) => {
      setDescricao(nivel.descricao ?? '');
    },
    resetFields: () => {
      setDescricao('');
    },
  }), []);

  function handleDescricaoChange(event) {
    setDescricao(event.target.value);

    if (!event.target.value) {
      setError({ field: 'descricao', message: 'Descrição é obrigatório' });
    } else {
      removeError('descricao');
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);

    await onSubmit({
      descricao,
    });

    setIsSubmitting(false);
  }

  return (
  // eslint-disable-next-line react/jsx-no-bind
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('descricao')}>
        <Input
          error={getErrorMessageByFieldName('descricao')}
          value={descricao}
          placeholder="Nivel *"
          // eslint-disable-next-line react/jsx-no-bind
          onChange={handleDescricaoChange}
          disabled={isSubmitting}
        />
      </FormGroup>
      <ButtonContainer>
        <Button
          type="submit"
          disabled={!isFormularioValido}
          isLoading={isSubmitting}
        >
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
});

NivelForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default NivelForm;
