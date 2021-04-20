import { useState } from "react";

const PersonForm = ({ onFormSubmit }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [id, setId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setId((c) => c + 1);
    if (name && number) onFormSubmit({ name, number, id });
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
