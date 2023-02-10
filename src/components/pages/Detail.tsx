import data from '../../db/data.json';

import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export default function Detail() {
    const navigate = useNavigate();
    const directionClassName = useRef('right');
    const { page } = useParams();
    const [currentPage, setCurrentPage] = useState(Number(page));
    const [touchPosition, setTouchPosition] = useState(null);
    

    const pages = data.pages;
    const [FIRST_PAGE, MAX_PAGE] = [1, pages.length];
    const detail = pages.find(item => item.page === currentPage);

    const moveToPage = (direction: number) => {
        let newPage;
        if (direction === 1) {
            newPage = currentPage + 1;
            directionClassName.current = 'right';
        } else {
            newPage = currentPage - 1;
            directionClassName.current = 'left';
        }
        setCurrentPage(newPage);
    };

    const handleTouchStart = (event: any) => {
        const touchDown = event.touches[0].clientX;
        setTouchPosition(touchDown);
    }

    const handleTouchMove = (event: any) => {
        const touchDown = touchPosition;

        if (touchDown === null) {
            return;
        }

        const currentTouch = event.touches[0].clientX;
        const diff = touchDown - currentTouch;
        
        if (diff > 5 && currentPage < MAX_PAGE) {
            directionClassName.current = 'right';
            moveToPage(1);
        }

        if (diff < -5 && currentPage >= FIRST_PAGE) {
            if(currentPage === FIRST_PAGE) {
                navigate("/");
                return;
            }

            directionClassName.current = 'left';
            moveToPage(-1);
        }

        setTouchPosition(null);
    }

    useEffect(() => {
        navigate(`/${currentPage}`);
    }, [currentPage]);

    return (
        <div className="App-body">
            <div className="App-btn-wrapper">
                {
                    currentPage > FIRST_PAGE
                        ? <Link to="#" onClick={() => { moveToPage(-1) }}> &lt; Go Back {currentPage - 1}</Link>
                        : <Link to="/"> &#60; Home</Link>
                }
            </div>
            <TransitionGroup className="transitions-wrapper">
                <CSSTransition key={currentPage} classNames={directionClassName.current} timeout={500}>
                    <div className="content" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
                        <div className="content-header">
                            <h1> {detail?.title} </h1>
                        </div>
                        <div className="divider"></div>
                        <div className="content-body">
                            <p> {detail?.desc} </p>
                            {
                                currentPage < MAX_PAGE
                                    ? <Link to="#" onClick={() => { moveToPage(1) }}>Go to {currentPage + 1} &gt;</Link>
                                    : null
                            }
                        </div>
                    </div>
                </CSSTransition>
            </TransitionGroup>
        </div>
    )

}