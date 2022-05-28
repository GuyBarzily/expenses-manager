import TextField from "@mui/material/TextField";

import React, { FC } from "react";
import SecondComponent from "./SecondComponent";

const FirstComponent: FC<FirstComponentProps> = (props) => {
  const { callback, value } = props;
  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        onChange={callback}
        value={value}
        error={!value}
        helperText="I AM TEXT_FIELD"
      />
      <SecondComponent value={value} />
    </div>
  );
};

interface FirstComponentProps {
  callback: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  value: string;
}

export default FirstComponent;

// <div className="App">
//   <Button variant="contained" onClick={() => setCount(count + 1)}>
//     +1
//   </Button>
//   <br />
//   {count}
//   <FirstComponent value={textValue} callback={onChange} />
//   <br />
//   {textValue}
// </div>
