import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { forwardRef, useImperativeHandle, useState } from "react";
import { getHistoryByTab, getLastHistoryByTab, isHistoryEmpty, setHistoryStorage } from './History';

export interface IContentProps {
    handleContentByTab: (tab: number) => void
    goBackContent: () => void
}
interface Props {
    props: {
        name: string
        contents: JSX.Element[][]
        showHistoryBtn: () => void
    }
}

const ContentComponent = forwardRef<IContentProps, Props>(({ props }, ref) => {
    const [tab, setTab] = useState(0);
    const [contents, setContents] = useState(props.contents[tab]);
    const [contentIndex, setContentIndex] = useState(0);
    const [histories, setHistories] = useState(getHistoryByTab(tab, props.name))

    useImperativeHandle(ref, () => ({
        handleContentByTab: (tab) => {
            setTab(tab);
            setContents(props.contents[tab]);

            if (isHistoryEmpty(tab, props.name)) {
                setContentIndex(0);
            } else {
                setContentIndex(getLastHistoryByTab(tab, props.name) + 1);
            }

            setHistories(getHistoryByTab(tab, props.name))
            props.showHistoryBtn();
        },
        goBackContent: () => {
            if (isHistoryEmpty(tab, props.name)) {
                return;
            }

            const targetPage = histories.pop();

            setContentIndex(targetPage);
            setHistories(histories);
            setHistoryStorage(tab, props.name, histories);
        }
    }));

    const moveToComponent = () => {
        setContentIndex(contentIndex + 1);

        const storedHistories = [...getHistoryByTab(tab, props.name)];
        storedHistories.push(contentIndex);

        setHistoryStorage(tab, props.name, storedHistories);
        setHistories(storedHistories);

        props.showHistoryBtn();
    }

    return <>
        <div className="content-body">
            <ul className="content-list">
                {contents.map((item, index) => (
                    <li
                        key={index}
                        className={contentIndex === index ? "active" : ""}
                    >
                        {item}
                    </li>
                ))}
            </ul>

            {
                contents.length >= 1 && contentIndex + 1 < contents.length ?
                    <button className="btn-nav right" onClick={moveToComponent}>다음</button> :
                    null
            }
        </div>
    </>
})

export default ContentComponent;