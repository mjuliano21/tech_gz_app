import { Link } from 'react-router-dom';
import { Container } from './styles';

import logo from '../../assets/images/logo.svg';

export default function Header() {
  return (
    <Container>
      <img src={logo} alt="Gazin Tech" width="300" />
      <div className="menu">
        <Link to="/">Desenvolvedores</Link>
        <Link to="/niveis">Niveis</Link>
      </div>
    </Container>
  );
}
