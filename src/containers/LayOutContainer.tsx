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
      <AppDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      {props.children}
    </div>
  );
};

export default LayOutContainer;
