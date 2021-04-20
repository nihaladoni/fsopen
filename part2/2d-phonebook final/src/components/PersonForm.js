import { useState } from "react";

const PersonForm = ({ onFormSubmit }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && number) {
      onFormSubmit({ name, number });
    }
    setName("");
    setNumber("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          name:{" "}
          <input
            type="text"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value.trim())}
          />
        </div>
        <div>
          number:{" "}
          <input
            type="number"
            value={number}
            name="number"
            onChange={(e) => setNumber(e.target.value.trim())}
          />
        </div>
        <div>
          <button type="submit" disabled={name && number ? false : true}>
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
