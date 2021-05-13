import * as actions from "../constants";

let timer = null;

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case actions.SET_NOTIF:
      return action.message;
    case actions.REMOVE_NOTIF:
      return null;
    default:
      return state;
  }
};

export const setNotification = (content, time) => {
  if (timer != null) {
    clearInterval();
  }
  return async (dispatch) => {
    dispatch({
      type: actions.SET_NOTIF,
      message: content,
    });
    timer = setTimeout(() => {
      dispatch(removeNotification());
    }, time * 1000);
  };
};

export const removeNotification = () => {
  return { type: actions.REMOVE_NOTIF };
};

export default notificationReducer;
