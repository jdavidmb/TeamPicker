import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; // selección líder
import BomboPage1 from './pages/BomboPage1'; // para bombo 2, 3 y 4
import BomboPage2 from './pages/BomboPage2'; // para bombo 2, 3 y 4
import BomboPage3 from './pages/BomboPage3'; // para bombo 2, 3 y 4
import EquiposPage from './pages/EquiposPage'; // vista de equipos

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/bombo1/:nombre" element={<BomboPage1 />} />
      <Route path="/bombo2" element={<BomboPage2 />} />
      <Route path="/bombo3" element={<BomboPage3 />} />
      <Route path="/equipos" element={<EquiposPage />} />
    </Routes>
  );
}
export { App };