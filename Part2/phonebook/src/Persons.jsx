import React from 'react'

const Persons = ({personsToShow, deletePerson}) => {
  return (
    <div>
        {personsToShow.map((e) => (
        <p key={e.name}>
          {e.name} {e.number} <button onClick={() => deletePerson(e.id)}>Delete</button>
        </p>
      ))}
    </div>
  )
}

export default Persons
