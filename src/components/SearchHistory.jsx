import React from 'react';
import '../styles/SearchHistory.css';

const SearchHistory = ({ history, onSelectSearch, onClearHistory }) => {
  if (history.length === 0) return null;

  return (
    <div className="search-history">
      <div className="search-history__header">
        <h4 className="search-history__title">Búsquedas recientes</h4>
        <button 
          className="search-history__clear-btn"
          onClick={onClearHistory}
        >
          Limpiar historial
        </button>
      </div>
      <ul className="search-history__list">
        {history.map((search, index) => (
          <li 
            key={index}
            className="search-history__item"
            onClick={() => onSelectSearch(search)}
          >
            <svg className="search-history__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>
            </svg>
            {search}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
