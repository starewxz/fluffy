import { useEffect } from "react";
import "../../styles/alert.css"
import PropTypes from "prop-types"

function Alert({ type, message, visible, onClose }) {
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(onClose, 2000); // Hide after 3 sec
            return () => clearTimeout(timer); // Cleanup on unmount
        }
    }, [visible, onClose]);

    if (!visible) return null; // Don't render if not visible

    return (
        <div className={`global-alert alert-${type}`}>
            <svg className="bi flex-shrink-0 me-2" role="img" aria-label="Alert:">
                <use xlinkHref={type === "success" ? "#check-circle-fill" : "#exclamation-triangle-fill"} />
            </svg>
            <div>{message}</div>
        </div>
    );
}

Alert.propTypes = {
    type: PropTypes.oneOf(["success", "warning", "error"]).isRequired, // Ensures only allowed types
    message: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default Alert;