import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import moment from "moment";

function App() {
  const [time, setTime] = React.useState<string>();
  const [date, setDate] = React.useState<string>();
  useEffect(() => {
    const dateInterval = setInterval(() => {
      setTime(moment().format("h:mm:ss a"));
      setDate(moment().format("dddd , MMMM Do"));
    }, 1000);

    return () => {
      clearInterval(dateInterval);
    };
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>{date}</h1>
        <h1>{time}</h1>
      </header>
    </div>
  );
}

export default App;
