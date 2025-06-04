import PropTypes from "prop-types";

function DepartmentSelect({ departments, selectedDepartment, onChange }) {
    if (!departments.length) {
        return (
            <select className="np" disabled>
                <option>Завантаження відділень...</option>
            </select>
        );
    }

    return (
        <select className="np" value={selectedDepartment} onChange={(e) => onChange(e.target.value)}>
            <option value="" disabled>
                Оберіть відділення
            </option>
            {departments.map((dept, idx) => (
                <option key={idx} value={dept.Description}>
                    {dept.Description}
                </option>
            ))}
        </select>
    );
}

DepartmentSelect.propTypes = {
    departments: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    selectedDepartment: PropTypes.string.isRequired,
}

export default DepartmentSelect;
