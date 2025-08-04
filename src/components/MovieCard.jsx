import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => (
  <Link to={`/movie/${movie.imdbID}`}>
    <div className="border rounded shadow hover:shadow-lg p-4 transition">
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}
        alt={movie.Title}
        className="w-full h-72 object-cover rounded"
      />
      <h2 className="mt-2 font-semibold text-lg">{movie.Title}</h2>
      <p className="text-sm text-gray-600">{movie.Year}</p>
    </div>
  </Link>
);

export default MovieCard;