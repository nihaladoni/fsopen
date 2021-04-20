import { useState } from "react";
import "./Notify.css";

const Notify = ({ alert }) => {
  const [bool, setBool] = useState(true);
  console.log(alert);
  if (alert) {
    const myClass = alert.type === "error" ? "error" : "success";
    setTimeout(() => {
      setBool(false);
    }, 5000);

    return bool ? (
      <div className={`notify ${myClass}`}>
        <h5>{alert.text}</h5>
      </div>
    ) : null;
  } else {
    return null;
  }
};

export default Notify;
