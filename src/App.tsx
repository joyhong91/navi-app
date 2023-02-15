import './App.css';
import page_1_1 from "./components/MainCompo/1/one";
import page_1_2 from "./components/MainCompo/1/two";
import page_2_1 from "./components/MainCompo/2/one";
import page_3_1 from "./components/MainCompo/3/one";
import page_3_2 from "./components/MainCompo/3/two";
import page_3_3 from "./components/MainCompo/3/three";
import TabComponent from './components/Template/TabComponent';

function App() {
  const pages = {
    "tab1": [page_1_1(), page_1_2()],
    "tab2": [page_2_1()],
    "tab3": [page_3_1(), page_3_2(), page_3_3()]
  }

  return (
    <div className="App">
      <TabComponent tabList={Object.keys(pages)} contents={Object.values(pages)} name="main"/>
    </div>
  );
}

export default App;
