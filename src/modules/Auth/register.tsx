import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { useForm, useWatch } from 'react-hook-form';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment } from '@mui/material';
import { Link } from 'react-router-dom';

import useSignUp from './hooks/useSignUp';
import { useAuthContext } from './authContext';
import VerificationLoader from 'components/loaders/verificationLoader';
import useVerifyUniqueUserName from './hooks/useVerifyUniqueUserName';
import useDebounce from 'hooks/useDebounce';
import { ControlledTextField } from './components';
import CustomToolTip from 'components/tooltip/tooltip';
import styled from 'styled-components';
import { RoutesConfig } from 'utils/interfaces/routesConfig';

interface Props {
  goToSignIn: () => void;
}
type FormValues = {
  userName: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  'password-2': string;
};

// const PrevTitle = document.title;
const Register: React.FC<Props> = React.forwardRef<HTMLDivElement, Props>(({ goToSignIn }, ref) => {
  const { mutateAsync } = useSignUp();
  const { changeToken } = useAuthContext();
  const { handleSubmit: handleReactFormSubmit, control, formState, getValues, setError, clearErrors } = useForm<FormValues>({ mode: 'onTouched' });
  const userName = useWatch({ name: 'userName', control: control });
  const { debouncedValue: debouncedUserName } = useDebounce(
    formState.errors['userName'] && formState.errors['userName'].type === 'pattern' ? '' : userName,
    1000
  );
  const { enabled: verifyUniqueUserName, isLoading: verifyingUniqueUserName, userNameIsUnique } = useVerifyUniqueUserName(debouncedUserName);

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  useEffect(() => {
    if (!userNameIsUnique && formState.errors.userName?.type !== 'customError') {
      setError('userName', { message: 'User Name already exists', type: 'customError' });
    } else if (formState.errors.userName?.type === 'customError' && userNameIsUnique) {
      clearErrors('userName');
    }
  }, [setError, userNameIsUnique, formState, clearErrors]);

  const handleSubmit = async (data: { [key: string]: any }, event?: BaseSyntheticEvent<object, any, any>) => {
    event && event.preventDefault();
    await mutateAsync(
      {
        createUserInput: {
          userName: data.userName || '',
          password: data.password || '',
          email: data.email || '',
          firstName: data.firstName || '',
          lastName: data.lastName || '',
        },
      },
      {
        onSuccess: ({ signUp: { accessToken } }) => changeToken(accessToken),
      }
    );
  };

  // useEffect(() => {
  //   document.title = 'Register';

  //   return () => {
  //     document.title = PrevTitle;
  //   };
  // }, []);

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
          <ArticleOutlinedIcon />
        </Avatar>

        <Box component="form" onSubmit={handleReactFormSubmit(handleSubmit)} noValidate={false} sx={{ mt: 1 }}>
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
              placeholder: 'Cool-Me',
              onClick: (e) => e.stopPropagation(),
              label: 'User Name',
              name: 'userName',
              fullWidth: true,
              InputLabelProps: {
                required: true,
              },
              sx: { minHeight: '5rem' },
              autoComplete: 'userName',

              InputProps: {
                endAdornment: verifyUniqueUserName && <VerificationLoader loading={verifyingUniqueUserName} success={userNameIsUnique} />,
                startAdornment: <CustomToolTip title="Will be used for signing in" />,
              },
            }}
          />
          <Box display={'flex'} sx={{ minHeight: '5rem', gap: '1rem' }} justifyContent={'space-between'}>
            <ControlledTextField
              controller={{
                rules: {
                  required: { value: true, message: 'Please enter your First Name' },
                },
                defaultValue: '',
                name: 'firstName',
              }}
              control={control}
              textFieldProps={{
                margin: 'normal',
                placeholder: 'Me',
                label: 'First Name',
                name: 'firstName',
                InputLabelProps: { required: true },
                autoComplete: 'firstName',
              }}
            />
            <ControlledTextField
              controller={{
                defaultValue: '',
                name: 'lastName',
              }}
              control={control}
              textFieldProps={{
                margin: 'normal',
                label: 'Last Name',
                name: 'lastName',
                autoComplete: 'lastName',
              }}
            />
          </Box>
          <ControlledTextField
            textFieldProps={{
              margin: 'normal',
              placeholder: 'me@gmail.com',
              fullWidth: true,
              label: 'Email',
              name: 'email',
              InputLabelProps: { required: true },
              autoComplete: 'email',
              sx: { minHeight: '5rem' },
            }}
            controller={{
              rules: {
                required: { value: true, message: 'Please enter your Email' },
                pattern: {
                  // eslint-disable-next-line no-useless-escape
                  value: RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
                  message: 'Invalid Email Address',
                },
              },
              defaultValue: '',
              name: 'email',
            }}
            control={control}
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
                validate: (currV) => {
                  if (currV && currV.length < 8) return 'Must have a minimum length of 8';

                  const pass2 = getValues('password-2');
                  if (!pass2 || !currV) return true;
                  return currV === pass2 ? true : "Passwords Don't Match";
                },

                deps: 'password-2',
              },
              defaultValue: '',
              name: 'password',
            }}
            control={control}
          />

          <ControlledTextField
            textFieldProps={{
              margin: 'normal',
              fullWidth: true,
              label: 'Re-enter Password',
              name: 'password-2',
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
                required: { value: true, message: 'Please re-enter your Password' },
                validate: (currV) => {
                  if (currV && currV.length < 8) return 'Must have a minimum length of 8';
                  const pass = getValues('password');
                  if (!pass || !currV) return true;
                  return currV === pass ? true : "Passwords Don't Match";
                },
                deps: 'password',
              },
              defaultValue: '',
              name: 'password-2',
            }}
            control={control}
          />
          <Button
            type="submit"
            disabled={!!Object.keys(formState.errors).length || (!!debouncedUserName && !userNameIsUnique)}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Grid container>
            <Grid item>
              <StyledLink to={`../${RoutesConfig.USER_LOGIN}`} children="Already have an account? Sign In" />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
});
export default Register;

export const StyledLink = styled(Link)`
  color: var(--header-color);
  text-decoration: none;

  :visited {
    color: var(--body-color);
  }
  :hover {
    text-decoration: underline;
  }
`;
