import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Landing from './components/Landing/Landing.jsx';
import Armado from './components/Armado/Armado.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Footer from './components/Footer/Footer.jsx';
import Eventos from './components/Eventos/Eventos.jsx';
import Servicios from './components/Servicios/Servicios.jsx';
import Nosotros from './components/Nosotros/Nosotros.jsx';
import Contacto from './components/Contacto/Contacto.jsx';

function App() {
  return (
    <>
      <Header />
      <ScrollToTop />
      <main>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/pedido" element={<Armado />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;