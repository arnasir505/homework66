import { Link } from 'react-router-dom';
import MealItem from '../../components/MealItem/MealItem';
import { useCallback, useEffect, useState } from 'react';
import axiosApi from '../../axiosApi';
import { ApiMeals, Meal } from '../../types';

const Home = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const totalCalories = meals.reduce((acc, meal) => acc + meal.calories, 0);

  const fetchMeals = useCallback(async () => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteMeal = async (id: string) => {
    await axiosApi.delete(`/meals/${id}.json`);
    void fetchMeals();
  };

  useEffect(() => {
    void fetchMeals();
  }, [fetchMeals]);

  return (
    <div className='container'>
      <div className='d-flex align-items-center justify-content-between py-4'>
        <p className='fs-5'>
          Total calories: <span className='fw-bold'>{totalCalories} kcal</span>
        </p>
        <Link to={'/meals/new'} className='btn btn-primary'>
          Add new meal
        </Link>
      </div>
      {meals.map((meal) => (
        <MealItem
          key={meal.id}
          id={meal.id}
          time={meal.time}
          name={meal.name}
          calories={meal.calories}
          deleteMeal={deleteMeal}
        />
      ))}
    </div>
  );
};

export default Home;
