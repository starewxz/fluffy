
import { useInView } from 'react-intersection-observer';  // Importing Intersection Observer
import '../ImgGrid.css';
import dataSlippers from '../data.js';
import PropTypes from "prop-types";

function ImgGrid({ openModal }) {

    // Image Component
    const ImageItem = ({ slipperData }) => {
        const { ref, inView } = useInView({
            threshold: 0.25,    // Start animation when 25% of the image is visible
        });

        return (
            <div
                ref={ref}
                className={`grid-item ${inView ? 'visible' : ''}`} // Add 'visible' class when in view
            >
                <img src={slipperData.img} alt={slipperData.name} />
                <button className="grid-btn" onClick={() => openModal(slipperData)}>Замовити</button>
            </div>
        );
    };

    return (
        <div className="grid-container">
            {dataSlippers.map((slipper) => (
                <ImageItem key={slipper.id} slipperData={slipper} />
            ))}
        </div>
    );
}

ImgGrid.propTypes = {
    openModal: PropTypes.func.isRequired,  // closeModal має бути функцією
    slipperData: PropTypes.shape({      // selectedSlipper - це об'єкт з певними властивостями
        name: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
    }).isRequired,
};

export default ImgGrid;
