import { useRef } from 'react';
import PageHeader from '../../../components/PageHeader';
import DesenvolvedorForm from '../../../components/DesenvolvedorForm';
import DesenvolvedoresService from '../../../services/DesenvolvedoresService';
import toast from '../../../utils/toast';
import calculaIdade from '../../../utils/calculaIdade';

export default function NewDesenvolvedor() {
  const desenvolvedorFormRef = useRef(null);
  async function handleSubmit(formData) {
    try {
      const desenvolvedor = {
        name: formData.name,
        email: formData.email,
        sexo: formData.sexo,
        datanascimento: formData.dataNascimento,
        idade: calculaIdade(formData.dataNascimento),
        hobby: formData.hobby,
        nivel_id: formData.nivelId,
      };

      await DesenvolvedoresService.createDesenvolvedores(desenvolvedor);
      desenvolvedorFormRef.current.resetFields();

      toast({
        type: 'success',
        text: 'Desenvolvedor cadastrado com sucesso!',
        duration: 1000,
      });
    } catch (Error) {
      if (!Error.name === 'APIError') {
        Error.message = 'Ocorreu um erro ao cadastrar o desenvolvedor!';
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
        title="Novo Desenvolvedor"
      />

      <DesenvolvedorForm
        ref={desenvolvedorFormRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />

    </>
  );
}
