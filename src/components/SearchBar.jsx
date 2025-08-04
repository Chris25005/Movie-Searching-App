
import React from 'react';

const SearchBar = ({ query, setQuery, onSearch }) => (
  <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
    <input
      type="text"
      className="border px-4 py-2 rounded w-full sm:w-96"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && onSearch()}
    />
    <button
      className="bg-blue-600 text-white px-6 py-2 rounded"
      onClick={onSearch}
    >
      Search
    </button>
  </div>
);

export default SearchBar;
