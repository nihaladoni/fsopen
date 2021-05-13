import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { increaseVoteOf } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import Notification from "./Notification";

const AnecdoteList = () => {
  const anecdotesFromState = useSelector((state) => {
    return state.filter === "ALL"
      ? state.anecdotes
      : state.anecdotes.filter((note) => note.content.includes(state.filter));
  });

  const dispatch = useDispatch();

  const anecdotes = anecdotesFromState.sort((a, b) => b.votes - a.votes);

  const vote = (anecdote) => {
    const obj = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    dispatch(increaseVoteOf(obj));
    dispatch(setNotification(`You voted for ${anecdote.content}`, 5));
  };

  return (
    <>
      <Notification />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
