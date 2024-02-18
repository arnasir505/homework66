import { useState } from 'react';
import { MEAL_TIMES } from '../../constants';
import { MutableMeal } from '../../types';
import './MealEditor.css';
import axiosApi from '../../axiosApi';

const MealEditor = () => {
  const [meal, setMeal] = useState<MutableMeal>({
    time: '',
    name: '',
    calories: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setMeal((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMeal = {
      ...meal,
      calories: Number(meal.calories),
    };
    console.log(newMeal);
    await axiosApi.post('/meals.json', newMeal);
  };

  return (
    <div className='container'>
      <div className='col-md-6 py-3'>
        <h2 className='mb-3'>Edit/Add meal</h2>
        <form onSubmit={(e) => handleSubmit(e)} autoComplete='on'>
          <div className='mb-3'>
            <select
              name='time'
              className='form-select'
              required
              value={meal.time}
              onChange={(e) => handleChange(e)}
            >
              <option disabled value={''}>
                Choose...
              </option>
              {MEAL_TIMES.map((item) => (
                <option value={item.time} key={item.time}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <div className='mb-3'>
            <input
              type='text'
              name='name'
              className='form-control'
              placeholder='Meal description'
              required
              value={meal.name}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className='mb-3 d-flex align-items-center gap-1'>
            <input
              type='number'
              name='calories'
              className='form-control'
              placeholder='Calories'
              required
              value={meal.calories}
              onChange={(e) => handleChange(e)}
            />
            <span className='fw-bold'>kcal</span>
          </div>
          <button type='submit' className='btn btn-primary'>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default MealEditor;
