import { FC, PropsWithChildren } from "react";
import {
  ModalContentBoxStyled,
  ModalContentWrapperStyled,
} from "./ModalWindow.styled.ts";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type ModalWindowProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
};

export const ModalWindow: FC<PropsWithChildren<ModalWindowProps>> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <Modal open={isOpen}>
      <ModalContentWrapperStyled>
        <ModalContentBoxStyled>
          <>
            <Box
              display="flex"
              width="100%"
              justifyContent="space-between"
              alignItems="center"
              mb={4}
            >
              <Typography variant="h5">{title}</Typography>

              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            {children}
          </>
        </ModalContentBoxStyled>
      </ModalContentWrapperStyled>
    </Modal>
  );
};
