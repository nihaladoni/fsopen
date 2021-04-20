import React from "react";
import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const Course = ({ data }) => {
  return (
    <section>
      {data.map((item) => (
        <div key={item.id}>
          <Header course={item.name} />
          <Content obj={item.parts} />
          <Total obj={item.parts} />
        </div>
      ))}
    </section>
  );
};

export default Course;
