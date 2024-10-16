import React from 'react'
import Total from './Total';
import Headers from './Headers';

const Part = ({parts}) => {
  
const [...partOne] = parts[0].parts;

const [...partTwo] = parts[1].parts;




   
  return (
    
     <>
     <h2>{parts[0].name}</h2>
  
    {partOne.map(e => <p key={e.id}>{e.name} {e.exercises}</p>)}

    <Total total={parts[0].parts} />
   
    <h2>{parts[1].name}</h2>

    {partTwo.map(e => <p key={e.id}>{e.name} {e.exercises}</p>)}

    <Total total={parts[1].parts} />
     
     
      </>
    
  )
}

export default Part
