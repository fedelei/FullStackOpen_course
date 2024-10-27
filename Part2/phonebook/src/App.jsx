import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personServices from "./services/personServices";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personServices
    .getAll()
    .then(response => {
      setPersons(response.data)
    })
  },[])

  const handleFilter = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };

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
  
    const existingPerson = persons.find(person => person.name === newName);
    const personsObj = { name: newName, number: number };

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to the phonebook. Replace the old number with a new one?`
      );

      if (confirmUpdate) {
        personServices
          .update(existingPerson.id, personsObj)
          .then(response => {
            setPersons(
              persons.map(person =>
                person.id !== existingPerson.id ? person : response.data
              )
            );
          })
          .catch(error => {
            alert(`Failed to update ${newName} ${error}`);
          });
      }
    } else {
      personServices
      .create(personsObj)
      .then(response => {
        setPersons(persons.concat(response.data))
      })
      setNewName("");
      setNumber("");
    }
  };



  const personsToShow = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

    const deletePerson = (id) => {
      const person = persons.find((p) => p.id === id);
      if (window.confirm(`Delete ${person.name}?`)) {
        personServices
          .suprimir(id)
          .then(() => {
            setPersons(persons.filter((p) => p.id !== id));
          })
          .catch(error => {
            alert(`Failed to delete ${person.name}`);
          });
      }
    };

  return (
    <div>
      <h2>Phonebook</h2>
       
      <Filter filter={filter} handleFilter={handleFilter} />

      <h2>Add a new</h2>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        number={number}
        handleNoteChange={handleNoteChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
