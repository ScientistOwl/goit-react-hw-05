import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjhmZTEwNjYwMzgyNjg5YTQ1NTQ5NjcyZmVkMzgxMyIsIm5iZiI6MTc0NDczMjc3MS4yNjIsInN1YiI6IjY3ZmU4MjYzOWQxZjc3OGFiODk5NzhmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.80Ka56-n-f25fHF8xOM4Zlv9gHRIN2_s6E4g0zy9-dk',
            },
          },
        );
        setCast(response.data.cast);
      } catch (error) {
        console.error('Error fetching cast:', error.message);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {cast.length > 0 ? (
          cast.map((actor) => (
            <li key={actor.cast_id}>
              <p>
                <strong>{actor.name}</strong> as {actor.character}
              </p>
            </li>
          ))
        ) : (
          <p>No cast information available.</p>
        )}
      </ul>
    </div>
  );
};

export default MovieCast;
