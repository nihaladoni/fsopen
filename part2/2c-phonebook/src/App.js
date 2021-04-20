import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [person, setPerson] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [filtered, setFiltered] = useState([]);

  const notesToShow = showAll ? person : filtered;
  const URI = "http://localhost:3300/persons";

  useEffect(() => {
    axios.get(URI).then((response) => setPerson(response.data));
  }, []);

  const handleFormSubmit = (newUser) => {
    //  checking for user and returning user array if it exist
    const personExists = person.filter((person) =>
      person.name.toLowerCase() === newUser.name.toLowerCase() ? person : null
    );
    if (personExists.length) {
      alert(`${newUser.name} already exists in the phonebook`);
    } else {
      axios.post(URI, newUser).then(() => setPerson(person.concat(newUser)));
    }
  };

  const handleSearchChange = (term) => {
    if (term.length > 0) {
      setShowAll(false);
    } else {
      setShowAll(true);
    }

    const filterArr = person.filter((person) =>
      person.name.toLowerCase().startsWith(term.toLowerCase()) ? person : null
    );

    setFiltered([...filterArr]);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onSearchChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm onFormSubmit={handleFormSubmit} />
      <h3>Numbers</h3>
      <Persons dataObj={notesToShow} />
    </div>
  );
};

export default App;
