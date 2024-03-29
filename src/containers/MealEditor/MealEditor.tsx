import { useCallback, useEffect, useState } from 'react';
import { MEAL_TIMES } from '../../constants';
import { ApiMeal, MutableMeal } from '../../types';
import './MealEditor.css';
import axiosApi from '../../axiosApi';
import { useNavigate, useParams } from 'react-router-dom';

const MealEditor = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [meal, setMeal] = useState<MutableMeal>({
    time: '',
    name: '',
    calories: '',
  });
  const [isDisabled, setIsDisabled] = useState(false);

  const fetchMeal = useCallback(async () => {
    try {
      setIsDisabled(true);
      const response = await axiosApi.get<ApiMeal | null>(
        `/meals/${params.id}.json`
      );
      const meal = response.data;
      if (meal) {
        const newMeal = { ...meal, calories: meal.calories.toString() };
        setMeal(newMeal);
      }
      setIsDisabled(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDisabled(false);
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id) {
      void fetchMeal();
    }
  }, [fetchMeal]);

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
    if (params.id) {
      try {
        setIsDisabled(true);
        await axiosApi.put(`/meals/${params.id}.json`, newMeal);
        setIsDisabled(false);
      } catch (error) {
        console.log(error)
      } finally {
        setIsDisabled(false)
      }
    } else {
      try {
        setIsDisabled(true);
        await axiosApi.post('/meals.json', newMeal);
        setIsDisabled(false);
        navigate('/');
        setMeal({ time: '', name: '', calories: '' });
      } catch (error) {
        console.log(error)
      } finally {
        setIsDisabled(false)
      }
    }
  };

  return (
    <div className='container'>
      <div className='col-md-6 py-3'>
        <h2 className='mb-3'>{params.id ? 'Edit meal' : 'Add meal'}</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
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
              autoComplete='on'
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
          <button
            type='submit'
            className={`btn btn-primary ${isDisabled ? 'disabled' : ''}`}
          >
            {isDisabled ? (
              <>
                <span
                  className='spinner-border spinner-border-sm'
                  aria-hidden='true'
                ></span>
                <span role='status'> Saving...</span>
              </>
            ) : (
              'Save'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MealEditor;
