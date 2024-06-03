import React, { useState } from 'react';

const SearchBar = ({ items, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    showSuggestions(term);
  };

  const showSuggestions = (term) => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(term.toLowerCase())
    );
    setSuggestions(filteredItems.slice(0, 5)); // Limit suggestions to first 5
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-10 flex justify-between">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search an Instrument..."
          className="rounded-md block w-full py-3 pl-10 pr-4 text-base font-normal leading-7 text-gray-900 placeholder-gray-500 bg-white border border-white focus:ring-white focus:border-white focus:ring-offset-2"
        />

        {/* Suggestions dropdown */}
        {suggestions.length > 0 && (
          <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
            <ul className="py-1">
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  className="cursor-pointer px-3 py-2 text-sm text-gray-900 hover:bg-gray-100"
                  onClick={() => setSearchTerm(item.title)}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="inline-flex items-center justify-center px-6 py-4 text-sm font-bold tracking-widest text-white uppercase transition-all duration-200 bg-amber-950 border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white hover:bg-amber-900 rounded-md"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
