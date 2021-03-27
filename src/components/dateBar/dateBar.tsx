import React, { useEffect, useState } from "react";
import moment from "moment";
import { Typography } from "@material-ui/core";
import { device } from "../../utils/helpers/device";
import styled from "styled-components";
const DateBar: React.FC = () => {
  const [time, setTime] = useState<string>();
  const [date, setDate] = useState<string>();
  const [enterClass, setEnterClass] = useState<string>();
  useEffect(() => {
    const dateInterval = setInterval(() => {
      setTime(moment().format("h:mm:ss a"));
      setDate(moment().format("dddd , MMMM Do"));
    }, 1000);

    return () => {
      clearInterval(dateInterval);
    };
  }, []);
  useEffect(() => {
    setEnterClass("date-active ");
  }, [setEnterClass]);
  return (
    <Wrapper>
      <StyledDate variant={"h4"} className={`date ${enterClass}`}>
        {date}
      </StyledDate>
      <StyledTime variant={"h5"}>{time}</StyledTime>
    </Wrapper>
  );
};

export default DateBar;

const StyledDate = styled(Typography)`
  color: var(--header-color);
`;
const StyledTime = styled(Typography)`
  color: var(--text-color);
  align-self: center;
  // @media ${device.mobileS} {
  //   max-width: 100px;
  //   font-size: 1rem;
  //   background-color: black;
  // }
`;

const Wrapper = styled.div`
  display: flex;
  flex: row wrap;
  justify-content: space-between;
  min-height: 100px;
  .date {
    opacity: 0.01;
  }

  .date.date-active {
    opacity: 1;
    transition: opacity 3000ms ease-in;
  }

  @media ${device.mobileL} {
    flex-direction: column;
    text-align: center;
  }
`;
