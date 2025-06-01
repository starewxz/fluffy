
import '../../styles/catalog.css';
import dataSlippers from '../data-slippers.js';
import PropTypes from "prop-types";
import {motion} from "framer-motion";
import GridForm from "./grid-form.jsx";
import {useState} from "react";
import dataSocks from "../data-socks.js";

function Catalog({ openModal, resetSignal}) {
    const [category, setCategory] = useState('slippers');

    const handleCategoryChange = (selectedCategory) => {
        setCategory(selectedCategory);
    };

    const categoryData = category === 'slippers' ? dataSlippers : dataSocks;




    return (
        <>
            <motion.div
                className="catalog-btn"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <button className={`${category === 'slippers' ? "slippers-active" : ""}`} onClick={() => handleCategoryChange('slippers')}><img className="slippers-png" src={`${import.meta.env.BASE_URL}img/slippers.png`} alt='slippers button'/></button>
                <p><img src={`${import.meta.env.BASE_URL}public/img/line.png`} alt='border line'/></p>
                <button className={`${category === 'socks' ? "socks-active" : ""}`} onClick={() => handleCategoryChange('socks')}><img className="sock-png" src={`${import.meta.env.BASE_URL}img/sock.png`} alt="socks button"/></button>
            </motion.div>

            <div className="grid-container">
                {categoryData.map((slipper) => (
                    <GridForm key={slipper.id} slipperData={slipper} openModal={openModal} resetSignal={resetSignal} category={category}  />
                ))}
            </div>
        </>
    );
}

Catalog.propTypes = {
    openModal: PropTypes.func.isRequired,
    resetSignal: PropTypes.func.isRequired,
    slipperData: PropTypes.shape({      // selectedSlipper - це об'єкт з певними властивостями
        name: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
    }).isRequired,
};

export default Catalog;
