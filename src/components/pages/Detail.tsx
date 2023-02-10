import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import jsonData from '../../db/data.json';

type StyleProps = {
    style: React.CSSProperties;
}
export default function Detail({style}:StyleProps) {
    const navigate = useNavigate();
    const directionClassName = useRef('right');
    const { page } = useParams();
    const [currentPage, setCurrentPage] = useState(Number(page));
    const [touchPosition, setTouchPosition] = useState(null)
    
    const pages = jsonData.pages;
    const [FIRST_PAGE, MAX_PAGE] = [1, pages.length];
    const detail = pages.find(item => item.page === currentPage);

    const moveToPage = (direction: number) => {
        let newPage;
        if(direction === 1) {
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

        if (diff < -5 && currentPage > FIRST_PAGE) {
            directionClassName.current = 'left';
            moveToPage(-1);
        }

        setTouchPosition(null);
    }

    useEffect(() => {
        navigate(`/${currentPage}`, {
            state: { slideDirection: directionClassName.current}
        });
    }, [currentPage]);

    return (
        <div className="content" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
            <div className="content__header">
                {
                    currentPage > FIRST_PAGE
                        ? <button type="button" className="btn-nav" onClick={() => { moveToPage(-1) }}>뒤로가기</button>
                        : null
                }
                <h1> {detail?.title} </h1>
            </div>
            <div className="content__body">
                <p> {detail?.desc} </p>
                {
                    currentPage < MAX_PAGE
                        ? <Link to="#" onClick={()=> {moveToPage(1)}}>Go to {currentPage+1}</Link>
                        : null
                }
            </div>
        </div>
    )

}