import React from 'react';
import { Train } from '../../types/Train';

type Props = {
  trains: Train[];
}

export const TrainList: React.FC<Props> = ({ trains }) => {
  return (
    <div>
      <h2>Список доступних поїздів:</h2>
      <ul>
        {trains.map((train) => (
          <li key={train.id}>{train.train_number}</li>
        ))}
      </ul>
    </div>
  );
};
