import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import PageHeader from '../../../components/PageHeader';
import DesenvolvedorForm from '../../../components/DesenvolvedorForm';
import DesenvolvedoresService from '../../../services/DesenvolvedoresService';
import Loader from '../../../components/Loader';
import toast from '../../../utils/toast';
import useSafeAsyncAction from '../../../Hooks/useSafeAsyncAction';
import calculaIdade from '../../../utils/calculaIdade';

export default function EditDesenvolvedor() {
  const [isLoading, setIsLoading] = useState(true);
  const [desenvolvedorName, setDesenvolvedorName] = useState('');
  const desenvolvedorFormRef = useRef(null);
  const safeAsyncAction = useSafeAsyncAction();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function loadDesenvolvedor() {
      try {
        setIsLoading(true);

        safeAsyncAction(async () => {
          const desenvolvedor = await DesenvolvedoresService.getDesenvolvedoresById(id);
          desenvolvedorFormRef.current.setFieldsValues(desenvolvedor);
          setDesenvolvedorName(desenvolvedor.name);
          setIsLoading(false);
        });
      } catch (error) {
        safeAsyncAction(async () => {
          setIsLoading(false);
          toast({
            type: 'danger',
            text: 'Desenvolvedor não encontrado',
          });
          navigate('/');
        });
      }
    }
    loadDesenvolvedor();
  }, [id, navigate, safeAsyncAction]);

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

      const devData = await DesenvolvedoresService.updateDesenvolvedores(id, desenvolvedor);

      setDesenvolvedorName(devData.name);

      toast({
        type: 'success',
        text: 'Desenvolvedor cadastrado com sucesso!',
        duration: 1000,
      });
    } catch {
      toast({
        type: 'danger',
        text: 'ocorreu um erro ao cadastrar o desenvolvedor!',
        duration: 2000,
      });
    }
  }
  //

  return (
    <>
      <PageHeader
        title={isLoading ? 'Carregando' : `Editar ${desenvolvedorName}`}
      />
      <Loader isLoading={isLoading} />
      <DesenvolvedorForm
        ref={desenvolvedorFormRef}
        buttonLabel="Salvar Alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
