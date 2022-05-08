import React from "react";

import MainPage from "./pages/mainPage";
import Content from "./pages/content";
import Footer from "./pages/footer";
import { useNavigate } from "react-router-dom";

// import { motion, useAnimation, useMotionValue } from "framer-motion";
// import styled from "styled-components";

// interface IProps {
//   open: boolean;
//   onFormSubmit: (value: string) => void;
// }
const Home: React.FC<React.PropsWithChildren<{}>> = () => {
  // const [value, setValue] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <MainPage onStartApp={() => navigate("todo-app")} />
      </div>
      <Content />
      <Footer />
    </>
  );
};
export default Home;
