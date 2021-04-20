import React from "react";
import Part from "./Part";

const Content = ({ obj }) => {
  return (
    <div>
      {obj.map((part) => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

export default Content;
