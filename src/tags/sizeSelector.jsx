import PropTypes from "prop-types";

function SizeSelector({ selectedSize, onSelect }) {
    const sizes = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];

    return (
        <div className="size-container">
            {sizes.map((size) => (
                <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? "selected" : ""}`}
                    onClick={() => onSelect(size)}
                >
                    {size}
                </button>
            ))}
        </div>
    );
}

SizeSelector.propTypes = {
    selectedSize: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
}

export default SizeSelector;
