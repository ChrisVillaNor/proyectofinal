import React from 'react';
import '../styles/StatsPanel.css';

const StatsPanel = ({ stats, darkMode, searchHistory, onSelectSearch, onClearHistory }) => {
  return (
    <div className={`stats-panel ${darkMode ? 'stats-panel--dark' : ''}`}>
      <div className="stats-panel__grid">
        <div className="stats-panel__card stats-panel__card--yellow">
          <div className="stats-panel__content">
            <p className="stats-panel__label-top">JUGADORES EN TABLA</p>
            <h3 className="stats-panel__value">{stats.total}</h3>
            <p className="stats-panel__favorites">Favoritos: {stats.favorites}</p>
          </div>
        </div>

        <div className="stats-panel__card">
          <div className="stats-panel__content">
            <p className="stats-panel__label-top">PROMEDIO DE GOLES</p>
            <h3 className="stats-panel__value">{stats.avgGoals.toFixed(1)}</h3>
            <p className="stats-panel__subtitle-text">Total goles: {stats.totalGoals}</p>
          </div>
        </div>

        <div className="stats-panel__card">
          <div className="stats-panel__content">
            <p className="stats-panel__label-top">PROMEDIO DE EDAD</p>
            <h3 className="stats-panel__value">{stats.avgAge.toFixed(0)} años</h3>
            <p className="stats-panel__subtitle-text">Total asistencias: {stats.totalAssists}</p>
          </div>
        </div>

        <div className="stats-panel__card stats-panel__card--dark">
          <div className="stats-panel__content">
            <p className="stats-panel__label-top stats-panel__label-top--white">MÁXIMO GOLEADOR</p>
            <h3 className="stats-panel__value stats-panel__value--white">{stats.topScorer?.name || 'N/A'}</h3>
          </div>
        </div>

        <div className="stats-panel__card">
          <div className="stats-panel__content">
            <div className="stats-panel__history-header">
              <p className="stats-panel__label-top">HISTORIAL DE BÚSQUEDA</p>
              {searchHistory.length > 0 && (
                <button 
                  className="stats-panel__clear-btn"
                  onClick={onClearHistory}
                >
                  Limpiar
                </button>
              )}
            </div>
            {searchHistory.length === 0 ? (
              <p className="stats-panel__history-text">Aún no hay búsquedas recientes.</p>
            ) : (
              <ul className="stats-panel__history-list">
                {searchHistory.slice(0, 3).map((search, index) => (
                  <li 
                    key={index}
                    className="stats-panel__history-item"
                    onClick={() => onSelectSearch(search)}
                  >
                    {search}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
