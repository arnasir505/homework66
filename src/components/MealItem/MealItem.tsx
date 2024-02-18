import React, { useState } from 'react';
import editIcon from '../../assets/icons/pencil-square.svg';
import trashIcon from '../../assets/icons/trash.svg';
import './MealItem.css';
import { Link } from 'react-router-dom';

interface Props {
  id: string;
  time: string;
  name: string;
  calories: number;
  deleteMeal: (id: string) => void;
}

const MealItem: React.FC<Props> = ({
  id,
  time,
  name,
  calories,
  deleteMeal,
}) => {
  const [disabled, setDisabled] = useState(false);
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
          <Link to={`/meals/edit/${id}`} className='btn ms-5'>
            <img src={editIcon} alt='edit' className='icon' />
          </Link>
          <button
            className={`btn ms-2 ${disabled ? 'disabled' : ''}`}
            onClick={async () => (
              setDisabled(true), await deleteMeal(id), setDisabled(false)
            )}
          >
            <img src={trashIcon} alt='delete' className='icon' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealItem;
