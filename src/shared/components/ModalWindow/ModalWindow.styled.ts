import styled from "styled-components";
import { Box } from "@mui/material";

export const ModalContentWrapperStyled = styled(Box)`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContentBoxStyled = styled(Box)`
  background-color: ${(props) => props.theme.colors.white};
  width: 50%;

  border-radius: 10px;
  padding: 20px;
`;
