import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`,
          {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMDRhOTBlN2M5ODk1YmVlOTllYTRmNmU4Y2JmMWU4NCIsIm5iZiI6MTc0NDcyMzk4MC41NDksInN1YiI6IjY3ZmU2MDBjZDY0NWU0MWUwOTk5MjExZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ICB9jAh5v6fH9pZeMrS-zU6uQqEVLDw2JdRJCDmN7is',
            },
          },
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error.message);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const value = form.elements.search.value.trim();
    if (value === '') return;
    setSearchParams({ query: value });
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="search" placeholder="Enter movie name" />
        <button type="submit">Search</button>
      </form>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;
