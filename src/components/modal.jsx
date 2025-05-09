import "../modal.css"
import PropTypes from "prop-types";
import {useState} from "react";
import Alert from "../components/alert.jsx";
import { db, collection, addDoc } from "../firebase.js";
import {useEffect} from "react";
import Order from "../models/order.js";

function Modal( {closeModal, selectedSlipper, selectorValue} ) {
    const [selectedSize, setSelectedSize] = useState(null);
    const [nameInp, setNameInp] = useState("");
    const [numberInp, setNumberInp] = useState("");
    const [alert,setAlert] = useState({type: "", message: "", visible: false});
    const [cityInp, setCityInp] = useState("");
    const [np, setNp] = useState(1);

    // ✅ Disable scrolling when modal opens & enable when modal closes
    useEffect(() => {
        document.body.style.overflow = "hidden"; // Disable scrolling when modal is open

        return () => {
            document.body.style.overflow = "auto"; // Restore scrolling when modal is closed
        };
    }, []);

    const recordToFirebase = async (data) => {
        try {
            await addDoc(collection(db, "orders"), data);
            console.log("Data recorded:", data);
        } catch (error) {
            console.error("Error recording data:", error);
        }
    };

    const handleSubmit = async () => {
        if (!selectedSize) {
            setAlert({ type: "warning", message: "Будь ласка оберіть розмір!", visible: true });
        } else if (nameInp.trim() === "" || numberInp.trim() === "" || cityInp.trim() === "") {
            setAlert({ type: "warning", message: "Будь ласка заповніть усі поля!", visible: true });
        } else {
            const order = new Order( {
                selectedModel: selectedSlipper?.name || "Unknown Model",
                selectedSize: selectedSize || "Not selected",
                cost: selectedSlipper?.cost*selectorValue,
                city: cityInp,
                np: np,
                name: nameInp.trim() || "Empty",
                phone: numberInp.trim() || "Empty",
                timestamp: new Date().toLocaleString(),
            });

            // Save data to Firebase before showing alerts
            await recordToFirebase(order.toFirebaseObject());

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
                    <p className="m-p">{selectedSlipper?.name || "Unknown Slipper"}</p>
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

                    <p className="city-p">* Введіть місто та виберіть відділення Нової Пошти</p>

                    <div className="city-container">
                        <input
                            className="city-inp"
                            type="text"
                            value={cityInp}
                            placeholder="Введіть міcто"
                            onChange={(e) => setCityInp(e.target.value)}
                        />
                        <input
                            className="np"
                            type="number"
                            value={np}
                            onChange={(e) => setNp(e.target.value)}
                        />
                    </div>

                    <p className="m-p">Вартість: {selectedSlipper.cost * selectorValue}</p>

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
        cost: PropTypes.number.isRequired,
    }).isRequired,
    selectorValue: PropTypes.number.isRequired,
};

export default Modal;