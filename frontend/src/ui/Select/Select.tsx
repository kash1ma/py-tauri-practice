import { FC } from "react";

interface SelectOption {
  value: string | number;
  label: string;
}

export interface ISelectProps {
  options: SelectOption[];
  name?: string;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: FC<ISelectProps> = ({options, name, id, onChange}) => {
  return (
    <div>
      <select  style={{width:70, height: 30}} name={name} id={id} onChange={onChange}>
        {options.map((option, index) => (
          <option style={{width:70, height: 30}} key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
