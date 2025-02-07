import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ImgGrid from "./components/grid-imgs.jsx";
import Carousel from "./components/carousel";
import Modal from "./components/modal";
import { motion } from "framer-motion";
import { useState } from "react";


function App() {
    const time = new Date();
    const yearNow = time.getFullYear();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSlipper, setSelectedSlipper] = useState(null);

    function openModal(slipperData) {
        setSelectedSlipper(slipperData);
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

  return (
      <div className="App">
          <div className="header">
              <header className="m-head"><p className="h-p">FLUFFY STEPS</p></header>
          </div>
          <div className="content">

              <Carousel />

              <motion.div
                  className="order-h"
                  initial={{opacity: 0, y: 50}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 1, ease: "easeOut"}}
              >
                  <h1>Обирай свою пару</h1>
              </motion.div>

              <ImgGrid
               openModal={openModal}
              />

              {isModalOpen && <Modal closeModal={closeModal} selectedSlipper={selectedSlipper} />}
          </div>
          <div className="footer">
              <footer className="m-foot"><p className="f-p">Fluffy Steps ©2024-{yearNow}</p></footer>
          </div>
      </div>
  )
}

export default App;
