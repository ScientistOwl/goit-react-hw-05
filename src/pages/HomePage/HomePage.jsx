import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
          {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjhmZTEwNjYwMzgyNjg5YTQ1NTQ5NjcyZmVkMzgxMyIsIm5iZiI6MTc0NDczMjc3MS4yNjIsInN1YiI6IjY3ZmU4MjYzOWQxZjc3OGFiODk5NzhmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.80Ka56-n-f25fHF8xOM4Zlv9gHRIN2_s6E4g0zy9-dk',
            },
          },
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error.message);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
