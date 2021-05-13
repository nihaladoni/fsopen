import React from "react";
import { useParams } from "react-router-dom";

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;

  const anecdoteById = anecdotes.filter((anecdote) => anecdote.id === id);
  return (
    <div>
      {anecdoteById.map((note) => (
        <React.Fragment key={note.id}>
          <h2>
            {note.content} by <u> {note.author}</u>
          </h2>
          <p>has {note.votes} votes</p>
          <p>
            for more info, see
            <a href={note.info} rel="noreferrer" target="_blank">
              {note.info}
            </a>
          </p>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Anecdote;
