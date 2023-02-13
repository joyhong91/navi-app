import { useRef, useEffect, useState } from 'react';
import Content, { ICompoProps } from '../components/Content';

interface IPagesProp {
    pages: { 
        tab1: JSX.Element[] 
    }
}
export default function Home({ pages }: any) {
    const compoRef = useRef<ICompoProps>(null);
    const storedMainTab = localStorage.getItem('main-index');
    const [tab, setTab] = useState<number>(Number(storedMainTab) || 0);
    
    useEffect(() => {
        localStorage.setItem('main-index', tab.toString());
        if (compoRef.current) {
            compoRef.current.handleComponent(tab);
        }
    }, [tab]);

    return <>
        <ul className="content-header">
            {Object.keys(pages).map((tabItem, index) => {
                return (
                    <li
                        key={index}
                        className={tab === index ? "active" : ""}
                        onClick={() => setTab(index)}
                    >
                        <button>{tabItem}</button>
                    </li>
                )
            })}
        </ul>

        <Content ref={compoRef} props={pages} />
    </>
}