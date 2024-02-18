import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar bg-body-tertiary'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          Calorie Tracker
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
