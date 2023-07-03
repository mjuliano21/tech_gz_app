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
import NiveisService from '../../services/NiveisService';

import short from '../../assets/images/icons/sort.svg';
import edit from '../../assets/images/icons/edit.svg';
import del from '../../assets/images/icons/delete.svg';
import triste from '../../assets/images/triste.png';
import Button from '../../components/Button';
import Vazio from '../../assets/images/icons/vazio.png';
import NaoAchou from '../../assets/images/icons/nao_achou.svg';

import Modal from '../../components/Modal';
import toast from '../../utils/toast';

export default function Nivel() {
  const [niveis, setNiveis] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [termoBusca, setTermoBusca] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [nivelBeingDelete, setNivelBeingDelete] = useState(null);

  const filteredNiveis = useMemo(() => niveis.filter((nivel) => (
    nivel.descricao.toLowerCase().includes(termoBusca.toLowerCase())
  )), [niveis, termoBusca]);

  const loadNiveis = useCallback(async () => {
    try {
      setIsLoading(true);

      const niveisList = await NiveisService.listNiveis(orderBy);
      setNiveis(niveisList);
      setHasError(false);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadNiveis();
  }, [loadNiveis]);

  function handleAlternaOrderNivel() {
    setOrderBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
    );
  }

  async function handlerBuscaPorNome(event) {
    setTermoBusca(event.target.value);
    const niveisList = await NiveisService.listNiveis(orderBy);
    setNiveis(niveisList);
  }

  function handlerCarregaNovamente() {
    loadNiveis();
  }

  function handleDeleteNivel(nivel) {
    //
    setNivelBeingDelete(nivel);
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    //
    setIsDeleteModalVisible(false);
    setNivelBeingDelete(null);
  }

  async function handleConfirmDeleteNivel() {
    //
    try {
      setIsLoadingDelete(true);
      await NiveisService.deleteNiveis(nivelBeingDelete.id);
      toast({
        type: 'success',
        text: 'Nível deletado com sucesso!',
        duration: 1000,
      });

      handleCloseDeleteModal();
      setNiveis((prevState) => prevState.filter(
        (nivel) => nivel.id !== nivelBeingDelete.id,

      ));
    } catch (Error) {
      if (Error.name === 'APIError') {
        Error.message = 'Ocorreu um erro ao deletar o Nível!';
      }

      toast({
        type: 'danger',
        text: `${Error.message}`,
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
        title={`Tem certeza que deseja remover o Nível ${nivelBeingDelete?.descricao}?`}
        confirmLabel="Deletar"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteNivel}
      >
        <h2>
          Essa operação não poderar ser desfeita
        </h2>
      </Modal>
      {niveis.length > 0 && (
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
                niveis.length > 0
                  ? 'space-between'
                  : 'center'
              )
          }
      >
        {(!hasError && niveis.length > 0) && (
        <strong>
          {filteredNiveis.length}
          {' '}
          {filteredNiveis.length === 1 ? ' Nível' : ' Níveis'}
        </strong>
        )}
        <Link to="/niveis/new">Novo Nível</Link>
      </Header>

      {hasError && (
        <ErroContainer>
          <img src={triste} alt="Erro" width="100" />
          <div className="details">
            <strong>Ocorreu um erro ao obter dados dos seus Níveis</strong>

            <Button type="button" onClick={handlerCarregaNovamente}>Tentar novamente</Button>
          </div>
        </ErroContainer>
      )}

      {!hasError && (
      <>
        {(niveis.length < 1 && !isLoading) && (
        <EmptyListContainer>
          <img src={Vazio} alt="Nenhum nível cadastrado" width="150" />
          <p>
            Voce ainda não tem nenhum Nível cadastrado!
            Clique no botão <strong>"Novo Nível"</strong> à cima
            para cadastrar o seu primeiro!
          </p>
        </EmptyListContainer>
        )}

        {(filteredNiveis.length < 1
        && filteredNiveis.length > 1 && !isLoading) && (
        <EmptyBuscaContainer>
          <img src={NaoAchou} alt="Consulta vazia" width="75" />
          <p>
            Nenhum resultado foi encontrado para <strong>{termoBusca}</strong>.
          </p>
        </EmptyBuscaContainer>
        )}

        {filteredNiveis.length > 0 && (
        <ListHeader>
          <button type="button" onClick={handleAlternaOrderNivel}>
            <span>Descrição</span>
            <img src={short} alt="Short" height="20px" />
          </button>
        </ListHeader>
        )}
        { filteredNiveis.map((nivel) => (
          <Card key={nivel.id}>
            <div className="info">
              <div className="desenvolvedor-name">
                <strong>
                  {nivel.descricao}
                </strong>
                {nivel.qtd_dev > 0 && (
                <small>{nivel.qtd_dev} DEV'S</small>
                )}
              </div>
            </div>
            <div className="actions">
              <Link to={`/niveis/edit/${nivel.id}`}>
                <img src={edit} alt="Editar" height="20px" />
              </Link>
              <button type="button" onClick={() => handleDeleteNivel(nivel)}>
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
