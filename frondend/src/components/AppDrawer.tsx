import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { Link, Route, useLocation, useNavigate } from "react-router-dom";

import { FC, useContext } from "react";
import { AppPages, SetLogInContext } from "../types";

const linkList: ListItem[] = [
  {
    href: AppPages.Home,
    text: "Home",
  },
  {
    href: AppPages.Expenses,
    text: "Expenses",
  },
  {
    href: AppPages.Income,
    text: "Income",
  },
  {
    href: AppPages.Statistics,
    text: "Statistics",
  },
  {
    href: AppPages.Admin,
    text: "Admin",
  },
  {
    href: AppPages.Convert,
    text: "Convert",
  },
];

const AppDrawer: FC<AppDrawerProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const setLogIn = useContext(SetLogInContext);
  const logOut = () => {
    if (!setLogIn) throw new Error("setLogIn not initialized");
    setLogIn(false);
    window.localStorage.removeItem("userData");
    navigate(AppPages.Home);
  };
  return (
    <div>
      <React.Fragment>
        <Drawer anchor="left" open={isOpen} onClose={onClose}>
          <div style={{ minWidth: 100 }}>
            {linkList.map((link) => {
              return (
                <div key={"button" + link.text}>
                  <Button component={Link} to={link.href}>
                    {link.text}
                  </Button>
                </div>
              );
            })}
            <div>
              <Button onClick={onClose}>Close</Button>
            </div>
            <div>
              <Button onClick={logOut}>Log Out</Button>
            </div>
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
};

interface AppDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ListItem {
  href: string;
  text: string;
}

export default AppDrawer;
