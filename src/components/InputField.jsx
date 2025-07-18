import React from 'react'

const InputField = (
    {
    type = 'text',
    placeholder = '',
    className = '',
    value,
    onChange,
    }
) => {
  return (
    <>
    <input
        type={type}
        placeholder={placeholder}
        className={`form-control mb-3 ${className}`}
        value={value}
        onChange={onChange}
    />
        
    </>
  )
}

export default InputField