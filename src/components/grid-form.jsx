import {useInView} from "react-intersection-observer";
import {useState} from "react";
import PropTypes from "prop-types";
import {useEffect} from "react";

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
            className={`grid-item ${inView ? 'visible' : ''}`} // Add 'visible' class when in view
        >
            <img className={"grid-img"} onClick={() => openModal(slipperData, selectorValue)} src={slipperData.img} alt={slipperData.name} loading="lazy"/>
            {/* <select className="selector" value={selectorValue}
                        onChange={(e) => setSelectorValue(Number(e.target.value))}>
                    {[...Array(10)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>{index + 1}</option>
                    ))}
                </select> */}
            <p className="cost-p">{slipperData.cost}</p>
            {/* <button className="grid-btn" onClick={() => openModal(slipperData, selectorValue)}>Замовити</button> */}
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