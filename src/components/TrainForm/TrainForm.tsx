import React, { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="departureInput" className="form-label">
          Початкова точка:
        </label>
        <input
          type="text"
          className="form-input"
          id="departureInput"
          value={departure}
          onChange={handleDepartureChange}
        />
      </div>
      <div>
        <label htmlFor="arrivalInput" className="form-label">
          Кінцева точка:
        </label>
        <input
          type="text"
          className="form-input"
          id="arrivalInput"
          value={arrival}
          onChange={handleArrivalChange}
        />
      </div>
      <button type="submit">Пошук поїздів</button>
    </form>
  );
};
