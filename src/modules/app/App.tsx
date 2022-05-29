/* eslint-disable no-unused-labels */
/* eslint-disable no-labels */
import React from 'react';

import './App.css';
import { Home } from '../home';
import { TodoListOverview } from '../todoList';
import Header from '../home/pages/header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';

const theme = createMuiTheme();

const useStyles = makeStyles((theme) => {
  root: {
    // some CSS that access to theme
  }
});

const App: React.FC<React.PropsWithChildren<unknown>> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const classes = useStyles(); // ❌ If you have this, consider moving it inside a component that wrapped with <ThemeProvider>

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer position="top-right" autoClose={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable />
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
      </ThemeProvider>
    </>
  );
};

export default App;
