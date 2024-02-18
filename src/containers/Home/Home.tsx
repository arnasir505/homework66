import { Link } from 'react-router-dom';
import MealItem from '../../components/MealItem/MealItem';

const Home = () => {
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
      <MealItem/>
      <MealItem/>
      <MealItem/>
      <MealItem/>
      <MealItem/>
    </div>
  );
};

export default Home;
