import React from 'react'
import '../css/StatCard.css'
import CountUp from 'react-countup'

export const StatCard = (
    {
  title,
  value,
  prefix = '',
  suffix = '',
  icon,
  bgclass='',
//   color = 'primary',
  duration = 1.5, // animation duration in seconds
    }
) => {
  return (
    <>
      <div className={`stat-bx ${bgclass}`}>
        <p>{icon && <i className={`bi ${icon} fs-2 opacity-25`}></i>}</p>
        <h6 className="mb-3">{title}</h6>
        
        <h2 className='state-numbers'> 

           <div className="d-flex">
              <span className="prefix me-2">{prefix}</span> 
              <CountUp className='state-numbers'
                end={value}
                duration={duration}
                // prefix={prefix} 
                suffix={suffix}
                separator=","
              />
           </div>
          
        </h2>
        <hr />
        <p className='mb-0'>
          <i class="bi bi-graph-up-arrow me-2"></i> 3% Last Month
        </p>
        

      </div>
        
    </>
  )
}
