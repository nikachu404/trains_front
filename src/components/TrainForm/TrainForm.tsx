import React, { useState } from 'react';
import cn from 'classnames';
import { SelectInput } from '..';
import { formatDate, getCurrentDate, addDays } from '../../helpers';
import './TrainForm.scss';

type Props = {
  onSearch: (departure: string, arrival: string, date: string) => void;
};

export const TrainForm: React.FC<Props> = ({ onSearch }) => {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState(false);

  const handleTodayClick = () => {
    const today = getCurrentDate();
    setDate(today);
  };

  const handleTomorrowClick = () => {
    const tomorrow = formatDate(String(addDays(new Date(), 1))).split(' ')[0];
    setDate(tomorrow);
  };

  const handleDayAfterTomorrowClick = () => {
    const dayAfterTomorrow = formatDate(String(addDays(new Date(), 2))).split(
      ' '
    )[0];
    setDate(dayAfterTomorrow);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (departure && arrival && date) {
      onSearch(departure, arrival, date);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleTransferArrowsClick = () => {
    if (departure && arrival) {
      setDeparture(arrival);
      setArrival(departure);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="train-form">
      <div className="train-form__routes">
        <SelectInput
          id="departureSelect"
          value={departure}
          onChange={(e) => setDeparture(e.target.value)}
          placeholder="Звідки"
          options={['Дніпро', 'Запоріжжя', 'Одеса', 'Харків', 'Київ', 'Львів']}
          arrival={arrival}

        />

        <img
          src="assets/transfer-arrows.svg"
          alt="transfer-arrows"
          className="train-form__transfer-arrows"
          onClick={handleTransferArrowsClick}
        />

        <SelectInput
          id="arrivalSelect"
          value={arrival}
          onChange={(e) => setArrival(e.target.value)}
          placeholder="Куди"
          options={['Дніпро', 'Запоріжжя', 'Одеса', 'Харків', 'Київ', 'Львів']}
          departure={departure}
        />
      </div>

      <input
        type="date"
        className="train-form__input"
        id="dateInput"
        placeholder="Дата"
        value={date}
        min={getCurrentDate()}
        onChange={(e) => setDate(e.target.value)}
      />

      <div className="train-form__date-options">
        <div
          className={cn('train-form__date-option', {
            'train-form__date-option--selected': date === getCurrentDate(),
          })}
          onClick={handleTodayClick}
        >
          Сьогодні
        </div>

        <div
          className={cn('train-form__date-option', {
            'train-form__date-option--selected':
              date === formatDate(String(addDays(new Date(), 1))).split(' ')[0],
          })}
          onClick={handleTomorrowClick}
        >
          Завтра
        </div>

        <div
          className={cn('train-form__date-option', {
            'train-form__date-option--selected':
              date === formatDate(String(addDays(new Date(), 2))).split(' ')[0],
          })}
          onClick={handleDayAfterTomorrowClick}
        >
          Післязавтра
        </div>
      </div>
      <div
        className={cn(
          'train-form__date-option train-form__date-option--center',
          {
            'train-form__date-option--selected': date === 'next7days',
          }
        )}
        onClick={() => setDate('next7days')}
      >
        Наступні 7 днів
      </div>

      <button type="submit" className="train-form__button">
        <span className="train-form__button-text">Пошук квитків</span>
      </button>

      {error && <p>Please fill in all fields</p>}
    </form>
  );
};
