import React from 'react';
import { Train } from '../../types/Train';
import { formatDate } from '../../helpers';
import './TrainList.scss';

type Props = {
  trains: Train[];
};

export const TrainList: React.FC<Props> = ({ trains }) => {
  return (
    <div className="train-list">
      <div className="train-list__content">
        {trains.map((train) => (
          <div className="train-list__cardWrap" key={train.id}>
            <div className="train-list__card train-list__cardLeft">
              <h1 className="train-list__title">{`${train.departure_station} - ${train.arrival_station}`}</h1>
              <div className="train-list__time">
                <div className="train-list__departure_time">
                  <span>Час відправлення</span>
                  <h2>{formatDate(train.departure_time)}</h2>
                </div>
                <div className="train-list__arrival_time">
                  <span>Час прибуття</span>
                  <h2>{formatDate(train.arrival_time)}</h2>
                </div>
              </div>
              <div className="train-list__capacity">
                <span>Місткість</span>
                <h2>{train.capacity}</h2>
              </div>
              <div className="train-list__fare">
                <span>Вартість квитка</span>
                <h2>{train.fare}</h2>
              </div>
            </div>
            <div className="train-list__card train-list__cardRight">
              <div className="train-list__train-icon">
                <img
                  width="35"
                  height="30"
                  src="https://img.icons8.com/glyph-neue/64/FFFFFF/city-railway-station.png"
                  alt="city-railway-station"
                />
              </div>
              <div className="train-list__number">
                <span>№ поїзда</span>
                <h3>{train.train_number}</h3>
              </div>
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/ios/50/barcode.png"
                alt="barcode"
                className="train-list__barcode"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
