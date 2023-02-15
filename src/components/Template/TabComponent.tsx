import { useEffect, useRef, useState } from "react";
import ContentComponent, { IContentProps } from "./ContentComponent";

interface TabProps {
    tabList: string[],
    contents: JSX.Element[][],
    name: string
}

const TabComponent = ({ tabList, contents, name }: TabProps) => {
    const storedMainTab = localStorage.getItem(`${name}-tab`);
    const contentRef = useRef<IContentProps>(null);
    const [tab, setTab] = useState<number>(Number(storedMainTab) || 0);

    useEffect(() => {
        localStorage.setItem(`${name}-tab`, tab.toString());
        if (contentRef.current) {
            contentRef.current.handleContentByTab(tab);
        }
    }, [tab]);

    return <>
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

        <ContentComponent ref={contentRef} props={[contents, tabList, name]}/>
    </>
}

export default TabComponent;