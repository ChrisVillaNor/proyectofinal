import React, { useEffect } from 'react';
import '../styles/Modal.css';

const Modal = ({ isOpen, onClose, player, darkMode, isFavorite, onToggleFavorite }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !player) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className={`modal ${darkMode ? 'modal--dark' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="modal__close"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        <div className="modal__header">
          <div className="modal__number">{player.number}</div>
          <div className="modal__title-group">
            <h2 className="modal__name">{player.name}</h2>
            <p className="modal__position">{player.position}</p>
          </div>
          <button 
            className={`modal__favorite-btn ${isFavorite ? 'modal__favorite-btn--active' : ''}`}
            onClick={onToggleFavorite}
            aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            <span className="modal__favorite-icon">{isFavorite ? '★' : '☆'}</span>
            <span className="modal__favorite-text">{isFavorite ? 'Favorito' : 'Marcar como favorito'}</span>
          </button>
        </div>

        <div className="modal__content">
          <div className="modal__stat">
            <div className="modal__stat-icon">🏆</div>
            <div className="modal__stat-info">
              <p className="modal__stat-label">Club</p>
              <p className="modal__stat-value">{player.club}</p>
            </div>
          </div>

          <div className="modal__stat">
            <div className="modal__stat-icon">🌍</div>
            <div className="modal__stat-info">
              <p className="modal__stat-label">País</p>
              <p className="modal__stat-value">{player.country}</p>
            </div>
          </div>

          <div className="modal__stat">
            <div className="modal__stat-icon">🎂</div>
            <div className="modal__stat-info">
              <p className="modal__stat-label">Edad</p>
              <p className="modal__stat-value">{player.age} años</p>
            </div>
          </div>

          <div className="modal__stat">
            <div className="modal__stat-icon">⚽</div>
            <div className="modal__stat-info">
              <p className="modal__stat-label">Goles Totales</p>
              <p className="modal__stat-value">{player.goals}</p>
            </div>
          </div>

          <div className="modal__stat">
            <div className="modal__stat-icon">🎯</div>
            <div className="modal__stat-info">
              <p className="modal__stat-label">Asistencias</p>
              <p className="modal__stat-value">{player.assists}</p>
            </div>
          </div>

          <div className="modal__stat">
            <div className="modal__stat-icon">⭐</div>
            <div className="modal__stat-info">
              <p className="modal__stat-label">Puntuación</p>
              <p className="modal__stat-value">{player.rating}/10</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
