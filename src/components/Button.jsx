import React from 'react'

const Button = (
    {
        label = 'Click',
        onClick,
        type = 'button',
        className = '',
        variant = 'primary',   // bootstrap style: primary, danger, success etc.
        size = '',             // bootstrap size: sm, lg
        icon = null,           // optional icon
        disabled = false,
        ...rest
    }
) => {
  return (
    <>
         <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} ${size ? `btn-${size}` : ''} ${className}`}
      {...rest}
    >
      {icon && <i className={`${icon} me-1`} />} {/* Bootstrap icons */}
      {label}
    </button>
    </>
  )
}

export default Button