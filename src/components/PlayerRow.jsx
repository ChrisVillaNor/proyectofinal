import React from 'react';
import '../styles/PlayerRow.css';

const PlayerRow = ({ 
  player, 
  index, 
  onClick, 
  isFavorite, 
  onToggleFavorite, 
  darkMode, 
  colorClass 
}) => {
  return (
    <tr 
      className={`player-row ${darkMode ? 'player-row--dark' : ''} ${colorClass}`}
      onClick={onClick}
    >
      <td className="player-row__td player-row__td--favorite">
        <button 
          className="player-row__favorite-btn"
          onClick={onToggleFavorite}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </td>
      <td className="player-row__td player-row__td--name">{player.name}</td>
      <td className="player-row__td">{player.club}</td>
      <td className="player-row__td">{player.position}</td>
      <td className="player-row__td">{player.country}</td>
      <td className="player-row__td player-row__td--age">{player.age}</td>
      <td className="player-row__td player-row__td--goals">{player.goals}</td>
      <td className="player-row__td player-row__td--assists">{player.assists}</td>
      <td className="player-row__td player-row__td--rating">{player.rating}</td>
    </tr>
  );
};

export default PlayerRow;
