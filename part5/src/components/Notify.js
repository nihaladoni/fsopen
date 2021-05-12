import React from "react";

import "./Notify.css";

const Notify = ({ type, message }) => {
  return (
    <div className={type === "error" ? "alert error" : "alert success"}>
      {message}
    </div>
  );
};

export default Notify;
