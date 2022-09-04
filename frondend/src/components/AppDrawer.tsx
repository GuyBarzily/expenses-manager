import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { Link } from "react-router-dom";

import { FC } from "react";
import { AppPages } from "../types";

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
            <Button onClick={onClose}>Close</Button>
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
