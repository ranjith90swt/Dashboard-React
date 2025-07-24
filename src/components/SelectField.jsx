// SelectField.jsx
import React from 'react';
import '../css/SelectField.css'

const SelectField = ({
  id,
  name,
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  className = '',
}) => {
  return (
    <div className={`form-group ${className}`}>
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="form-select"
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
