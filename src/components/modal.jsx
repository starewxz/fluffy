import "../styles/modal.css"
import PropTypes from "prop-types";
import {useState, useEffect, useRef} from "react";
import Alert from "../tags/alert.jsx";
import { db, collection, addDoc } from "../firebase.js";
import Order from "../models/order.js";
import { getCities, getDepartments } from "../services/nova-poshta-service.js";
import CitySuggestionItem from "../tags/citySuggestion.jsx";
import DepartmentSelect from "../tags/departamentSelection.jsx";
import SizeSelector from "../tags/sizeSelector.jsx";


function Modal( {closeModal, selectedSlipper, selectorValue} ) {
    const nameRef = useRef(null);
    const numberRef = useRef(null);
    const cityRef = useRef(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [nameInp, setNameInp] = useState("");
    const [numberInp, setNumberInp] = useState("");
    const [alert,setAlert] = useState({type: "", message: "", visible: false});
    const [cityInp, setCityInp] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [cityOptions, setCityOptions] = useState([]);
    const [isCityFocused, setIsCityFocused] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [invalidFields, setInvalidFields] = useState({
        name: false,
        number: false,
        city: false,
        departament: false,
    });

    const fetchCities = async (inputCity) => {
        try {
            const cities = await getCities(inputCity);
            setCityOptions(cities);
        } catch (err) {
            console.error("Error in fetchCities:", err);
        }
    };

    const fetchDepartments = async (cityRef) => {
        try {
            const departments = await getDepartments(cityRef);
            setDepartments(departments);
        } catch (err) {
            console.error("Error in fetchDepartments:", err);
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
            setAlert( { type: "warning", message: "Виникла помилка при записі данних, будь ласка спробуйте знову", visible: true});
        }
    };

    const handleSubmit = async () => {
        let hasError = false;

        const updatedInvalidFields = {
            name: false,
            number: false,
            city: false,
            departament: false,
        };

        if (!selectedSize) {
            setAlert({ type: "warning", message: "Будь ласка оберіть розмір!", visible: true });
            return;
        }

        if (nameInp.trim() === "") {
            updatedInvalidFields.name = true;
            nameRef.current?.focus();
            setAlert({ type: "warning", message: "Будь ласка введіть імʼя!", visible: true });
            hasError = true;
        } else if (numberInp.trim() === "") {
            updatedInvalidFields.number = true;
            numberRef.current?.focus();
            setAlert({ type: "warning", message: "Будь ласка введіть номер телефону!", visible: true });
            hasError = true;
        } else if (cityInp.trim() === "") {
            updatedInvalidFields.city = true;
            cityRef.current?.focus();
            setAlert({ type: "warning", message: "Будь ласка введіть місто!", visible: true });
            hasError = true;
        } else if (!selectedDepartment) {
            setAlert({ type: "warning", message: "Будь ласка оберіть відділення!", visible: true });
            hasError = true;
            updatedInvalidFields.departament = true;
        }

        setInvalidFields(updatedInvalidFields);

        if (hasError) return;

        const order = new Order( {
            slipper: selectedSlipper,
            size: selectedSize,
            city: cityInp,
            np: selectedDepartment,
            name: nameInp.trim(),
            phone: numberInp.trim(),
            quantity: selectorValue
        });

        await recordToFirebase(order.toFirebaseObject());

        setAlert({ type: "success", message: "Дякуємо за замовлення!", visible: true });
        console.info("Alert Triggered: Thank you for your purchase!");

        setTimeout(() => {
            closeModal();
        }, 1500);
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
                    <SizeSelector selectedSize={selectedSize} onSelect={setSelectedSize} />


                    <input
                        ref={nameRef}
                        className={`top-inp ${invalidFields.name ? "invalid-input" : ""}`}
                        value={nameInp}
                        type="text"
                        placeholder="Прізвище Імʼя"
                        onChange={(e) => {
                            setNameInp(e.target.value);
                            setInvalidFields((prev) => ({ ...prev, name: false }));
                        }}
                        onFocus={() => window.scrollBy(0, -150)}
                    />

                    <input
                        ref={numberRef}
                        className={`top-inp ${invalidFields.number ? "invalid-input" : ""}`}
                        type="tel"
                        value={numberInp}
                        placeholder="Номер телефону"
                        onChange={(e) => {
                            setNumberInp(e.target.value);
                            setInvalidFields((prev) => ({ ...prev, number: false }));
                        }}
                        onFocus={() => window.scrollBy(0, -150)}
                    />

                    <p className="city-p">* Введіть місто та виберіть відділення Нової Пошти</p>

                    <div className="city-container">
                        <input
                            ref={cityRef}
                            className={`city-inp ${invalidFields.city ? "invalid-input" : ""}`}
                            type="text"
                            value={cityInp}
                            placeholder="Введіть міcто"
                            onChange={(e) => {
                                setCityInp(e.target.value);
                                setInvalidFields((prev) => ({ ...prev, city: false }));
                            }}
                            onFocus={() => {
                                setIsCityFocused(true);
                                window.scrollBy(0, -150);
                            }}
                            onBlur={() => setTimeout(() => setIsCityFocused(false), 100)}
                        />

                        {isCityFocused && cityOptions.length > 0 && (
                            <ul className="city-suggestions">
                                {cityOptions.map((city, index) => (
                                    <CitySuggestionItem
                                        key={index}
                                        description={city.Description}
                                        onSelect={() => {
                                            setCityInp(city.Description);
                                            setCityOptions([]);
                                            setIsCityFocused(false);
                                            fetchDepartments(city.Ref);
                                            setSelectedDepartment("");
                                        }}
                                    />
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="departament-container">
                        {(departments.length > 0 || cityInp !== "") && (
                            <DepartmentSelect
                                className={`np ${invalidFields.departament ? "invalid-input" : ""}`}
                                departments={departments}
                                selectedDepartment={selectedDepartment}
                                onChange={ (value) => {
                                    setSelectedDepartment(value);
                                    setInvalidFields((prev) => ({ ...prev, departament: false }));
                                }
                                }
                            />
                        )}
                    </div>

                    <p className="m-p">Вартість: {selectedSlipper.cost * selectorValue}грн</p>

                    <button className="submit-btn" type="button" onClick={handleSubmit}>Підтвердити</button>

                </div>
            </div>

        </>
    );
}

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    selectedSlipper: PropTypes.shape({
        name: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        cost: PropTypes.number.isRequired,
    }).isRequired,
    selectorValue: PropTypes.number.isRequired,
};

export default Modal;