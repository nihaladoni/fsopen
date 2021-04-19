import Statistic from "./Statistic";

const Statistics = ({ obj }) => {
  return (
    <div>
      <h1>Statistics</h1>
      {obj.all === 0 ? (
        "No feedback given"
      ) : (
        <table id="table">
          <tbody>
            {Object.keys(obj).map((row, idx) => (
              <Statistic key={idx} text={row} value={obj[row]} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Statistics;
