import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jsonData from '../../db/data.json';
import FadeInOut from "../transition/FadeInOut";

export default function Detail() {
    const navigate = useNavigate();
    const { page } = useParams();
    const [currentPage, setCurrentPage] = useState(Number(page));
    const [touchPosition, setTouchPosition] = useState(null)

    const pages = jsonData.pages;
    const [FIRST_PAGE, MAX_PAGE] = [1, pages.length];
    const detail = pages.find(item => item.page === currentPage);

    const [show, setShow] = useState(false);

    const moveToPage = (dir: number) => {
        const newPage = dir === 1 ? currentPage + 1 : currentPage - 1;
        setCurrentPage(newPage);
    };

    const handleTouchStart = (e: any) => {
        const touchDown = e.touches[0].clientX;
        setTouchPosition(touchDown)
    }

    const handleTouchMove = (e: any) => {
        const touchDown = touchPosition

        if (touchDown === null) {
            return
        }

        const currentTouch = e.touches[0].clientX
        const diff = touchDown - currentTouch

        if (diff > 5 && currentPage < MAX_PAGE) {
            moveToPage(1);
        }

        if (diff < -5 && currentPage > FIRST_PAGE) {
            moveToPage(-1);
        }

        setTouchPosition(null)
    }

    useEffect(() => {
        navigate(`/${currentPage}`);
    }, [currentPage]);

    useEffect(() => {
    }, [])

    return (
        <FadeInOut show={show} duration={500}>
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
                            ? <button type="button" className="btn-nav" onClick={() => { moveToPage(1) }}>다음</button>
                            : null
                    }
                </div>
            </div>
        </FadeInOut>
    )

}