import './App.css';
import {page_1_1, page_1_2, page_2_1, page_3_1} from './components/index';
import Home from './components/Home';

function App() {
  const pages = {
    "tab1": [page_1_1(), page_1_2()],
    "tab2": [page_2_1()],
    "tab3": [page_3_1()]
  }
  return (
    <div className="App">
      <Home pages={pages}/>
    </div>
  );
}

export default App;
