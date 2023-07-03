import { useRef } from 'react';
import PageHeader from '../../../components/PageHeader';
import NivelForm from '../../../components/NivelForm';
import NiveisService from '../../../services/NiveisService';
import toast from '../../../utils/toast';

export default function NewNivel() {
  const nivelFormRef = useRef(null);
  async function handleSubmit(formData) {
    try {
      const nivel = {
        descricao: formData.descricao,
      };

      await NiveisService.createNivel(nivel);
      nivelFormRef.current.resetFields();

      toast({
        type: 'success',
        text: 'Nivel cadastrado com sucesso!',
        duration: 1000,
      });
    } catch (Error) {
      if (!Error.name === 'APIError') {
        Error.message = 'Ocorreu um erro ao cadastrar o Nível!';
      }
      toast({
        type: 'danger',
        text: Error.message,
        duration: 2000,
      });
    }
  }

  return (
    <>
      <PageHeader
        title="Novo Nível"
      />

      <NivelForm
        ref={nivelFormRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />

    </>
  );
}
