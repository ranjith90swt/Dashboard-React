import React from 'react'
import '../css/StatCard.css'
import CountUp from 'react-countup'
import Button from './Button';

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
  description ='',
  descriptionIcon = '',
  link = '',
  buttonLabel = 'Send Money',
  buttonOnClick = ''
    }
) => {

  const isValueEmpty = value == null || value === '';
  return (
    <>
      <div className={`stat-bx ${bgclass}`}>
        <p>{icon && <i className={`bi ${icon} fs-2 opacity-25`}></i>}</p>
        <h6 className="mb-3">{title}</h6>
        
        <h2 className='state-numbers'> 

           <div className="d-flex">
            {
              isValueEmpty ? (

              <Button onClick={buttonOnClick} label={buttonLabel} className='' size='lg'> {buttonLabel} </Button>
              ):(

              <>
                 <span className="prefix me-2">{prefix}</span> 
                <CountUp className='state-numbers'
                  end={value}
                  duration={duration}
                  // prefix={prefix} 
                  suffix={suffix}
                  separator=","

                />
                </>

              )
            }
              
           </div>
          
        </h2>
        <hr />
        {
          description && (
            <>
              <p className='mb-0'>
                {descriptionIcon && <>{descriptionIcon}</>}
                {description}
              </p>
            </>
          )
        }

       
        

      </div>
        
    </>
  )
}
