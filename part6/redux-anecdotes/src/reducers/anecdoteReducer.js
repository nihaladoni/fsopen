import * as actions from "../constants";
import * as anecdoteService from "../services/anecdotes";
import { setNotification } from "./notificationReducer";

const reducer = (state = [], { type, payload }) => {
  switch (type) {
    case actions.GET_ANECDOTES:
      return state.concat(payload.data);
    case actions.CREATE_ANECDOTE:
      return state.concat(payload.data);

    case actions.INCREASE_VOTE:
      return state.map((anecdote) =>
        anecdote.id !== payload.id ? anecdote : payload
      );

    default:
      return state;
  }
};

export default reducer;

//  ACTIONS

export const initializeAnecdotes = () => async (dispatch) => {
  const response = await anecdoteService.getAll();
  dispatch({
    type: actions.GET_ANECDOTES,
    payload: {
      data: response,
    },
  });
};
export const increaseVoteOf = (obj) => async (dispatch) => {
  const response = await anecdoteService.incrementVote(obj);
  dispatch({
    type: actions.INCREASE_VOTE,
    payload: {
      ...response,
    },
  });
};
export const createAnecdote = (note) => async (dispatch) => {
  const response = await anecdoteService.create(note);
  dispatch({
    type: actions.CREATE_ANECDOTE,
    payload: {
      response,
    },
  });
  dispatch(setNotification(`You added ${response.content}`, 5));
};
