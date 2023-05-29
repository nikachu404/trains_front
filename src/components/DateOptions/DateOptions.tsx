import React from 'react';
import cn from 'classnames';
import { addDays, formatDate, getCurrentDate } from '../../helpers';
import './DateOptions.scss';

type Props = {
  selectedDate: string;
  onOptionClick: (date: string) => void;
};

export const DateOptions: React.FC<Props> = ({
  selectedDate,
  onOptionClick,
}) => {
  const handleOptionClick = (date: string) => {
    onOptionClick(date);
  };

  return (
    <div className="date-options">
      <div className="date-options__row">
        <div
          className={cn('date-options__date-option', {
            'date-options__date-option--selected':
              selectedDate === getCurrentDate(),
          })}
          onClick={() => handleOptionClick('today')}
        >
          Сьогодні
        </div>

        <div
          className={cn('date-options__date-option', {
            'date-options__date-option--selected':
              selectedDate ===
              formatDate(String(addDays(new Date(), 1))).split(' ')[0],
          })}
          onClick={() => handleOptionClick('tomorrow')}
        >
          Завтра
        </div>

        <div
          className={cn('date-options__date-option', {
            'date-options__date-option--selected':
              selectedDate ===
              formatDate(String(addDays(new Date(), 2))).split(' ')[0],
          })}
          onClick={() => handleOptionClick('dayAfterTomorrow')}
        >
          Післязавтра
        </div>
      </div>

      <div
        className={cn('date-options__date-option date-options__date-option--center', {
          'date-options__date-option--selected': selectedDate === 'next7days',
        })}
        onClick={() => handleOptionClick('next7days')}
      >
        Наступні 7 днів
      </div>
    </div>
  );
};
