import { Link } from 'react-router-dom';
import MealItem from '../../components/MealItem/MealItem';
import { useCallback, useEffect, useState } from 'react';
import axiosApi from '../../axiosApi';
import { ApiMeals, Meal } from '../../types';

const Home = () => {
  const [meals, setMeals] = useState<Meal[]>([]);

  const fetchMeals = useCallback(async () => {
    const response = await axiosApi.get<ApiMeals | null>('/meals.json');
    const meals = response.data;
    if (meals) {
      setMeals(
        Object.keys(meals).map((id) => ({
          ...meals[id],
          id: id,
        }))
      );
    }
  }, []);

  useEffect(() => {
    void fetchMeals();
  }, [fetchMeals]);

  return (
    <div className='container'>
      <div className='d-flex align-items-center justify-content-between py-4'>
        <p className='fs-5'>
          Total calories: <span className='fw-bold'>900 kcal</span>
        </p>
        <Link to={'/meals/new'} className='btn btn-primary'>
          Add new meal
        </Link>
      </div>
      {meals.map(meal => (<MealItem/>))}
    </div>
  );
};

export default Home;
