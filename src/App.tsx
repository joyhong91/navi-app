import './App.css';

import Home from './components/pages/Home';
import Detail from './components/pages/Detail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:page" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
