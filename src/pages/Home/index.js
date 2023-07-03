/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-one-expression-per-line */
import React, {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import { Link } from 'react-router-dom';

import {
  Card,
  Container,
  InputSearchContainer,
  Header,
  ListHeader,
  ErroContainer,
  EmptyListContainer,
  EmptyBuscaContainer,
} from './styles';

import Loader from '../../components/Loader';
import DesenvolvedoresService from '../../services/DesenvolvedoresService';

import short from '../../assets/images/icons/sort.svg';
import edit from '../../assets/images/icons/edit.svg';
import del from '../../assets/images/icons/delete.svg';
import triste from '../../assets/images/triste.png';
import Button from '../../components/Button';
import Vazio from '../../assets/images/icons/vazio.png';
import NaoAchou from '../../assets/images/icons/nao_achou.svg';

import Modal from '../../components/Modal';
import toast from '../../utils/toast';

export default function Home() {
  const [desenvolvedores, setDesenvolvedores] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [termoBusca, setTermoBusca] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [desenvolvedorBeingDelete, setDesenvolvedorBeingDelete] = useState(null);

  const filteredDesenvolvedores = useMemo(() => desenvolvedores.filter((desenvolvedor) => (
    desenvolvedor.name.toLowerCase().includes(termoBusca.toLowerCase())
  )), [desenvolvedores, termoBusca]);

  const loadDesenvolvedores = useCallback(async () => {
    try {
      setIsLoading(true);

      const desenvolvedoresList = await DesenvolvedoresService.listDesenvolvedores(orderBy);
      setDesenvolvedores(desenvolvedoresList);
      setHasError(false);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadDesenvolvedores();
  }, [loadDesenvolvedores]);

  function handleAlternaOrderDesenvolvedor() {
    setOrderBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
    );
  }

  async function handlerBuscaPorNome(event) {
    setTermoBusca(event.target.value);
    const desenvolvedoresList = await DesenvolvedoresService.listDesenvolvedores(orderBy);
    setDesenvolvedores(desenvolvedoresList);
  }

  function handlerCarregaNovamente() {
    loadDesenvolvedores();
  }

  function handleDeleteDesenvolvedor(desenvolvedor) {
    //
    setDesenvolvedorBeingDelete(desenvolvedor);
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    //
    setIsDeleteModalVisible(false);
    setDesenvolvedorBeingDelete(null);
  }

  async function handleConfirmDeleteDesenvolvedor() {
    //
    try {
      setIsLoadingDelete(true);
      await DesenvolvedoresService.deleteDesenvolvedores(desenvolvedorBeingDelete.id);
      toast({
        type: 'success',
        text: 'Desenvolvedor deletado com sucesso!',
        duration: 1000,
      });

      handleCloseDeleteModal();
      setDesenvolvedores((prevState) => prevState.filter(
        (desenvolvedor) => desenvolvedor.id !== desenvolvedorBeingDelete.id,

      ));
    } catch {
      toast({
        type: 'danger',
        text: 'ocorreu um erro ao deletar o Desenvolvedor!',
        duration: 2000,
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }
  return (
    <Container>
      <Loader isLoading={isLoading} />
      <Modal
        danger
        visible={isDeleteModalVisible}
        isLoading={isLoadingDelete}
        title={`Tem certeza que deseja remover o Desenvolvedor ${desenvolvedorBeingDelete?.name}?`}
        confirmLabel="Deletar"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteDesenvolvedor}
      >
        <h2>
          Essa operação não poderar ser desfeita
        </h2>
      </Modal>
      {desenvolvedores.length > 0 && (
        <InputSearchContainer>
          <input
            value={termoBusca}
            type="text"
            placeholder="Pesquisar"
            onChange={handlerBuscaPorNome}
          />
        </InputSearchContainer>
      )}

      <Header
        justifyContent={
            // eslint-disable-next-line no-nested-ternary
            hasError
              ? 'flex-end'
              : (
                desenvolvedores.length > 0
                  ? 'space-between'
                  : 'center'
              )
          }
      >
        {(!hasError && desenvolvedores.length > 0) && (
        <strong>
          {filteredDesenvolvedores.length}
          {' '}
          {filteredDesenvolvedores.length === 1 ? ' Desenvolvedor' : ' Desenvolvedores'}
        </strong>
        )}
        <Link to="/desenvolvedores/new">Novo Desenvolvedor</Link>
      </Header>

      {hasError && (
        <ErroContainer>
          <img src={triste} alt="Erro" width="100" />
          <div className="details">
            <strong>Ocorreu um erro ao obter dados dos seus Desenvolvedores</strong>

            <Button type="button" onClick={handlerCarregaNovamente}>Tentar novamente</Button>
          </div>
        </ErroContainer>
      )}

      {!hasError && (
      <>
        {(desenvolvedores.length < 1 && !isLoading) && (
        <EmptyListContainer>
          <img src={Vazio} alt="Nenhum usuario cadastrado" width="150" />
          <p>
            Voce ainda não tem nenhum Desenvolvedor cadastrado!
            Clique no botão <strong>"Novo Desenvolvedor"</strong> à cima
            para cadastrar o seu primeiro!
          </p>
        </EmptyListContainer>
        )}

        {(filteredDesenvolvedores.length < 1
        && filteredDesenvolvedores.length > 1 && !isLoading) && (
        <EmptyBuscaContainer>
          <img src={NaoAchou} alt="Consulta vazia" width="75" />
          <p>
            Nenhum resultado foi encontrado para <strong>{termoBusca}</strong>.
          </p>
        </EmptyBuscaContainer>
        )}

        {filteredDesenvolvedores.length > 0 && (
        <ListHeader>
          <button type="button" onClick={handleAlternaOrderDesenvolvedor}>
            <span>Nome</span>
            <img src={short} alt="Short" height="20px" />
          </button>
        </ListHeader>
        )}
        { filteredDesenvolvedores.map((desenvolvedor) => (
          <Card key={desenvolvedor.id}>
            <div className="info">
              <div className="desenvolvedor-name">
                <strong>
                  {desenvolvedor.name}
                </strong>
                {desenvolvedor.niveis_descricao && (
                <small>{desenvolvedor.niveis_descricao}</small>
                )}
              </div>
              <span>{desenvolvedor.email} - {desenvolvedor.idade} Anos</span>
              <span>{desenvolvedor.hobby}</span>

            </div>
            <div className="actions">
              <Link to={`/desenvolvedores/edit/${desenvolvedor.id}`}>
                <img src={edit} alt="Editar" height="20px" />
              </Link>
              <button type="button" onClick={() => handleDeleteDesenvolvedor(desenvolvedor)}>
                <img src={del} alt="Deletar" height="20x" />
              </button>
            </div>
          </Card>
        ))}
      </>
      )}
    </Container>
  );
}
