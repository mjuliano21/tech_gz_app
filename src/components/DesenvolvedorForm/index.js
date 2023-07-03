import { PropTypes } from 'prop-types';
import {
  useEffect, useState, useCallback, forwardRef, useImperativeHandle,
} from 'react';

import isEmailValid from '../../utils/isEmailValid';
import useErrors from '../../Hooks/useErrors';

import NiveisServices from '../../services/NiveisService';

import { Form, ButtonContainer } from './styles';

import calculaIdade from '../../utils/calculaIdade';

import Button from '../Button';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';

const DesenvolvedorForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sexo, setSexo] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [idade, setIdade] = useState('');
  const [hobby, setHobby] = useState('');
  const [nivelId, setNivelId] = useState('');
  const [niveis, setNiveis] = useState([]);
  const [isLoadingNiveis, setIsLoadingNiveis] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    setError, removeError, getErrorMessageByFieldName, errors,
  } = useErrors();

  const isFormularioValido = (name && sexo && dataNascimento && nivelId && errors?.length === 0);

  const loadNiveis = useCallback(async () => {
    try {
      setIsLoadingNiveis(true);

      const niveisList = await NiveisServices.listNiveis();
      setNiveis(niveisList);
    } catch {
      //
    } finally {
      setIsLoadingNiveis(false);
    }
  }, []);

  useImperativeHandle(ref, () => ({
    setFieldsValues: (desenvolvedor) => {
      setName(desenvolvedor.name ?? '');
      setEmail(desenvolvedor.email ?? '');
      setSexo(desenvolvedor.sexo ?? '');
      setDataNascimento(desenvolvedor.datanascimento ?? '');
      setIdade(calculaIdade(desenvolvedor.datanascimento) ?? 0);
      setHobby(desenvolvedor.hobby ?? '');
      setNivelId(desenvolvedor.nivel_id ?? '');
    },
    resetFields: () => {
      setName('');
      setEmail('');
      setSexo('');
      setDataNascimento('');
      setIdade(0);
      setHobby('');
      setNivelId('');
    },
  }), []);

  useEffect(() => {
    loadNiveis();
  }, [loadNiveis]);

  function handleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório' });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'Email inválido' });
    } else {
      removeError('email');
    }
  }

  function handleSexoChange(event) {
    setSexo(event.target.value);
  }

  function handleDataNascimentoChange(event) {
    setDataNascimento(event.target.value);
  }

  function handleHobbyChange(event) {
    setHobby(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);
    console.log('calculaIdade(dataNascimento)', calculaIdade(dataNascimento));
    console.log(name, email, sexo, dataNascimento, idade, hobby, nivelId);

    await onSubmit({
      name, email, sexo, dataNascimento, idade, hobby, nivelId,
    });

    setIsSubmitting(false);
  }

  return (
  // eslint-disable-next-line react/jsx-no-bind
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          error={getErrorMessageByFieldName('name')}
          value={name}
          placeholder="Nome *"
          // eslint-disable-next-line react/jsx-no-bind
          onChange={handleNameChange}
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type="email"
          error={getErrorMessageByFieldName('email')}
          placeholder="Email"
          value={email}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={handleEmailChange}
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup>
        <Select
          value={sexo}
          onChange={handleSexoChange}
          disabled={isSubmitting}
        >
          <option value="">Sexo</option>
          <option key="1" value="M">Masculino</option>
          <option key="2" value="F">Feminino</option>
        </Select>
      </FormGroup>

      <FormGroup>
        <Input
          type="date"
          min
          placeholder="Data de Nascimento"
          value={dataNascimento}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={handleDataNascimentoChange}
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Hobby"
          value={hobby}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={handleHobbyChange}
          maxLength="15"
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup isLoading={isLoadingNiveis}>
        <Select
          value={nivelId}
          onChange={(event) => setNivelId(event.target.value)}
          disabled={isLoadingNiveis || isSubmitting}
        >
          <option value="">Selecione</option>
          { niveis.map((nivel) => (
            <option key={nivel.id} value={nivel.id}>{nivel.descricao}</option>
          )) }
          ;
        </Select>
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

DesenvolvedorForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default DesenvolvedorForm;
