import React from 'react';
type Props = {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string;
  options: string[];
};

export const SelectInput: React.FC<Props> = ({
  id,
  value,
  onChange,
  placeholder,
  options,
}) => {
  return (
    <select
      className="train-form__input"
      id={id}
      value={value}
      onChange={onChange}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
