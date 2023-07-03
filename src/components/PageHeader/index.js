import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import retorna from '../../assets/images/icons/return.svg';

import { Container } from './styles';

export default function PageHeader({ title }) {
  return (
    <Container>
      <Link to="/">
        <img src={retorna} alt="Home" height="15px" />
        <span>Voltar</span>
      </Link>
      <h1>{title}</h1>
    </Container>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
