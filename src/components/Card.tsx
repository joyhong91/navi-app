const Card = () => {
    const DEFAULT_IMAGE="https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg";
    return <>
        <div className="card-header">
            <img alt="card image" src={DEFAULT_IMAGE}/>
        </div>
        <div className="card-body">
            <p> card title </p>
        </div>
    </>
}

export default Card;