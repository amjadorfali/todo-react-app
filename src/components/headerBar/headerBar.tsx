import React from "react";
import { Grid } from "@material-ui/core";
import styled from "styled-components";

import { DateBar } from "../../components/dateBar";

const HeaderBar: React.FC = () => {
  return (
    <Container>
      <DateBar />
    </Container>
  );
};
export default HeaderBar;

const Container = styled.div`
  padding: 1rem;
`;
