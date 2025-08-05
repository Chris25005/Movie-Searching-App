import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieDetails } from '../services/omdbApi';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const getDetails = async () => {
      try {
        const data = await fetchMovieDetails(id);
        if (data.Response === 'True') {
          setMovie(data);
        } else {
          setError(data.Error);
        }
      } catch {
        setError('Failed to fetch movie details.');
      }
    };
    getDetails();
  }, [id]);

  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!movie) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link to="/" className="text-blue-500 underline mb-4 inline-block">← Back</Link>
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300'}
          alt={movie.Title}
          className="w-full md:w-64 rounded"ppo
        />
        <div>
          <h2 className="text-2xl font-bold mb-2">{movie.Title} ({movie.Year})</h2>
          <p className="mb-2"><strong>Genre:</strong> {movie.Genre}</p>
          <p className="mb-2"><strong>Director:</strong> {movie.Director}</p>
          <p className="mb-2"><strong>Actors:</strong> {movie.Actors}</p>
          <p className="mb-2"><strong>Plot:</strong> {movie.Plot}</p>
          <p className="mb-2"><strong>Ratings:</strong></p>
          <ul className="list-disc list-inside">
            {movie.Ratings?.map((rating, index) => (
              <li key={index}>{rating.Source}: {rating.Value}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
