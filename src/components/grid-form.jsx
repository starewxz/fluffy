import {useInView} from "react-intersection-observer";
import {useState, useEffect} from "react";
import PropTypes from "prop-types";

function GridForm({openModal, slipperData, resetSignal, category}) {

    const [selectorValue, setSelectorValue] = useState(1);

    const { ref, inView } = useInView({
        threshold: 0.30,    // Start animation when 30% of the image is visible
    });

    useEffect(() => {
        setSelectorValue(1);
    }, [resetSignal, category]);

    return (
        <div
            ref={ref}
            className={`grid-item ${inView ? 'visible' : ''}`}
        >
            <div className="image-wrapper">
                <img
                    className={`grid-img ${!slipperData.available ? "disabled" : ""}`}
                    onClick={() => { if (slipperData.available) openModal(slipperData, selectorValue)}}
                    src={slipperData.img}
                    alt={slipperData.name}
                    loading="lazy"/>
                {!slipperData.available && (
                    <div className="unavailable-overlay">
                        <div className="cross-line"></div>
                        <div className="cross-line reverse"></div>
                    </div>
                )}
            </div>
            <p className="cost-p">{slipperData.cost}</p>
            <p className={`grid-p ${!slipperData.available ? "disabled" : ""}`} onClick={() => { if (slipperData.available) openModal(slipperData, selectorValue)}}>- {slipperData.name}</p>
            <p
                className={`availability-text ${
                    slipperData.available ? "available" : "unavailable"
                }`}
            >
                {slipperData.available ? " є в наявності" : " немає в наявності"}
            </p>
        </div>
    );
}

GridForm.propTypes = {
    openModal: PropTypes.func.isRequired,
    resetSignal: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    slipperData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        cost: PropTypes.number.isRequired,
        available: PropTypes.bool.isRequired,
    }).isRequired,
}

export default GridForm;