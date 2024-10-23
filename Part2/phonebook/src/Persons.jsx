import React from 'react'

const Persons = ({personsToShow}) => {
  return (
    <div>
        {personsToShow.map((e) => (
        <p key={e.name}>
          {e.name} {e.number}
        </p>
      ))}
    </div>
  )
}

export default Persons
