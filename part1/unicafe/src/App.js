import { useState } from "react";
import Statistics from "./Statistics";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const average = good - bad / all || 0;
  const positive = `${(good / all) * 100 || 0} % `;

  const obj = {
    good,
    neutral,
    bad,
    all,
    average,
    positive,
  };
  return (
    <>
      <section>
        <h1>Give Feedback</h1>
        <div>
          <button onClick={() => setGood((good) => good + 1)}>Good</button>
          <button onClick={() => setNeutral((neutral) => neutral + 1)}>
            Neutral
          </button>
          <button onClick={() => setBad((bad) => bad + 1)}>Bad</button>
        </div>
      </section>
      <Statistics obj={obj} />
    </>
  );
};

export default App;
