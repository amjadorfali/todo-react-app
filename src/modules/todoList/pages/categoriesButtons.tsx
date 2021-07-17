import React from "react";

// import { RouteComponentProps } from "react-router";
import Tabs from "@material-ui/core/Tabs";
// import AppBar from "@material-ui/core/AppBar";

import Tab from "@material-ui/core/Tab";
import styled from "styled-components";
import { Categories } from "../../../stores/appStore";

const CategoriesButtons: React.FC<{
  handleChangeCategory: (value: Categories) => void;
}> = ({ handleChangeCategory }) => {
  const [value, setValue] = React.useState<Categories>("personalTodos");

  const handleChange = (event: React.ChangeEvent<{}>, newValue: Categories) => {
    setValue(newValue);
    handleChangeCategory(newValue);
  };
  return (
    // <AppBar position="static" color="transparent">
    <CustomTabs
      aria-label="simple CustomTabs example"
      value={value}
      onChange={handleChange}
      scrollButtons={"on"}
      variant="scrollable"
    >
      <Tab label="Personal" value={"personalTodos"} />
      <Tab label="Work" value={"workTodos"} />
      <Tab label="School" value={"schoolTodos"} />
      <Tab label="Home" value={"homeTodos"} />
      <Tab label="General" value={"generalTodos"} />
    </CustomTabs>
    // </AppBar>
  );
};
export default CategoriesButtons;

const CustomTabs = styled(Tabs)`
  .MuiTabs-indicator {
    background-color: var(--header-color);
  }
`;
