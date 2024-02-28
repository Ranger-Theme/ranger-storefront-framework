import type { FC } from "react";

export interface InputProps {
  type: string;
}

const Input: FC<InputProps> = ({ ...props }) => {
  return <input {...props} />;
};

export default Input;
