import React from 'react';
import PlayerRow from './PlayerRow';
import '../styles/PlayerTable.css';

const PlayerTable = ({ 
  players, 
  onRowClick, 
  onSort, 
  sortConfig, 
  darkMode, 
  rowColors,
  favorites,
  onToggleFavorite 
}) => {
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return '';
    return sortConfig.direction === 'asc' ? ' ↑' : sortConfig.direction === 'desc' ? ' ↓' : '';
  };

  return (
    <div className="player-table">
      <table className={`player-table__table ${darkMode ? 'player-table__table--dark' : ''}`}>
        <thead className="player-table__thead">
          <tr>
            <th className="player-table__th">⭐</th>
            <th 
              className="player-table__th player-table__th--sortable"
              onClick={() => onSort('name')}
            >
              Nombre{getSortIndicator('name')}
            </th>
            <th 
              className="player-table__th player-table__th--sortable"
              onClick={() => onSort('club')}
            >
              Club{getSortIndicator('club')}
            </th>
            <th 
              className="player-table__th player-table__th--sortable"
              onClick={() => onSort('position')}
            >
              Posición{getSortIndicator('position')}
            </th>
            <th 
              className="player-table__th player-table__th--sortable"
              onClick={() => onSort('country')}
            >
              País{getSortIndicator('country')}
            </th>
            <th 
              className="player-table__th player-table__th--sortable"
              onClick={() => onSort('age')}
            >
              Edad{getSortIndicator('age')}
            </th>
            <th 
              className="player-table__th player-table__th--sortable"
              onClick={() => onSort('goals')}
            >
              Goles{getSortIndicator('goals')}
            </th>
            <th 
              className="player-table__th player-table__th--sortable"
              onClick={() => onSort('assists')}
            >
              Asistencias{getSortIndicator('assists')}
            </th>
            <th 
              className="player-table__th player-table__th--sortable"
              onClick={() => onSort('rating')}
            >
              Puntuación{getSortIndicator('rating')}
            </th>
          </tr>
        </thead>
        <tbody className="player-table__tbody">
          {players.map((player, index) => (
            <PlayerRow
              key={player.id}
              player={player}
              index={index}
              onClick={() => onRowClick(player)}
              isFavorite={favorites.includes(player.id)}
              onToggleFavorite={(e) => {
                e.stopPropagation();
                onToggleFavorite(player.id);
              }}
              darkMode={darkMode}
              colorClass={
                rowColors === 'pares' && index % 2 === 0 ? 'player-row--even' :
                rowColors === 'impares' && index % 2 !== 0 ? 'player-row--odd' :
                ''
              }
            />
          ))}
        </tbody>
      </table>
      {players.length === 0 && (
        <div className="player-table__empty">
          <p>No se encontraron jugadores</p>
        </div>
      )}
    </div>
  );
};

export default PlayerTable;
