import React from 'react'

const InputField = (
    {
    type = '',
    name='',
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
        name={name}
        placeholder={placeholder}
        className={`form-control mb-1 ${className}`}
        value={value}
        onChange={onChange} 
    />
        
    </>
  )
}

export default InputField