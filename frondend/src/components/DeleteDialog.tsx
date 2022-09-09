import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { SimpleDialogProps } from "../types";
import RemoveIcon from "@mui/icons-material/Remove";
const options = ["Yes", "No"];

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Delete item?</DialogTitle>
      <List sx={{ pt: 0 }}>
        {options.map((option) => (
          <ListItem
            button
            onClick={() => handleListItemClick(option)}
            key={option}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <RemoveIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={option} />
          </ListItem>
        ))}
        <ListItem
          autoFocus
          button
          onClick={() => handleListItemClick("addAccount")}
        ></ListItem>
      </List>
    </Dialog>
  );
}
export default SimpleDialog;
