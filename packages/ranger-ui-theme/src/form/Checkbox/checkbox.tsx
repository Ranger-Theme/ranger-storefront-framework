import type { FC } from "react";

export interface CheckboxProps {
  checked: boolean;
}

const Checkbox: FC<CheckboxProps> = ({ ...props }) => {
  return <input type="checkbox" {...props} />;
};

export default Checkbox;
