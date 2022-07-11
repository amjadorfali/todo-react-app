import React from 'react';
import styled from 'styled-components';

import { Grid, Typography, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LogoutIcon from '@mui/icons-material/Logout';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SideMenu from './sideMenu';
import { useAuthContext } from 'modules/auth/authContext';
import { useNavigate } from 'react-router-dom';
import { RoutesConfig } from 'utils/interfaces/routesConfig';

const Header: React.FC<React.PropsWithChildren<unknown>> = () => {
  // const [divVariant, setDivVariant] = useState<"active" | "inactive" | "">(
  //   "active"
  // );
  // const [auth, setAuth] = React.useState(true);
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setAuth(event.target.checked);
  // };
  // const controls = useAnimation();
  // const y = useMotionValue(0);
  // useEffect(() => {
  //   controls.start("active");
  // });
  // const variants = {
  //   active: {
  //     y: [y.get()],
  //   },
  //   inactive: {
  //     y: [y.get(), y.get() - 90, y.get(), y.get() - 50, y.get()],
  //     transition: { duration: 2.5 },
  //   },
  //   back: {
  //     transition: { duration: 2.5 },
  //   },
  // };

  // const imageVariants = {
  //   visible: { opacity: 1 },
  //   hidden: { opacity: 0 },
  // };const classes = useStyles();

  const { userLoggedIn, changeToken, userDetails } = useAuthContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [sideMenuOpen, setSideMenuOpen] = React.useState(false);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const onUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeUserMenu = () => {
    setAnchorEl(null);
  };

  const routeToPath = (path: string) => () => {
    navigate(path, { replace: true });
    closeUserMenu();
  };

  const handleLogOut = () => {
    routeToPath(RoutesConfig.HOME)();
    changeToken('');
  };

  return (
    <Grid container direction="row">
      <StyledNavBar position="static">
        <Toolbar>
          <Grid container item xs={11} alignItems={'center'}>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setSideMenuOpen(true)} size="large">
              <MenuIcon />
            </IconButton>
            <Drawer anchor={'left'} open={sideMenuOpen} onClose={() => setSideMenuOpen(false)}>
              <SideMenu handleCloseMenu={() => setSideMenuOpen(false)} />
            </Drawer>
            <Typography variant="h6" className={''}>
              {userLoggedIn ? `Hello ${userDetails.firstName}` : 'Just Do It'}
            </Typography>
          </Grid>
          {true && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={onUserMenuClick}
                color={userLoggedIn ? 'secondary' : 'inherit'}
                size="large"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={closeUserMenu}
              >
                {userLoggedIn
                  ? [
                      <MenuItem key="userName" disableGutters disableRipple disableTouchRipple>
                        <ListItemIcon></ListItemIcon>
                        <ListItemText>{userDetails.userName}</ListItemText>
                      </MenuItem>,
                      <MenuItem key="account" onClick={routeToPath(`${RoutesConfig.USER}${RoutesConfig.USER_DETAILS}`)}>
                        <ListItemIcon>
                          <ManageAccountsIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText>Account</ListItemText>
                      </MenuItem>,
                      <MenuItem key="log-out" onClick={handleLogOut}>
                        <ListItemIcon>
                          <LogoutIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText>Log Out</ListItemText>
                      </MenuItem>,
                    ]
                  : [
                      <MenuItem key="log-in" onClick={routeToPath(`${RoutesConfig.USER}${RoutesConfig.USER_LOGIN}`)}>
                        <ListItemIcon>
                          <LoginIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText>Log In</ListItemText>
                      </MenuItem>,
                      <MenuItem key="register" onClick={routeToPath(`${RoutesConfig.USER}${RoutesConfig.USER_REGISTER}`)}>
                        <ListItemIcon>
                          <HowToRegIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText>Register</ListItemText>
                      </MenuItem>,
                    ]}
              </Menu>
            </div>
          )}
        </Toolbar>
      </StyledNavBar>
    </Grid>
  );
};
export default Header;

const StyledNavBar = styled(AppBar)`
  background: linear-gradient(120deg, rgba(142, 228, 175, 1) 0%, rgba(5, 56, 107, 1) 100%);
`;
