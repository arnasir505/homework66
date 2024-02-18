import React from 'react';
import editIcon from '../../assets/icons/pencil-square.svg';
import trashIcon from '../../assets/icons/trash.svg';
import './MealItem.css';

interface Props {
  id: string;
  time: string;
  name: string;
  calories: number;
}

const MealItem: React.FC<Props> = ({ id, time, name, calories }) => {
  return (
    <div className='card mb-3'>
      <div className='card-body d-flex align-items-center justify-content-between'>
        <div>
          <h5 className='card-title text-body-secondary fw-normal'>
            {time.charAt(0).toUpperCase() + time.slice(1)}
          </h5>
          <p className='card-text fw-bold fs-5'>{name}</p>
        </div>
        <div className='d-flex align-items-center'>
          <span className='fw-bold fs-5'>{calories} kcal</span>
          <button className='btn ms-5'>
            <img src={editIcon} alt='edit' className='icon' />
          </button>
          <button className='btn ms-2'>
            <img src={trashIcon} alt='delete' className='icon' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealItem;
