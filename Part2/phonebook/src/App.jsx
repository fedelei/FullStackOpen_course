import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");



  const handleFilter = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
   
   
  };

  ;

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };


  

  const handleNumberChange = (event) => {
    console.log(event.target.value);

    setNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    const personsObj = {
      name: newName,
      number: number,
    };
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      setPersons([...persons, personsObj]);
      setNewName("");
    }
  };

  const personsToShow = filter
  ? persons.filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )
  : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with{" "}
        <input type="text" onChange={handleFilter} value={filter} />
      </div>
      <form onSubmit={addPerson}>
        <div>
          <h2>Add a new</h2>
          name: <input value={newName} onChange={handleNoteChange} />
        </div>
        <div>
          number:{" "}
          <input type="number" value={number} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {personsToShow.map((e) => (
        <p key={e.name}>
          {e.name} {e.number}
        </p>
      ))}
    </div>
  );
};

export default App;
