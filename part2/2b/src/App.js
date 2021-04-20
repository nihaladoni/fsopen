import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [person, setPerson] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [filtered, setFiltered] = useState([]);

  const notesToShow = showAll ? person : filtered;

  const handleSubmit = (newUser) => {
    const bool = person.filter(
      (element) => element.name.toLowerCase() === newUser.name.toLowerCase()
    );
    if (bool.length === 1) {
      alert(`${newUser.name} is already added to phonebook`);
    } else {
      setPerson(person.concat(newUser));
    }
  };

  const handleSearch = (term) => {
    if (term.length > 0) {
      setShowAll(false);
    } else {
      setShowAll(true);
    }
   
 const filterArr = person.filter((person) =>
      person.name.toLowerCase().startsWith(term.toLowerCase()) ? person : null
    );

    setFiltered([...filteredArr]);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onSearchChange={handleSearch} />
      <h3>Add a new</h3>
      <PersonForm onFormSubmit={handleSubmit} />
      <h3>Numbers</h3>
      <Persons dataObj={notesToShow} />
    </div>
  );
};

export default App;
