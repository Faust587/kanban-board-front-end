import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { FC } from "react";
import { Typography } from "@mui/material";

type AlertProps = {
  open: boolean;
  title: string;
  content?: string | null;
  onClose: () => void;
};

export const Alert: FC<AlertProps> = ({ open, onClose, title, content }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{content}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus>
          Got It!
        </Button>
      </DialogActions>
    </Dialog>
  );
};
