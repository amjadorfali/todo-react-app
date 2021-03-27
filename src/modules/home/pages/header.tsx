import React from "react";
// import { useMotionValue } from "framer-motion";
import { Grid, Typography, IconButton } from "@material-ui/core";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
// import Switch from "@material-ui/core/Switch";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
// import { device } from "../../../utils/helpers/device";

// interface IProps {
//   open: boolean;
//   onFormSubmit: (value: string) => void;
// }
const Header: React.FC = () => {
  // const [divVariant, setDivVariant] = useState<"active" | "inactive" | "">(
  //   "active"
  // );
  // const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setAuth(event.target.checked);
  // };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
  //   //TODO :
  // };
  return (
    <Grid container direction="row" style={{ paddingBottom: "1rem" }}>
      {" "}
      {/* <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? "Logout" : "Login"}
        />
      </FormGroup> */}
      <StyledNavBar position="static">
        <Toolbar>
          <Grid container item xs={11} alignItems={"center"}>
            <IconButton
              edge="start"
              // className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={""}>
              Photos
            </Typography>
          </Grid>
          {true && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                // open
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </StyledNavBar>
    </Grid>
    //  <Grid container direction={"column"} xs={12}>
    //   <div>
    //     <motion.img src={LeftImage} style={{ size: 1 }} />
    //   </div>
    //   <div>
    //     <motion.img src={RightImage} />
    //   </div>
    // </Grid>
  );
};
export default Header;

const StyledNavBar = styled(AppBar)`
  background: linear-gradient(
    120deg,
    rgba(142, 228, 175, 1) 0%,
    rgba(5, 56, 107, 1) 100%
  );
`;

// const StyledContainer = styled(Grid)`
//   height: 90%;
//   .title {
//     font-size: 4.5rem;
//     font-weight: 900;
//     color: var(--title-color);
//   }
//   .icon {
//     font-size: 8rem;
//     color: var(--title-color);
//   }
//   .body1 {
//     font-size: 1.5rem;
//   }
//   @media (max-width: 1000px) {
//     .title {
//       font-size: 3rem;
//     }
//     .body1 {
//       font-size: 1rem;
//     }
//     .icon {
//       font-size: 4rem;
//     }
//   }

//   @media (max-width: 700px) {
//     .title {
//       font-size: 2rem;
//     }

//     .icon {
//       font-size: 4rem;
//     }
//   }
//   @media (max-width: 340px) {
//     .title {
//       font-size: 2.5rem;
//     }
//     .body1 {
//       font-size: 1.75rem;
//     }
//     .icon {
//       font-size: 4rem;
//     }

//     .icon {
//       font-size: 4rem;
//     }
//   }
// `;

// const StyledTitle = styled(Typography)``;
// const StyledImage = styled(motion.img)`
//   width: 50%;
//   height: 50%;
// `;
