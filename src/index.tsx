/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './modules/app';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import * as ReactDOMClient from 'react-dom/client';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();
const container = document.getElementById('root');

if (container) {
  // Create a root.
  const root = ReactDOMClient.createRoot(container);

  // Initial render: Render an element to the root.
  root.render(
    <StrictMode>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </StyledEngineProvider>
    </StrictMode>
  );

  // During an update, there's no need to pass the container again.

  serviceWorkerRegistration.register();

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
}
