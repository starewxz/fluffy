import dataSlippers from '../data-slippers.js';
function Carousel() {
    return (
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                {dataSlippers.map((item, index) => (
                    <div
                        className={`carousel-item${index === 0 ? ' active' : ''}`}
                        key={item.id}
                    >
                        <img
                            src={item.img}
                            className="d-block w-100"
                            alt={item.name}
                        />
                    </div>
                ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
                    data-bs-slide="prev">
                <span className="carousel-prev-icon" aria-hidden="true">
                    <img alt={"previous"} src={`${import.meta.env.BASE_URL}img/right-arrow.png`} style={{transform: 'scaleX(-1)'}}/></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
                    data-bs-slide="next">
                <span className="carousel-next-icon" aria-hidden="true">
                    <img alt={"next"} src={`${import.meta.env.BASE_URL}img/right-arrow.png`}/></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}


export default Carousel;