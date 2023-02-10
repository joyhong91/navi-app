import './App.css';

import Header from './components/pages/Header';
import Home from './components/pages/Home';
import Detail from './components/pages/Detail';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


function App() {
  const location = useLocation();
  const slideDirection = location.state ? location.state.slideDirection : 'right';
  return (
    <div className="App">
      <Header />
      <TransitionGroup className="transitions-wrapper">
        <CSSTransition key={location.pathname} classNames={slideDirection} timeout={500}>
          <Routes>
            <Route path="/" element={<Home style={{ position: 'absolute' }} />} />
            <Route path="/:page" element={<Detail style={{ position: 'absolute' }} />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
