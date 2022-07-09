import React from 'react';

import MainPage from './pages/homeOverview';
import Content from './components/content';
import { Footer } from 'components/footer';
import { useNavigate } from 'react-router-dom';
import { RoutesConfig } from 'utils/interfaces/routesConfig';

// import { motion, useAnimation, useMotionValue } from "framer-motion";
// import styled from "@mui/styled-engine";

// interface IProps {
//   open: boolean;
//   onFormSubmit: (value: string) => void;
// }
const Home: React.FC<React.PropsWithChildren<{}>> = () => {
  // const [value, setValue] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <div style={{ overflow: 'hidden' }}>
        <MainPage openTodosApp={() => navigate(RoutesConfig.DO_IT)} />
      </div>
      <Content />
      <Footer />
    </>
  );
};
export default Home;
