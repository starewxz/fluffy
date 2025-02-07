import "../modal.css"
import PropTypes from "prop-types";
import {useState} from "react";
import Alert from "../components/alert.jsx";
import { db, collection, addDoc } from "../firebase.js";

function Modal( {closeModal, selectedSlipper} ) {
    const [selectedSize, setSelectedSize] = useState(null);
    const [nameInp, setNameInp] = useState("");
    const [numberInp, setNumberInp] = useState("");
    const [alert,setAlert] = useState({type: "", message: "", visible: false});


    const recordToFirebase = async (data) => {
        try {
            await addDoc(collection(db, "userSelections"), data);
            console.log("Data recorded:", data);
        } catch (error) {
            console.error("Error recording data:", error);
        }
    };

    const handleSubmit = async () => {
        if (!selectedSize) {
            setAlert({ type: "warning", message: "Будь ласка оберіть розмір!", visible: true });
            console.log("Alert Triggered: Please select a size!");
        } else if (nameInp.trim() === "" || numberInp.trim() === "") {
            setAlert({ type: "warning", message: "Будь ласка заповніть обидва поля!", visible: true });
            console.log("Alert Triggered: Please fill in both fields!");
        } else {
            const formData = {
                selectedModel: selectedSlipper?.name || "Unknown Model",
                selectedSize: selectedSize || "Not selected",
                name: nameInp.trim() || "Empty",
                phone: numberInp.trim() || "Empty",
                timestamp: new Date().toISOString(),
            };

            // Save data to Firebase before showing alerts
            await recordToFirebase(formData);

            setAlert({ type: "success", message: "Дякуємо за замовлення!", visible: true });
            console.log("Alert Triggered: Thank you for your purchase!");

            setTimeout(() => {
                closeModal();
            }, 1500);
        }
    };


    const handleBackgroundClick = (event) => {
        if (event.target.classList.contains("modal-container")) {
            closeModal();
            console.log({selectedSize})
        }
    };
    return (
        <>
            <Alert
                type={alert.type}
                message={alert.message}
                visible={alert.visible}
                onClose={() => setAlert({ ...alert, visible: false })}
            />

        <div className="modal-container" onClick={handleBackgroundClick}>
            <div className="modal-content">
                <img className="modal-img" src={selectedSlipper.img} alt={selectedSlipper.name}/>
                <p>{selectedSlipper?.name || "Unknown Slipper"}</p>
                <div className="size-container">
                    {[35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45].map((size) => (
                        <button
                            key={size}
                            className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                            onClick={() => setSelectedSize(size)}
                        >
                            {size}
                        </button>
                    ))}
                </div>

                <input
                    className="top-inp"
                       value={nameInp}
                       type="text"
                       placeholder="Прізвище Імʼя"
                       onChange={(e) => setNameInp(e.target.value)}
                />
                <input
                    type="tel"
                    value={numberInp}
                    placeholder="Номер телефону"
                    onChange={(e) => setNumberInp(e.target.value)}
                />

                <button className="submit-btn" type="button" onClick={handleSubmit}>Підтвердити</button>

            </div>
        </div>

        </>
    );
}

// Додаємо валідацію пропсів
Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,  // closeModal має бути функцією
    selectedSlipper: PropTypes.shape({      // selectedSlipper - це об'єкт з певними властивостями
        name: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
    }).isRequired,
};

export default Modal;