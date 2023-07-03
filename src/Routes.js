// import { Switch, Route } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Niveis from './pages/Niveis';
import NewDesenvolvedor from './pages/Desenvolvedores/NewDesenvolvedor';
import EditDesenvolvedor from './pages/Desenvolvedores/EditDesenvolvedor';
import NewNivel from './pages/Niveis/NewNivel';
import EditNivel from './pages/Niveis/EditNivel';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home customProp="customPropValue" />} />
      <Route path="/desenvolvedores/new" element={<NewDesenvolvedor />} />
      <Route path="/desenvolvedores/edit/:id" element={<EditDesenvolvedor />} />
      <Route path="/niveis/" element={<Niveis />} />
      <Route path="/niveis/new" element={<NewNivel />} />
      <Route path="/niveis/edit/:id" element={<EditNivel />} />

    </Routes>
  );
}
