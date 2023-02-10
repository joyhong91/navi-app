import './App.css';

import Home from './components/Home';
import Detail from './components/Detail';
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
