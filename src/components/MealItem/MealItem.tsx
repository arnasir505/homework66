import React from 'react';
import editIcon from '../../assets/icons/pencil-square.svg';
import trashIcon from '../../assets/icons/trash.svg';
import './MealItem.css';

const MealItem = () => {
  return (
    <div className='card mb-3'>
      <div className='card-body d-flex align-items-center justify-content-between'>
        <div>
          <h5 className='card-title text-body-secondary fw-normal'>
            Breakfast
          </h5>
          <p className='card-text fw-bold fs-5'>Toast, eggs</p>
        </div>
        <div className='d-flex align-items-center'>
          <span className='fw-bold fs-5'>600 kcal</span>
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
