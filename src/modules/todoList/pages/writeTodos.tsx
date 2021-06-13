import React, { FormEvent, useState } from "react";
import styled from "styled-components";
import { TextField, Grow } from "@material-ui/core";
interface IProps {
  open: boolean;
  onFormSubmit: (value: string) => void;
}
const WriteTodos: React.FC<IProps> = ({ open, onFormSubmit }) => {
  const [value, setValue] = useState("");
  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (value) {
      onFormSubmit(value);
      
    }
  };
  return (
    <StyledContainer>
      <form onSubmit={handleFormSubmit}>
        <Grow in={true}>
          <TextField
            fullWidth
            value={value}
            placeholder="Start DO ing !"
            color={"primary"}
            onChange={event => {
              setValue(event.target.value);
            }}
          />
        </Grow>
      </form>
    </StyledContainer>
  );
};
export default WriteTodos;

const StyledContainer = styled.div`
  width: 50%;
  align-self: center;
  .MuiInput-underline:before {
    border-bottom: 1px solid #5cdb95;
  }
  .MuiInput-underline:hover:not(.Mui-disabled):before {
    border-bottom: 1px solid #05386b;
  }
  .MuiInput-underline:after {
    border-bottom: 1px solid #edf5e1;
  }
`;
