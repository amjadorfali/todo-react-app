import React from "react";

import MainPage from "./pages/mainPage";
import Content from "./pages/content";
import Footer from "./pages/footer";
import { RouteComponentProps } from "react-router";

// import { motion, useAnimation, useMotionValue } from "framer-motion";
// import styled from "styled-components";

// interface IProps {
//   open: boolean;
//   onFormSubmit: (value: string) => void;
// }
const Home: React.FC<{} & RouteComponentProps<{}>> = ({
  match: { path },
  history,
}) => {
  // const [value, setValue] = useState("");

  return (
    <>
      <div style={{ overflow: "hidden" }}>
        <MainPage onStartApp={() => history.push("todo-app")} />
      </div>
      <Content />
      <Footer />
    </>
  );
};
export default Home;
