import React, { FormEvent, useState } from 'react';
import styled from '@mui/styled-engine';
import { TextField, Grow, IconButton } from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
interface IProps {
  open: boolean;
  onFormSubmit: (value: string) => void;
}
const WriteTodos: React.FC<React.PropsWithChildren<IProps>> = ({ open, onFormSubmit, children }) => {
  const [value, setValue] = useState('');
  const [toggleInput, setToggleInput] = useState(false);
  const inputEl = React.useRef<HTMLDivElement | null>(null);

  const handleFormSubmit = (event?: FormEvent) => {
    event && event.preventDefault();
    if (inputEl) {
      inputEl.current?.blur();
    }
    if (value) {
      onFormSubmit(value);
      setValue('');
    }
  };
  const handleOnPlusClick = () => {
    if (!value && inputEl) {
      if (!toggleInput) {
        inputEl.current?.focus();
      } else {
        inputEl.current?.blur();
      }
      setToggleInput(!toggleInput);
    } else {
      handleFormSubmit();
    }
  };
  return (
    <Grow timeout={800} in={open}>
      <StyledContainer>
        <Grow timeout={1000} in={toggleInput}>
          <form onSubmit={handleFormSubmit}>
            <TextField
              inputRef={inputEl}
              fullWidth
              value={value}
              placeholder="Start DO ing !"
              color={'primary'}
              onChange={(event) => {
                setValue(event.target.value);
              }}
            />
          </form>
        </Grow>
        <IconButton style={{ position: 'absolute', right: '-1rem', bottom: '2rem' }} onClick={() => handleOnPlusClick()}>
          <AddCircleOutlinedIcon fontSize={'large'} />
        </IconButton>
      </StyledContainer>
    </Grow>
  );
};
export default WriteTodos;

const StyledContainer = styled('div')`
  position: relative;
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
