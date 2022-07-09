import React, { useEffect, useMemo, useState, useTransition } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Slide, { SlideProps } from '@mui/material/Slide';
import Grid from '@mui/material/Grid';
import { useLocation, useNavigate } from 'react-router-dom';
import { SxProps, Theme } from '@mui/material';

import Register from './register';
import LogIn from './logIn';
import { useAuthContext } from './authContext';
import { RoutesConfig } from 'utils/interfaces/routesConfig';

const slideTimeoutConfig: Partial<SlideProps> = { timeout: { enter: 600, exit: 500, appear: 700 }, mountOnEnter: true, unmountOnExit: true };

const Home: React.FC = () => {
  const { pathname } = useLocation();
  const { userDetails, userLoggedIn } = useAuthContext();
  const navigate = useNavigate();

  const { isLogin, isRegister } = useMemo(
    () => ({ isLogin: pathname.includes(RoutesConfig.USER_LOGIN), isRegister: pathname.includes(RoutesConfig.USER_REGISTER) }),
    [pathname]
  );
  const [isSignIn, setIsSignIn] = useState<boolean>(isLogin);
  const [isSignUp, setIsSignUp] = useState<boolean>(isRegister);
  const toggleSignUpSignIn = useTransition()[1];

  useEffect(() => {
    if (isLogin) {
      setIsSignUp(false);
    } else if (isRegister) {
      setIsSignIn(false);
    }
  }, [isRegister, isLogin]);

  useEffect(() => {
    if (userLoggedIn) {
      console.log('Routed from home to home???');
      navigate(RoutesConfig.HOME, { replace: true });
    }
  }, [userDetails, navigate, userLoggedIn]);

  useEffect(() => {
    // setDefaults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSlideExit = (setState: (value: React.SetStateAction<boolean>) => void) => {
    return () => toggleSignUpSignIn(() => setState(true));
  };

  return (
    <Grid sx={{ ...WrapperSX }} container component="main" justifyContent={'center'}>
      <CssBaseline />
      <Slide onExited={handleSlideExit(setIsSignUp)} direction="left" in={!!isSignIn} {...slideTimeoutConfig}>
        <LogIn goToSignUp={() => setIsSignIn(false)} />
      </Slide>
      <Slide onExited={handleSlideExit(setIsSignIn)} direction="right" in={!!isSignUp} {...slideTimeoutConfig}>
        <Register goToSignIn={() => setIsSignUp(false)} />
      </Slide>
    </Grid>
  );
};
export default Home;

const WrapperSX: SxProps<Theme> = {
  padding: 3,
  // backgroundImage: 'url(https://source.unsplash.com/random)',
  // backgroundRepeat: 'no-repeat',
  // backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
  // backgroundSize: 'cover',
  // backgroundPosition: 'center',
  // height: '120vh',
};
