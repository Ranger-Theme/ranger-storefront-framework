import type { FC } from "react";

export interface InputProps {
  type: string;
}

const Input: FC<InputProps> = ({ type = "text", ...props }) => {
  return <input type={type} {...props} />;
};

export default Input;
