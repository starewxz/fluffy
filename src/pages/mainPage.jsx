import {useEffect, useState} from "react";
import Carousel from "../components/carousel.jsx";
import {motion} from "framer-motion";
import Catalog from "../components/catalog.jsx";
import Modal from "../components/modal.jsx";
import Footer from "../components/footer.jsx";
import "/styles/app.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function MainPage() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSlipper, setSelectedSlipper] = useState(null);
    const [modalSelectorValue, setModalSelectorValue] = useState(1);
    const [resetSignal, setResetSignal] = useState(0);

    function openModal(slipperData, selectorValue) {
        setSelectedSlipper(slipperData);
        setIsModalOpen(true);
        setModalSelectorValue(selectorValue);
        setResetSignal(prev => prev + 1);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    return (
        <div className="App">
            <div className={`header ${scrolled ? "scrolled" : ""}`}>
                <header className={scrolled ? "scrolled" : ""}><p className={`h-p ${scrolled ? "scrolled" : ""}`}>FLUFFY STEPS</p></header>
            </div>
            <div className="content">

                <Carousel/>

                <motion.div
                    className="order-h"
                    initial={{opacity: 0, y: 50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 1, ease: "easeOut"}}
                >
                    <h1>Обирай свою пару</h1>
                </motion.div>

                <Catalog
                    openModal={openModal}
                    resetSignal={resetSignal}
                    selectedSlipper={selectedSlipper}
                />

                {isModalOpen &&
                    <motion.div
                        initial={{opacity: 0, y: -200}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -200}}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 10
                        }}
                        className="modal-container"
                        style={{willChange: 'transform, opacity'}}
                    >
                        <Modal closeModal={closeModal} selectedSlipper={selectedSlipper}
                               selectorValue={modalSelectorValue}/>
                    </motion.div>}
            </div>
            {/* TODO: revision - move footer to separate component */}
            <Footer />
        </div>
    )
}