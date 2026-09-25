import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Landing from './components/Landing/Landing.jsx';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route exact path="/" element={<Landing />} />
        </Routes>
      </main>
    </>
  );
}

export default App;