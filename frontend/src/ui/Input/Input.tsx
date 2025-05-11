import React, { FC } from "react";
import { TypesInput } from "../../types/enums/InputEnums";

interface IInputProps {
  initialValue: string | number;
  type: TypesInput;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<IInputProps> = ({ initialValue, type, onChange, placeholder }) => {
  return (
    <div>
      <input placeholder={placeholder} type={type} onChange={onChange} value={initialValue} />
    </div>
  );
};

export default Input;
