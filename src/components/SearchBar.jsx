import React from 'react';

const SearchBar = ({ value, onChange, onSearch, onLocate }) => (
  <div className="flex gap-3 mb-4">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex-grow p-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Enter city name"
    />
    <button className="p-2 bg-blue-500 rounded-lg hover:bg-blue-600" onClick={onSearch}>
      🔍
    </button>
    <button className="p-2 bg-green-500 rounded-lg hover:bg-green-600" onClick={onLocate}>
      📍
    </button>
  </div>
);

export default SearchBar;
