import { MEAL_TIMES } from '../../../constants';
import './MealEditor.css';

const MealEditor = () => {
  return (
    <div className='container'>
      <div className='col-md-6 py-3'>
        <h2 className='mb-3'>Edit/Add meal</h2>
        <form>
          <div className='mb-3'>
            <select name='time' className='form-select' required>
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
            />
          </div>
          <div className='mb-3 d-flex align-items-center gap-1'>
            <input
              type='number'
              name='calories'
              className='form-control'
              placeholder='Calories'
              required
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
