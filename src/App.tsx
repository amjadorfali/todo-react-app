import React, { useEffect } from "react";
import "./App.css";
import moment from "moment";
import { Typography } from "@material-ui/core";

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
        <Typography gutterBottom color={"textSecondary"} variant={"h1"}>
          {date}
        </Typography>
        <Typography variant={"h2"}>{time}</Typography>
      </header>
    </div>
  );
}

export default App;
