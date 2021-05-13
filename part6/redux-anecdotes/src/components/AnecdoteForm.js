import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const obj = {
      content: value,
      id: (Math.random() * 10000).toFixed(0),
      votes: 0,
    };

    dispatch(createAnecdote(obj));
    setValue("");
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="anecdote"
            value={value}
            onChange={({ target }) => setValue(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
