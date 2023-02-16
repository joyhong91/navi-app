import { useEffect, useRef, useState } from "react";
import ContentComponent, { IContentProps } from "./ContentComponent";
import { getHistory, getHistoryByTab, getLastHistoryByTab, isHistoryEmpty, setHistoryStorage } from './History';

interface TabProps {
    tabList: string[]
    contents: JSX.Element[][]
    name: string
}

const TabComponent = ({ tabList, contents, name }: TabProps) => {
    const storedMainTab = localStorage.getItem(`${name}-tab`);
    const contentRef = useRef<IContentProps>(null);
    const [tab, setTab] = useState<number>(Number(storedMainTab) || 0);
    const [activeHistoryBtn, setActiveHistoryBtn] = useState(false);

    useEffect(() => {
        let storedHistory = getHistory(name);

        if (Object.keys(storedHistory).length === 0 && storedHistory.constructor === Object) {
            storedHistory = tabList.reduce((a, v) => ({ ...a, [v]: [] }), {});
            localStorage.setItem(`${name}-cont-history`, JSON.stringify(storedHistory));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(`${name}-tab`, tab.toString());
        if (contentRef.current) {
            contentRef.current.handleContentByTab(tab);
        }
    }, [tab]);

    const showHistoryBtn = () => {
        if (isHistoryEmpty(tab, name)) {
            setActiveHistoryBtn(false);
            return;
        }

        setActiveHistoryBtn(true);
    }
    const goBack = () => {
        if (!contentRef.current) {
            return;
        }

        contentRef.current.goBackContent();
        showHistoryBtn();
    }
    return <>
        <button onClick={goBack} className={activeHistoryBtn ? 'btn-history active' : 'btn-history'}>뒤로가기</button>
        <ul className="content-header">
            {tabList.map((item, index) => (
                <li
                    key={index}
                    className={tab === index ? "active" : ""}
                    onClick={() => setTab(index)}
                >
                    <button>{item}</button>
                </li>
            ))}
        </ul>

        <ContentComponent ref={contentRef} props={{name,contents,showHistoryBtn}} />
    </>
}

export default TabComponent;