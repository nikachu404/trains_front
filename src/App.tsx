import React, { useState } from 'react';
import axios from 'axios';
import { TrainForm, TrainList, Header } from './components';
import { Train } from './types/Train';
import './App.scss';

export const App: React.FC = () => {
  const [trains, setTrains] = useState<Train[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async (
    departure: string,
    arrival: string,
    date: string
  ) => {
    try {
      const response = await axios.get<Train[]>(
        `https://trains-node-js.herokuapp.com/trains?departure=${departure}&arrival=${arrival}&date=${date}`
      );

      if (!response.data.length) {
        setErrorMessage('No tickets available for the selected date ;(');
      } else {
        setErrorMessage('');
      }
      setTrains(response.data);
    } catch (error) {
      console.error('Error fetching trains:', error);
    }
  };

  return (
    <div className="App">
      <Header />

      <div className="App__content">
        <TrainForm onSearch={handleSearch} />
        {errorMessage && <p className="App__error">{errorMessage}</p>}

        {!!trains.length && <TrainList trains={trains} />}
      </div>
    </div>
  );
};
