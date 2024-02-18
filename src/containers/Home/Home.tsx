import { Link } from 'react-router-dom';
import MealItem from '../../components/MealItem/MealItem';
import { useCallback, useEffect, useState } from 'react';
import axiosApi from '../../axiosApi';
import { ApiMeals, Meal } from '../../types';
import Spinner from '../../components/Spinner/Spinner';

const Home = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const totalCalories = meals.reduce((acc, meal) => acc + meal.calories, 0);

  const fetchMeals = useCallback(async () => {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteMeal = async (id: string) => {
    await axiosApi.delete(`/meals/${id}.json`);
    void fetchMeals();
  };

  useEffect(() => {
    void fetchMeals();
  }, [fetchMeals]);

  let mealList = (
    <div className='mt-5'>
      <Spinner />
    </div>
  );

  if (meals.length > 0 && !isLoading) {
    mealList = (
      <>
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
      </>
    );
  } else if (meals.length === 0 && !isLoading) {
    mealList = (
      <h2 className='text-center mt-5'>
        You don't have any meals. <Link to={'/meals/new'}>Click here</Link> to
        add your meal!
      </h2>
    );
  }

  return (
    <div className='container'>
      <div className='d-flex align-items-center justify-content-between py-4'>
        <p className='fs-5 m-0'>
          Total calories: <span className='fw-bold'>{totalCalories} kcal</span>
        </p>
        <Link to={'/meals/new'} className='btn btn-primary'>
          Add new meal
        </Link>
      </div>
      {mealList}
    </div>
  );
};

export default Home;
