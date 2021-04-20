import { useState } from "react";

const PersonForm = ({ onFormSubmit }) => {
  const [name, setName] = useState("");
  const [num, setNum] = useState("");
  const [count, setCount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCount((c) => c + 1);
    if (name && num) onFormSubmit({ name, num, id: count });
    setName("");
    setNum("");
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
            value={num}
            name="number"
            onChange={(e) => setNum(e.target.value.trim())}
          />
        </div>
        <div>
          <button type="submit" disabled={name && num ? false : true}>
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
