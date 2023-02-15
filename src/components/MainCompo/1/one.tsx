import page_1_1 from "../../SubCompo/1/one";
import page_1_2 from "../../SubCompo/1/two";
import page_2_1 from "../../SubCompo/2/one";
import TabComponent from "../../Template/TabComponent";

const One = () => {
    const pages = {
        "subTab1": [page_1_1(), page_1_2()],
        "subTab2": [page_2_1()]
      }

    return <>
        <h1>Main Tab1 Component<br/>Tab1-1</h1>
        <TabComponent tabList={Object.keys(pages)} contents={Object.values(pages)} name="sub"/>
    </>
}

export default One;