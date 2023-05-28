import React, { useState } from 'react';
import axios from 'axios';
import { TrainForm, TrainList, Header } from './components';
import { Train } from './types/Train';
import './App.scss';

export const App: React.FC = () => {
  const [trains, setTrains] = useState<Train[]>([]);

  const handleSearch = async (
    departure: string,
    arrival: string,
    date: string
  ) => {
    try {
      const response = await axios.get<Train[]>(
        `https://trains-node-js.herokuapp.com/trains?departure=${departure}&arrival=${arrival}&date=${date}`
      );
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
        <TrainList trains={trains} />
      </div>
    </div>
  );
};
