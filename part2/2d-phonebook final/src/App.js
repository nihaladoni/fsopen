import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notify from "./components/Notify";

const App = () => {
  const [person, setPerson] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [alert, setAlert] = useState(null);
  const [filtered, setFiltered] = useState([]);

  const notesToShow = showAll ? person : filtered;
  const URI = "http://localhost:3300/persons";

  useEffect(() => {
    axios.get(URI).then((response) => setPerson(response.data));
  }, []);

  const handleFormSubmit = (newUser) => {
    //  checking for user and returning user array if it exist
    const personExists = person.find((person) =>
      person.name.toLowerCase() === newUser.name.toLowerCase() ? person : false
    );

    if (typeof personExists === "object") {
      const bool = window.confirm(
        `${newUser.name} already exists in the phonebook,replace the old number with new one`
      );

      if (bool)
        axios
          .put(`${URI}/${personExists.id}`, { ...newUser })
          .then(({ data }) => {
            const copyArr = [...person];
            copyArr[personExists.id - 1] = data;
            setPerson(copyArr);
            setAlert({
              type: "success",
              text: `Updated ${data.name}'s number`,
            });
          });
    } else {
      axios.post(URI, newUser).then(({ data }) => {
        setPerson(person.concat(data));
        setAlert({ type: "success", text: `Added ${data.name}` });
      });
    }
  };

  const handleSearchChange = (term) => {
    term ? setShowAll(false) : setShowAll(true);
    const filterArr = person.filter((person) =>
      person.name.toLowerCase().startsWith(term.toLowerCase()) ? person : null
    );
    setFiltered([...filterArr]);
  };

  const handleDelete = (id) => {
    const foundPerson = person.find((a) => a.id === id);
    const bool = window.confirm(`Delete ${foundPerson.name}`);
    if (bool)
      axios.delete(`${URI}/${id}`, { id }).then(() => {
        setPerson(person.filter((person) => person.id !== id));
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>

      {typeof alert === "object" ? <Notify alert={alert} /> : null}
      <Filter onSearchChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm onFormSubmit={handleFormSubmit} />
      <h3>Numbers</h3>
      <Persons dataObj={notesToShow} onNoteDelete={handleDelete} />
    </div>
  );
};

export default App;
