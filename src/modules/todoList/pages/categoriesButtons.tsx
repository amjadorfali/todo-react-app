import React from 'react';

// import { useNavigate } from "react-router-dom";
import Tabs from '@mui/material/Tabs';

// import AppBar from "@mui/material/AppBar";

import Tab from '@mui/material/Tab';
import styled from '@mui/styled-engine';
import { Categories } from '../../../stores/appStore';

const CategoriesButtons: React.FC<
  React.PropsWithChildren<{
    handleChangeCategory: (value: Categories) => void;
  }>
> = ({ handleChangeCategory }) => {
  const [value, setValue] = React.useState<Categories>('personalTodos');

  const handleChange = (event: React.SyntheticEvent, newValue: Categories) => {
    setValue(newValue);
    handleChangeCategory(newValue);
  };
  return (
    // <AppBar position="static" color="transparent">
    <CustomTabs
      aria-label="simple CustomTabs example"
      value={value}
      indicatorColor={undefined}
      onChange={handleChange}
      allowScrollButtonsMobile
      variant="scrollable"
    >
      <Tab label="Personal" value={'personalTodos'} />
      <Tab label="Work" value={'workTodos'} />
      <Tab label="School" value={'schoolTodos'} />
      <Tab label="Home" value={'homeTodos'} />
      <Tab label="General" value={'generalTodos'} />
    </CustomTabs>
    // </AppBar>
  );
};
export default CategoriesButtons;

const CustomTabs = styled(Tabs)`
  .MuiTabs-indicator {
    background-color: var(--header-color);
  }
  .Mui-selected {
    color: #00000099;
  }
`;
