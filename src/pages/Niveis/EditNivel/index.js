import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import PageHeader from '../../../components/PageHeader';
import NivelForm from '../../../components/NivelForm';
import NiveisService from '../../../services/NiveisService';
import Loader from '../../../components/Loader';
import toast from '../../../utils/toast';
import useSafeAsyncAction from '../../../Hooks/useSafeAsyncAction';

export default function EditNiveis() {
  const [isLoading, setIsLoading] = useState(true);
  const [nivelName, setNivelName] = useState('');
  const nivelFormRef = useRef(null);
  const safeAsyncAction = useSafeAsyncAction();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function loadNivel() {
      try {
        setIsLoading(true);

        safeAsyncAction(async () => {
          const nivel = await NiveisService.getNivelById(id);
          nivelFormRef.current.setFieldsValues(nivel);
          setNivelName(nivel.descricao);
          setIsLoading(false);
        });
      } catch (error) {
        safeAsyncAction(async () => {
          setIsLoading(false);
          toast({
            type: 'danger',
            text: 'Nível não encontrado',
          });
          navigate('/Niveis/');
        });
      }
    }
    loadNivel();
  }, [id, navigate, safeAsyncAction]);

  async function handleSubmit(formData) {
    try {
      const nivel = {
        descricao: formData.descricao,
      };

      const devData = await NiveisService.updateNivel(id, nivel);

      setNivelName(devData.descricao);

      toast({
        type: 'success',
        text: 'Nivél cadastrado com sucesso!',
        duration: 1000,
      });
    } catch {
      toast({
        type: 'danger',
        text: 'ocorreu um erro ao cadastrar o nível!',
        duration: 2000,
      });
    }
  }
  //

  return (
    <>
      <PageHeader
        title={isLoading ? 'Carregando' : `Editar ${nivelName}`}
      />
      <Loader isLoading={isLoading} />
      <NivelForm
        ref={nivelFormRef}
        buttonLabel="Salvar Alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
