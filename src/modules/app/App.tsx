import React from "react";

import "./App.css";
import { Home } from "../home";
import { TodoListOverview } from "../todoList";
import Header from "../home/pages/header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC<React.PropsWithChildren<unknown>> = () => {
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
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo-app" element={<TodoListOverview />} />
          {/* 
          <Route path="/dashboard">
            <Dashboard />
          </Route> */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
