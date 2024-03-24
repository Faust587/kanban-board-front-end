import { FC, PropsWithChildren } from "react";
import { PageWrapperStyled } from "./PageWrapper.styled.ts";
import { BoxProps } from "@mui/material";

export const PageWrapper: FC<PropsWithChildren<BoxProps>> = ({
  children,
  ...boxProps
}) => {
  return (
    <PageWrapperStyled
      width={{ lg: "80vw", md: "85vw", sm: "90vw", xs: "100vw" }}
      height="100vh"
      display="flex"
      flexDirection="column"
      {...boxProps}
    >
      {children}
    </PageWrapperStyled>
  );
};
