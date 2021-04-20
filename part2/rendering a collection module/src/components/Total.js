import React from "react";

const Total = ({ obj }) => {
  let totalExercises = obj.reduce((acc, part) => (acc += part.exercises), 0);
  return (
    <section>
      <p>
        <strong>Total of {totalExercises} exercises</strong>
      </p>
    </section>
  );
};

export default Total;
