import React from "react";

import "./App.css";
import { Home } from "../home";
import { TodoListOverview } from "../todoList";
import Header from "../home/pages/header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      <Router>
        <Header  />
        <Switch>
          <Route exact path="/" component={Home} />

          <Route path="/todo-app">
            <TodoListOverview />
          </Route>
          {/* 
          <Route path="/dashboard">
            <Dashboard />
          </Route> */}
        </Switch>
      </Router>
    </>
  );
};

export default App;
