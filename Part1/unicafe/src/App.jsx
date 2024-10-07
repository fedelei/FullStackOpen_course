import { useState } from "react";

const Button = ({ value, text }) => {
  return (
    <>
      <button onClick={value}>{text}</button>
    </>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <td>
        {text} {value}
      </td>
    </>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100;
  if (total === 0) {
    return (
      <>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </>
    );
  }

  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr>
            <StatisticLine text="good" value={good} />
          </tr>
          <tr>
            <StatisticLine text="neutral" value={neutral} />
          </tr>
          <tr>
            <StatisticLine text="bad" value={bad} />
          </tr>
          <tr>
            <StatisticLine text="total" value={total} />
          </tr>
          <tr>
            <StatisticLine text="average" value={average} />
          </tr>
          <tr>
            <StatisticLine text="positive" value={positive} />
          </tr>
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGood = () => {
    setGood(good + 1);
  };
  const addNeutral = () => {
    setNeutral(neutral + 1);
  };
  const addBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h2>give feedback</h2>
      <Button value={addGood} text="good" />

      <Button value={addNeutral} text="neutral" />

      <Button value={addBad} text="bad" />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;

/* <tbody>
<tr><StatisticLine text="good" value={good} /></tr>
<tr><StatisticLine text="neutral" value={neutral} /></tr>
<tr><StatisticLine text="bad" value={bad} /></tr>
<tr><StatisticLine text="total" value={total} /></tr>
<tr><StatisticLine text="average" value={average} /></tr>
<tr><StatisticLine text="positive" value={positive} /></tr>
</tbody>
</table> */
