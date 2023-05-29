import React, { useState } from 'react';
import { SelectInput, DateOptions } from '..';
import { formatDate, getCurrentDate, addDays } from '../../helpers';
import './TrainForm.scss';

type Props = {
  onSearch: (departure: string, arrival: string, date: string) => void;
};

const CITY_ROUTES = ['Дніпро', 'Запоріжжя', 'Одеса', 'Харків', 'Київ', 'Львів'];

export const TrainForm: React.FC<Props> = ({ onSearch }) => {
  const [formValues, setFormValues] = useState({
    departure: '',
    arrival: '',
    date: '',
    error: false,
  });

  const handleOptionClick = (selectedDate: string) => {
    if (selectedDate === 'today') {
      const today = getCurrentDate();
      setFormValues({ ...formValues, date: today });
    } else if (selectedDate === 'tomorrow') {
      const tomorrow = formatDate(String(addDays(new Date(), 1))).split(' ')[0];
      setFormValues({ ...formValues, date: tomorrow });
    } else if (selectedDate === 'dayAfterTomorrow') {
      const dayAfterTomorrow = formatDate(String(addDays(new Date(), 2))).split(
        ' '
      )[0];
      setFormValues({ ...formValues, date: dayAfterTomorrow });
    } else if (selectedDate === 'next7days') {
      setFormValues({ ...formValues, date: 'next7days' });
    }
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
    key: string
  ) => {
    setFormValues({ ...formValues, [key]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { departure, arrival, date } = formValues;
    if (departure && arrival && date) {
      onSearch(departure, arrival, date);
      setFormValues({ ...formValues, error: false });
    } else {
      setFormValues({ ...formValues, error: true });
    }
  };

  const handleTransferArrowsClick = () => {
    const { departure, arrival } = formValues;
    if (departure && arrival) {
      setFormValues({ ...formValues, departure: arrival, arrival: departure });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="train-form">
      <div className="train-form__routes">
        <SelectInput
          id="departureSelect"
          value={formValues.departure}
          onChange={(e) => handleOnChange(e, 'departure')}
          placeholder="Звідки"
          options={CITY_ROUTES}
          arrival={formValues.arrival}
        />

        <img
          src="assets/transfer-arrows.svg"
          alt="transfer-arrows"
          className="train-form__transfer-arrows"
          onClick={handleTransferArrowsClick}
        />

        <SelectInput
          id="arrivalSelect"
          value={formValues.arrival}
          onChange={(e) => handleOnChange(e, 'arrival')}
          placeholder="Куди"
          options={CITY_ROUTES}
          departure={formValues.departure}
        />
      </div>

      <input
        type="date"
        name="date"
        className="train-form__input"
        id="dateInput"
        placeholder="Дата"
        value={formValues.date}
        min={getCurrentDate()}
        onChange={(e) => handleOnChange(e, e.target.name)}
      />

      <DateOptions
        selectedDate={formValues.date}
        onOptionClick={handleOptionClick}
      />

      <button type="submit" className="train-form__button">
        <span className="train-form__button-text">Пошук квитків</span>
      </button>

      {formValues.error && <p>Please fill in all fields</p>}
    </form>
  );
};
