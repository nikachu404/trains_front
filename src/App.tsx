import React, { useState } from 'react';
import axios from 'axios';
import { Train } from './types/Train';
import { TrainForm, TrainList } from './components';
import './App.scss';

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
      <h1>Train Page</h1>
      
      <TrainForm onSearch={handleSearch} />
      {trains.length > 0 && <TrainList trains={trains} />}
    </div>
  );
};
