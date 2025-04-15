import React from 'react';
import { Outlet } from 'react-router-dom';

const MovieDetailsPage = () => {
  return (
    <div>
      <h1>Movie Details</h1>
      <p>Here you will find all the details about the selected movie.</p>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
