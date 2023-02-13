import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

export interface ICompoProps {
    handleComponent: (tab: number) => void;
}

type Props= {"props": any};
const Content = forwardRef<ICompoProps, Props>(({props}, ref) => {
    const storedSubTab = localStorage.getItem('sub-index');
    const [subTab, setSubTab] = useState<number>(Number(storedSubTab) || 0);
    const [contents, setContents] = useState<JSX.Element[]>([]);

    useImperativeHandle(ref, () => ({
        handleComponent: (tab) => {
            const content = props[`tab${tab+1}`];
            if(content.length === 1) {
                setSubTab(0);
            } 
            setContents(content);
        },
    }))

    useEffect(() => {
        localStorage.setItem('sub-index', subTab.toString());
    }, [subTab]);

    return <>
        <div className="content">
            {
                contents.length > 1 ?
                    <button onClick={() => { setSubTab(subTab - 1) }}>이전</button> :
                    null
            }
            <div>{contents[subTab]}</div>

            {
                contents.length > 1 ?
                    <button onClick={() => { setSubTab(subTab + 1) }}>다음</button> :
                    null
            }
        </div>
    </>
})

export default Content;