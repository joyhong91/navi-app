import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

export interface IContentProps {
    handleContentByTab: (tab: number) => void
}

interface Props {
    props: [JSX.Element[][], string[], string]
}

const getStoredTabInfo = (tabList: string[], name: string) => {
    let storedTab = JSON.parse(localStorage.getItem(`${name}-sub-tab`) || '{}');

    if (!storedTab) {
        storedTab = tabList.reduce((a, v) => ({ ...a, [v]: 0 }), {});
        localStorage.setItem(`${name}-sub-tab`, JSON.stringify(storedTab));
    }

    return storedTab;
}

const ContentComponent = forwardRef<IContentProps, Props>(({ props }, ref) => {
    const [contentLists, tabList, name] = props;
    const subTabStorage = getStoredTabInfo(tabList, name);
    const [tab, setTab] = useState(0);
    const [subTab, setSubTab] = useState(subTabStorage[Object.keys(subTabStorage)[tab]]);
    const [contents, setContents] = useState(contentLists[tab]);

    useImperativeHandle(ref, () => ({
        handleContentByTab: (tab) => {
            setTab(tab);
            setSubTab(subTabStorage[Object.keys(subTabStorage)[tab]]);
            setContents(contentLists[tab]);
        },
    }));

    useEffect(() => {
        subTabStorage[Object.keys(subTabStorage)[tab]] = subTab;
        localStorage.setItem(`${name}-sub-tab`, JSON.stringify(subTabStorage));
    }, [subTab]);

    return <>
        <div className="content-body">
            {
                contents.length > 1 && subTab > 0 ?
                    <button className="btn-nav left" onClick={() => { setSubTab(subTab - 1) }}>이전</button> :
                    null
            }
            {
                <TransitionGroup className="content-wrapper">
                    <CSSTransition key={subTab} classNames='fade' timeout={500}>
                        <div className="content">{contents[subTab]}</div>
                    </CSSTransition>
                </TransitionGroup>

            }
            {
                contents.length >= 1 && subTab + 1 < contents.length ?
                    <button className="btn-nav right"  onClick={() => { setSubTab(subTab + 1) }}>다음</button> :
                    null
            }
        </div>
    </>
})

export default ContentComponent;