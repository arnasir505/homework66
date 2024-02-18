import React from 'react';

const Home = () => {
  return (
    <div className='container'>
      <div className='d-flex align-items-center justify-content-between py-4'>
        <p className='fs-5'>
          Total calories: <span className='fw-bold'>900 kcal</span>
        </p>
        <button className='btn btn-primary'>Add new meal</button>
      </div>
    </div>
  );
};

export default Home;
