import React from "react";

const Total = ({ obj }) => {
  return (
    <div>
      <p>
        Number of exercises &nbsp;
        {obj.reduce((acc, part) => (acc += part.exercises), 0)}
      </p>
    </div>
  );
};

export default Total;
