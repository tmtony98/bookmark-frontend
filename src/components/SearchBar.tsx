import React from 'react';

interface SearchBarProps {
  query: string;
  setQuery: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery }) => (
  <input
    type="text"
    placeholder="Search by title or tag..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    className="w-full p-2 border rounded mb-4"
  />
);

export default SearchBar;
