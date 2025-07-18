import React from 'react'

const Card = ({ title, description, children }) => {
  return (
    <> 
        <div className="card d-flex flex-column">
            <div className="card-header">
                <h2 className="card-title">{title}</h2>
            </div>
            <div className="card-body">
                {description && <p className="card-description mb-0">{description}</p>}
                {children}
            </div>
        </div>
    </>
  )
}

export default Card