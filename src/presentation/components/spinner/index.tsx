import * as React from "react";

type Props = React.HTMLAttributes<HTMLElement>;

export const Spinner: React.FC<Props> = (props: Props) => (
  <span {...props} data-testid="spinner">...Loading</span>
);
