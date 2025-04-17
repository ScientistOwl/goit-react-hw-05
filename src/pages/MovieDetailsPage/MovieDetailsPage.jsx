import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import axios from 'axios';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjhmZTEwNjYwMzgyNjg5YTQ1NTQ5NjcyZmVkMzgxMyIsIm5iZiI6MTc0NDczMjc3MS4yNjIsInN1YiI6IjY3ZmU4MjYzOWQxZjc3OGFiODk5NzhmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.80Ka56-n-f25fHF8xOM4Zlv9gHRIN2_s6E4g0zy9-dk',
            },
          },
        );
        setMovieData(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error.message);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movieData) return <p>Loading movie details...</p>;

  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  return (
    <div>
      <Link to={location.state?.from || '/movies'}>Go back</Link>
      <div>
        <h1>{movieData.title}</h1>
        <img
          src={
            movieData.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`
              : defaultImg
          }
          alt={movieData.title}
        />
        <p>{movieData.overview}</p>
        <p>Release Date: {movieData.release_date}</p>
        <p>Rating: {movieData.vote_average}</p>
      </div>

      <div>
        <h2>Additional information</h2>
        <ul>
          <li>
            <Link to="cast" state={{ from: location.state?.from || '/' }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={{ from: location.state?.from || '/' }}>
              Reviews
            </Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
