import React, { useState } from 'react';
import axios from 'axios';
import { Train } from './types/Train';
import { TrainForm, TrainList } from './components';
import './App.scss';
import { Header } from './components/Header/Header';

export const App: React.FC = () => {
  const [trains, setTrains] = useState<Train[]>([]);

  const handleSearch = async (departure: string, arrival: string) => {
    try {
      const response = await axios.get<Train[]>(
        `https://trains-node-js.herokuapp.com/trains?departure=${departure}&arrival=${arrival}`
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
