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
            <img className={"grid-img"} onClick={() => openModal(slipperData, selectorValue)} src={slipperData.img} alt={slipperData.name} loading="lazy"/>
            <p className="cost-p">{slipperData.cost}</p>
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
    }).isRequired,
}

export default GridForm;