import './App.css';
import FirstTab1 from "./components/Pages/FirstTab/FirstTab1";
import SecondTab1 from "./components/Pages/FirstTab/SecondTab1";
import FirstTab2 from "./components/Pages/SecondTab/FirstTab2";
import SecondTab2 from "./components/Pages/SecondTab/SecondTab2";
import ThirdTab2 from "./components/Pages/SecondTab/ThirdTab2";

import TabComponent from './components/Template/TabComponent';


function App() {
  const pages = {
    "tab1": [<FirstTab1/>, <SecondTab1/>],
    "tab2": [<FirstTab2/>,<SecondTab2/>,<ThirdTab2/>]
  }

  return (
    <div className="App">
      <TabComponent tabList={Object.keys(pages)} contents={Object.values(pages)} name="main"/>
    </div>
  );
}

export default App;
