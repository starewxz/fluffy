import PropTypes from "prop-types";

function CitySuggestionItem({ description, onSelect }) {
    return (
        <li className="city-suggestion-item" onClick={() => onSelect(description)}>
            {description}
        </li>
    );
}

CitySuggestionItem.propTypes = {
    description: PropTypes.string,
    onSelect: PropTypes.func,
}
export default CitySuggestionItem;