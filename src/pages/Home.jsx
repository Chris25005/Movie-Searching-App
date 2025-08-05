import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../services/omdbApi';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const [query, setQuery] = useState('Avengers');
  const [movies, setMovies] = useState([]);
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState('');

  const getMovies = async () => {
    try {
      setError('');
      const data = await fetchMovies(query, type, page);
      if (data.Response === 'True') {
        setMovies(data.Search);
        setTotalResults(parseInt(data.totalResults));
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (err) {
      setError('Something went wrong.');
    }
  };

  useEffect(() => {
    getMovies();
  }, [page, type]);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-4 gap-4">
      <h1 className="text-xl font-bold flex items-center gap-2">🎬 Movie Searching App</h1>

      <SearchBar query={query} setQuery={setQuery} onSearch={() => { setPage(1); getMovies(); }} />

      <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
        <select
          value={type}
          onChange={(e) => {
            setPage(1);
            setType(e.target.value);
          }}
          className="border px-4 py-2 rounded w-full md:w-64"
        >
          <option value="">All Types</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>
      </div>

      {error && <p className="text-red-500">{error}</p>}

     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

      {/* Pagination */}
      {totalResults > 10 && (
        <div className="flex justify-center gap-4 mt-8">
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <span className="px-4 py-2">{page}</span>
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            disabled={page >= Math.ceil(totalResults / 10)}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;