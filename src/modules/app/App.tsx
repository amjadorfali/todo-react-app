import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Grid, LinearProgress, Typography } from '@mui/material';

import { HeaderBar } from 'components/headerBar';
import { AuthProvider } from 'modules/auth/authContext';
import { BounceComponent } from 'components/loaders';
import { AuthenticateUser } from 'modules/auth';
import useApiTimeout from './hooks/useApiTimeout';

import './App.css';
import { RoutesConfig } from 'utils/interfaces/routesConfig';

const Home = React.lazy(() => import('modules/home/home'));
const TodoListOverview = React.lazy(() => import('modules/todoList/todoListOverview'));

const App: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { isFetching, isMutating } = useApiTimeout();
  return (
    <AuthProvider>
      <HeaderBar />
      <BounceComponent open={!!(isFetching || isMutating)} />
      <Suspense fallback={<LinearProgress color="primary" />}>
        <Routes>
          <Route path={RoutesConfig.HOME} element={<Home />} />
          <Route path={`${RoutesConfig.USER}*`}>
            <Route path={RoutesConfig.USER_LOGIN} element={<AuthenticateUser />} />
            <Route path={RoutesConfig.USER_REGISTER} element={<AuthenticateUser />} />
            <Route
              path={RoutesConfig.USER_DETAILS}
              element={
                <Grid justifyContent={'center'} alignItems="center" container>
                  <Grid item xs={12}>
                    <Typography align="center" variant="h2">
                      Account Details
                    </Typography>
                    <Typography align="center" variant="h6">
                      Coming soon
                    </Typography>
                  </Grid>
                </Grid>
              }
            />
            <Route path="*" element={<Navigate to={RoutesConfig.USER_LOGIN} />} />
          </Route>
          <Route path={RoutesConfig.DO_IT} element={<TodoListOverview />} />
          <Route path="*" element={<Navigate to={RoutesConfig.HOME} />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

export default App;
