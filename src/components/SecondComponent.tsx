import { Typography, useStepperContext } from "@mui/material";
import React, { FC, useEffect, useState } from "react";

const SecondComponent: FC<SecondComponentProps> = ({ value }) => {
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    if (value.length > 10) {
      console.log("I AM HERE");
      setFlag(true);
    } else {
      setFlag(false);
    }
  }, [value]);
  return (
    <div>
      {flag ? (
        <Typography color={"error"}>{"ERROR!"}</Typography>
      ) : (
        <Typography color={"success"}>{"OK!"}</Typography>
      )}
      {/* {!flag && <Typography color={"success"}>{"OK!"}</Typography>} */}
    </div>
  );
};

interface SecondComponentProps {
  value: string;
}

export default SecondComponent;
