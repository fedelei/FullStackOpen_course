import React from 'react'

const PersonForm = ({addPerson, newName, number, handleNoteChange, handleNumberChange}) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
        name: <input type='text'  value={newName} onChange={handleNoteChange} />
        </div>
        <div>
        number: <input type='text' value={number} onChange={handleNumberChange}   />
        </div>
        <div>
            <button type='submit'>add</button>
        </div>

      </form>
    </div>
  )
}

export default PersonForm
