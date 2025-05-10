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
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [cityOptions, setCityOptions] = useState([]);
    const [isCityFocused, setIsCityFocused] = useState(false);
    const [departments, setDepartments] = useState([]);

    const fetchDepartments = async (cityRef) => {
        try {
            const response = await fetch("https://fluffy-server-pi.vercel.app/api/novaposhta", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    methodName: "getWarehouses",
                    query: { CityRef: cityRef },
                }),
            });

            const result = await response.json();
            console.log("Departments Response:", result);

            if (result.success && result.data) {
                setDepartments(result.data);
            } else {
                console.warn("Failed to get departments", result);
            }
        } catch (err) {
            console.error("Error fetching departments:", err);
        }
    };



    const fetchCities = async (inputCity) => {
        if (!inputCity || inputCity.length < 1) return;

        try {
            const response = await fetch("https://fluffy-server-pi.vercel.app/api/novaposhta", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    methodName: "getCities",
                    query: { FindByString: inputCity }
                }),
            });

            const result = await response.json();
            console.log('City Fetch Response:', result); // Log the result from the Nova Poshta API

            if (result.success && result.data) {
                setCityOptions(result.data); // Store the list of cities
            } else {
                console.warn("Failed to get cities", result);
            }
        } catch (err) {
            console.error("Error fetching cities:", err);
        }
    };


    useEffect(() => {
        const delay = setTimeout(() => {
            fetchCities(cityInp);
        }, 100); // Debounce user input

        return () => clearTimeout(delay);
    }, [cityInp]);

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
        } else if (!selectedDepartment || nameInp.trim() === "" || numberInp.trim() === "" || cityInp.trim() === "") {
            setAlert({ type: "warning", message: "Будь ласка заповніть усі поля та оберіть відділення!", visible: true });
        } else {
            const order = new Order( {
                slipper: selectedSlipper, // entire object
                size: selectedSize,
                city: cityInp,
                np: selectedDepartment,
                name: nameInp.trim(),
                phone: numberInp.trim(),
                quantity: selectorValue
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
                        onFocus={() => {
                            window.scrollBy(0, -150);
                        }}
                    />
                    <input
                        type="tel"
                        value={numberInp}
                        placeholder="Номер телефону"
                        onChange={(e) => setNumberInp(e.target.value)}
                        onFocus={() => {
                            window.scrollBy(0, -150);
                        }}
                    />

                    <p className="city-p">* Введіть місто та виберіть відділення Нової Пошти</p>

                    <div className="city-container">
                        <input
                            className="city-inp"
                            type="text"
                            value={cityInp}
                            placeholder="Введіть міcто"
                            onChange={(e) => setCityInp(e.target.value)}
                            onFocus={() => {
                                setIsCityFocused(true);
                                window.scrollBy(0, -150);
                            }}
                            onBlur={() => setTimeout(() => setIsCityFocused(false), 100)}
                        />

                        {isCityFocused && cityOptions.length > 0 && (
                            <ul className="city-suggestions">
                                {cityOptions.map((city, index) => (
                                    <li
                                        key={index}
                                        className="city-suggestion-item"
                                        onClick={() => {
                                            setCityInp(city.Description);  // Set the city name in input field
                                            setCityOptions([]);  // Clear the suggestion list
                                            setIsCityFocused(false);
                                            fetchDepartments(city.Ref);
                                        }}
                                    >
                                        {city.Description}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="departament-container">
                        {(departments.length > 0 || cityInp !== "") && (
                            <select className="np" value={selectedDepartment}
                                    onChange={(e) => setSelectedDepartment(e.target.value)}>
                                {departments.length === 0 ? (
                                    <option>Завантаження відділень...</option>
                                ) : (
                                    <>
                                        <option value="" disabled>Оберіть відділення</option>
                                        {departments.map((dept, idx) => (
                                            <option key={idx} value={dept.Description}>
                                                {dept.Description}
                                            </option>
                                        ))}
                                    </>
                                )}
                            </select>
                        )}

                    </div>

                    <p className="m-p">Вартість: {selectedSlipper.cost * selectorValue}грн</p>

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