import { Button, ButtonProps } from "@/components/ui/button";
import React, { ReactNode } from "react";
import { LoadingSpinner } from "./spinner";

type LoadingButtonProps = {
  loading?: boolean;
  text?: string;
  children?: ReactNode;
} & ButtonProps;

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  children,
  text = "Processing",
  ...props
}) => {
  return loading == true ? (
    <Button disabled={loading} {...props}>
      <LoadingSpinner size={14} className="mx-1" />
      {text}
    </Button>
  ) : (
    <Button {...props}>{children}</Button>
  );
};

export default LoadingButton;
