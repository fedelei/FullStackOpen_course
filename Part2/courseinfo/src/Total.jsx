import React from 'react'

const Total = ({total}) => {


  


   
  return (
    <div>
      <b>total of {total.reduce((ac, {exercises}) => ac + exercises,0)} exercises </b>
      
     
    </div>
  )
}

export default Total
