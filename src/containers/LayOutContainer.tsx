import { Box } from "@mui/material";
import { useState } from "react";
import AppDrawer from "../components/AppDrawer";
import CustomAppBar from "../components/CustomAppBar";

const LayOutContainer = (props: { children?: React.ReactNode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const onDrawerClick = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <div>
      <CustomAppBar onMenuClick={onDrawerClick} />
      <Box
        sx={{
          height: "100%",
          position: "absolute",
          left: 0,
          width: "100%",
          overflow: "hidden",
          // backgroundColor: "#112618",
        }}
      >
        <AppDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
        {props.children}
      </Box>
    </div>
  );
};

export default LayOutContainer;
