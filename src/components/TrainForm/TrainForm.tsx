import React, { useState } from 'react';
import './TrainForm.scss';

export const TrainForm: React.FC<{
  onSearch: (departure: string, arrival: string) => void;
}> = ({ onSearch }) => {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');

  const handleDepartureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeparture(e.target.value);
  };

  const handleArrivalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArrival(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(departure, arrival);
  };

  return (
    <form onSubmit={handleSubmit} className="train-form">
      <div>
        <input
          type="text"
          className="train-form__input"
          id="departureInput"
          placeholder="Звідки"
          value={departure}
          onChange={handleDepartureChange}
          required
        />
      </div>
      <div>
        <input
          type="text"
          className="train-form__input"
          id="arrivalInput"
          placeholder="Куди"
          value={arrival}
          onChange={handleArrivalChange}
          required
        />
      </div>
      <button type="submit" className="train-form__button">
        Пошук квитків
      </button>
    </form>
  );
};
