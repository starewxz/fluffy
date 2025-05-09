

function Carousel() {
    return (
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={`${import.meta.env.BASE_URL}img/dog-img.JPG`} className="d-block w-100" alt="Dog Slippers"/>
                </div>
                <div className="carousel-item">
                    <img src={`${import.meta.env.BASE_URL}img/unicorn-img.JPG`} className="d-block w-100" alt="Unicorn Slippers"/>
                </div>
                <div className="carousel-item">
                    <img src={`${import.meta.env.BASE_URL}img/cow-img.JPG`} className="d-block w-100" alt="Cow Slippers"/>
                </div>
                <div className="carousel-item">
                    <img src={`${import.meta.env.BASE_URL}img/giraffe-img.JPG`} className="d-block w-100" alt="Giraffe Slippers"/>
                </div>
                <div className="carousel-item">
                    <img src={`${import.meta.env.BASE_URL}img/goat-img.JPG`} className="d-block w-100" alt="Goat Slippers"/>
                </div>
                <div className="carousel-item">
                    <img src={`${import.meta.env.BASE_URL}img/bear-img.JPG`} className="d-block w-100" alt="Bear Slippers"/>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
                    data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
                    data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}



export default Carousel;