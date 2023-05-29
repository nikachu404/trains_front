import React from 'react';
type Props = {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string;
  options: string[];
  arrival?: string;
  departure?: string;
};

export const SelectInput: React.FC<Props> = ({
  id,
  value,
  onChange,
  placeholder,
  options,
  arrival,
  departure,
}) => {
  return (
    <select
      className="train-form__input"
      id={id}
      value={value}
      name={arrival ? 'departure': 'arrival'}
      onChange={onChange}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option
          key={option}
          value={option}
          hidden={option === arrival || option === departure}
        >
          {option}
        </option>
      ))}
    </select>
  );
};
