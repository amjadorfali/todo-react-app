/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { StrictMode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './modules/app';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import * as ReactDOMClient from 'react-dom/client';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import lodash from 'lodash';
import { GraphQLError, responsePathAsArray } from 'graphql';

const theme = createTheme({
  palette: {
    primary: {
      main: '#05386b',
      contrastText: '#edf5e1',
      dark: '#05386b',
      light: '#05386b',
    },
    secondary: {
      main: '#8ee4af',
      contrastText: '#379683',
      dark: '#8ee4af',
      light: '#8ee4af',
    },
  },
});
const container = document.getElementById('root');
const toastOptions: ToastOptions = {
  position: 'top-right',
  closeOnClick: true,
  pauseOnHover: true,
};

const onError = (e: unknown, variables?: unknown, context?: unknown) => {
  const displayMessage = lodash.get(e, 'response.errors[0].extensions.exception.response.displayMessage', '');
  const toastMessage = displayMessage ? displayMessage : lodash.startCase(lodash.get(e, 'response.errors[0].message', ''));
  toast.error(toastMessage, toastOptions);
};

if (container) {
  // Create a root.
  const root = ReactDOMClient.createRoot(container);
  const queryClient = new QueryClient({ defaultOptions: { mutations: { onError }, queries: { onError } } });
  // queryClient.setMutationDefaults
  // queryClient.setQueryDefaults

  // Initial render: Render an element to the root.
  root.render(
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <Router>
              <ToastContainer position="top-right" autoClose={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable />
              <App />
            </Router>
          </ThemeProvider>
        </StyledEngineProvider>
      </StrictMode>
      <ReactQueryDevtools initialIsOpen={false} key="react-query-dev-tools" />
    </QueryClientProvider>
  );

  // During an update, there's no need to pass the container again.

  serviceWorkerRegistration.register();

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
}
