import React, { FormEvent, useState } from "react";
import Header from "./pages/header";
import MainPage from "./pages/mainPage";

import { motion, useAnimation, useMotionValue } from "framer-motion";
import { Grid, ButtonBase, Typography, IconButton } from "@material-ui/core";
import styled from "styled-components";

interface IProps {
  open: boolean;
  onFormSubmit: (value: string) => void;
}
const Home: React.FC = () => {
  const [value, setValue] = useState("");

  return (
    <div style={{ height: "90vh" }}>
      <Header />
      <MainPage />
    </div>
  );
};
export default Home;
