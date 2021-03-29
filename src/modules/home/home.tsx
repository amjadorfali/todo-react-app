import React from "react";
import Header from "./pages/header";
import MainPage from "./pages/mainPage";
import Content from "./pages/content";

// import { motion, useAnimation, useMotionValue } from "framer-motion";
// import styled from "styled-components";

// interface IProps {
//   open: boolean;
//   onFormSubmit: (value: string) => void;
// }
const Home: React.FC = () => {
  // const [value, setValue] = useState("");

  return (
    <>
      <div style={{ height: "100vh", overflow: "hidden" }}>
        <Header />
        <MainPage onStartApp={() => {}} />
      </div>
      <Content />
    </>
  );
};
export default Home;
