import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
          {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjhmZTEwNjYwMzgyNjg5YTQ1NTQ5NjcyZmVkMzgxMyIsIm5iZiI6MTc0NDczMjc3MS4yNjIsInN1YiI6IjY3ZmU4MjYzOWQxZjc3OGFiODk5NzhmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.80Ka56-n-f25fHF8xOM4Zlv9gHRIN2_s6E4g0zy9-dk',
            },
          },
        );
        setReviews(response.data.results);
      } catch (error) {
        console.error('Error fetching reviews:', error.message);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <li key={review.id}>
              <p>
                <strong>{review.author}</strong>: {review.content}
              </p>
            </li>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </ul>
    </div>
  );
};

export default MovieReviews;
