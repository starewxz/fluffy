

function Carousel() {
    return (
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="/Img/dog-img.JPG" className="d-block w-100" alt="Dog Slippers"/>
                </div>
                <div className="carousel-item">
                    <img src="/Img/unicorn-img.JPG" className="d-block w-100" alt="Unicorn Slippers"/>
                </div>
                <div className="carousel-item">
                    <img src="/Img/cow-img.JPG" className="d-block w-100" alt="Cow Slippers"/>
                </div>
                <div className="carousel-item">
                    <img src="/Img/giraffe-img.JPG" className="d-block w-100" alt="Giraffe Slippers"/>
                </div>
                <div className="carousel-item">
                    <img src="/Img/goat-img.JPG" className="d-block w-100" alt="Goat Slippers"/>
                </div>
                <div className="carousel-item">
                    <img src="/Img/bear-img.JPG" className="d-block w-100" alt="Bear Slippers"/>
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