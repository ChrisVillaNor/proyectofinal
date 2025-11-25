import React from 'react';
import '../styles/ThemeToggle.css';

const ThemeToggle = ({ darkMode, onToggle }) => {
  return (
    <div className="theme-toggle">
      <button 
        className={`theme-toggle__button ${darkMode ? 'theme-toggle__button--dark' : ''}`}
        onClick={onToggle}
        aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      >
        {darkMode ? (
          <svg className="theme-toggle__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
        ) : (
          <svg className="theme-toggle__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
          </svg>
        )}
        <span className="theme-toggle__text">
          {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
        </span>
      </button>
    </div>
  );
};

export default ThemeToggle;
