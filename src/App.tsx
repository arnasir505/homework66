import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './containers/Home/Home';
import MealEditor from './containers/Home/MealEditor/MealEditor';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/meals/new' element={<MealEditor />} />
        <Route
          path='*'
          element={<h1 className='text-center mt-5'>Not Found!</h1>}
        />
      </Routes>
    </>
  );
}

export default App;
