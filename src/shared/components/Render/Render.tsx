import { FC, PropsWithChildren } from "react";

type RenderProps = {
  if: boolean;
};

export const Render: FC<PropsWithChildren<RenderProps>> = ({
  if: condition,
  children,
}) => (condition ? <>{children}</> : null);
