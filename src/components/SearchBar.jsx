import React from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ value, onChange, onClear, resultsCount }) => {
  return (
    <div className="search-bar">
      <div className="search-bar__container">
        <svg className="search-bar__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          className="search-bar__input"
          placeholder="Buscar jugador por nombre..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {value && (
          <button 
            className="search-bar__clear"
            onClick={onClear}
            aria-label="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
      </div>
      {value && (
        <p className="search-bar__results">
          Mostrando <strong>{resultsCount}</strong> resultado{resultsCount !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
};

export default SearchBar;
