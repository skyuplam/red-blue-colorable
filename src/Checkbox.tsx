import type React from "react";
import { useId } from "react";

interface Props {
  onCheck: (checked: boolean) => void;
  label: string;
}

export const Checkbox: React.FC<
  Omit<React.ComponentProps<"input">, "id" | "type"> & Props
> = ({ onCheck, label, ...props }) => {
  const id = useId();

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    onCheck(evt.target.checked);
  };

  return (
    <div className="container">
      <label htmlFor={id}>
        <input id={id} type="checkbox" onChange={handleOnChange} {...props} />
        {label}
      </label>
    </div>
  );
};
