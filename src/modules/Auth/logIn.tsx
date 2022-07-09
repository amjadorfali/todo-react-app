import React, { BaseSyntheticEvent, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';

import useSignIn from './hooks/useSignIn';
import { useAuthContext } from './authContext';
import { StyledLink } from './register';
import { useForm } from 'react-hook-form';
import { ControlledTextField } from './components';
import { IconButton, InputAdornment } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { RoutesConfig } from 'utils/interfaces/routesConfig';

interface Props {
  goToSignUp: () => void;
}

type FormValues = {
  userName: string;
  password: string;
};

const LogIn: React.FC<Props> = React.forwardRef<HTMLDivElement, Props>(({ goToSignUp }, ref) => {
  const { mutateAsync } = useSignIn();
  const { changeToken } = useAuthContext();
  const { handleSubmit: handleReactFormSubmit, control, formState } = useForm<FormValues>({ mode: 'onTouched' });

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (data: FormValues, event?: BaseSyntheticEvent<object, any, any>) => {
    event && event.preventDefault();

    await mutateAsync(
      { user: { userName: data.userName || '', password: data.password || '' } },
      {
        onSuccess: ({ signIn: { accessToken } }) => changeToken(accessToken),
      }
    );
  };
  return (
    <Grid ref={ref} item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOpenOutlinedIcon />
        </Avatar>

        <Box component="form" noValidate={false} onSubmit={handleReactFormSubmit(handleSubmit)} sx={{ mt: 1 }}>
          <ControlledTextField
            controller={{
              rules: {
                required: { value: true, message: 'Please enter your User Name' },
                pattern: { value: RegExp(/.{3,20}/), message: 'Must be between 3 and 20 characters' },
              },
              defaultValue: '',
              name: 'userName',
            }}
            control={control}
            textFieldProps={{
              margin: 'normal',
              label: 'User Name',
              name: 'userName',
              fullWidth: true,
              InputLabelProps: {
                required: true,
              },
              sx: { minHeight: '5rem' },
              autoComplete: 'userName',
            }}
          />
          <ControlledTextField
            textFieldProps={{
              margin: 'normal',
              fullWidth: true,
              label: 'Password',
              name: 'password',
              InputLabelProps: { required: true },
              autoComplete: 'current-password',
              type: showPassword ? 'text' : 'password',
              sx: { minHeight: '5rem' },
              InputProps: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={toggleShowPassword} onMouseDown={toggleShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            controller={{
              rules: {
                required: { value: true, message: 'Please enter your Password' },
                validate: (currV) => (currV && currV.length < 8 ? 'Must have a minimum length of 8' : true),
              },
              defaultValue: '',
              name: 'password',
            }}
            control={control}
          />
          <Button disabled={!!Object.keys(formState.errors).length} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Log In
          </Button>
          <Grid container>
            <Grid item>
              <StyledLink to={`../${RoutesConfig.USER_REGISTER}`} children="Already have an account? Sign In" />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
});
export default LogIn;
