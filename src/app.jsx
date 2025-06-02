import "../styles/app.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Catalog from "./components/catalog.jsx";
import Carousel from "./components/carousel";
import Modal from "./components/modal";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";


function App() {
    const time = new Date();
    const yearNow = time.getFullYear();
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
            <div className="footer">
                <footer>
                    <p className="f-p">Fluffy Steps ©2024-{yearNow}</p>
                    <div className="btn-div">
                        <button className="Inst-btn" onClick={() => setTimeout(() => {
                            window.open('https://www.instagram.com/fluffy_steps?igsh=MTNiZXp1a3hremt0eQ==', '_blank', 'noopener,noreferrer')
                        }, 400)}>
                            <span className="svgContainer">
                              <svg fill="#c1b6a2" className="svgIcon" viewBox="0 0 448 512"
                                   xmlns="http://www.w3.org/2000/svg"><path
                                  d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>
                            </span>
                            <span className="Bg"></span>
                        </button>
                        <button className="TikTok-btn"
                                onClick={() => {
                                    setTimeout(() => {
                                        window.open('https://www.tiktok.com/@fluffy_steps', '_blank', 'noopener,noreferrer');
                                    }, 500);
                                }}
                        >
                              <span className="svgContainer">
                                  <svg style={{textAlign: "center"}} className="svgIcon" viewBox="0 0 23 25"
                                       xmlns="http://www.w3.org/2000/svg">
                                  <path fill="#c1b6a2" transform="translate(-31.423 -0.39)"
                                        d="M51.151,6.015a5.661,5.661,0,0,1-3.42-1.143A5.662,5.662,0,0,1,45.469.39H41.8V10.414l0,5.49a3.325,3.325,0,1,1-2.281-3.151V9.029a7.218,7.218,0,0,0-1.058-.078,7.034,7.034,0,0,0-5.286,2.364,6.893,6.893,0,0,0,.311,9.505,7.158,7.158,0,0,0,.663.579,7.035,7.035,0,0,0,4.312,1.458,7.219,7.219,0,0,0,1.058-.078,7.011,7.011,0,0,0,3.917-1.959,6.868,6.868,0,0,0,2.06-4.887l-.019-8.2a9.3,9.3,0,0,0,5.688,1.933V6.014h-.011Z"
                                  ></path>
                                </svg>
                              </span>
                            <span className="Bg-tt"></span>
                        </button>
                    </div>

                    {/*<a href="https://t.me/Wrewych" className="contact-footer">Для контакту з нами</a>*/}
                </footer>
            </div>
         </div>
)
}

export default App;
