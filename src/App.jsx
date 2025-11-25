import { useState, useEffect, useMemo } from 'react';
import { playersData } from './data/playersData';
import SearchBar from './components/SearchBar';
import SearchHistory from './components/SearchHistory';
import ThemeToggle from './components/ThemeToggle';
import StatsPanel from './components/StatsPanel';
import PlayerTable from './components/PlayerTable';
import Pagination from './components/Pagination';
import Modal from './components/Modal';
import './App.css';

function App() {
  // Estado para búsqueda con debounce
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Estado para historial de búsquedas
  const [searchHistory, setSearchHistory] = useState([]);

  // Estado para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Estado para ordenamiento
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'none'
  });

  // Estado para coloreo de filas
  const [rowColors, setRowColors] = useState('none');

  // Estado para modo oscuro
  const [darkMode, setDarkMode] = useState(false);

  // Estado para favoritos
  const [favorites, setFavorites] = useState([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Estado para modal
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cargar preferencias desde localStorage al inicio
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    const savedFavorites = localStorage.getItem('favorites');
    const savedSearchHistory = localStorage.getItem('searchHistory');

    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedSearchHistory) setSearchHistory(JSON.parse(savedSearchHistory));
  }, []);

  // Guardar modo oscuro en localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Guardar favoritos en localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Guardar historial de búsquedas en localStorage
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  // Efecto para debounce de búsqueda
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Actualizar historial de búsquedas cuando se realiza una búsqueda válida
  useEffect(() => {
    if (debouncedSearch && debouncedSearch.length > 2) {
      setSearchHistory(prev => {
        const updated = [debouncedSearch, ...prev.filter(s => s !== debouncedSearch)];
        return updated.slice(0, 5);
      });
    }
  }, [debouncedSearch]);

  // Resetear página cuando cambia el filtro de búsqueda
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, showOnlyFavorites]);

  // Filtrar jugadores por búsqueda y favoritos
  const filteredPlayers = useMemo(() => {
    let filtered = playersData;

    // Filtrar por búsqueda
    if (debouncedSearch) {
      filtered = filtered.filter(player =>
        player.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        player.club.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    // Filtrar por favoritos
    if (showOnlyFavorites) {
      filtered = filtered.filter(player => favorites.includes(player.id));
    }

    return filtered;
  }, [debouncedSearch, showOnlyFavorites, favorites]);

  // Ordenar jugadores
  const sortedPlayers = useMemo(() => {
    if (sortConfig.key === null || sortConfig.direction === 'none') {
      return filteredPlayers;
    }

    return [...filteredPlayers].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortConfig.direction === 'asc'
        ? aValue - bValue
        : bValue - aValue;
    });
  }, [filteredPlayers, sortConfig]);

  // Paginación
  const paginatedPlayers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedPlayers.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedPlayers, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedPlayers.length / itemsPerPage);

  // Estadísticas calculadas con useMemo
  const stats = useMemo(() => {
    const total = filteredPlayers.length;
    const totalGoals = filteredPlayers.reduce((sum, p) => sum + p.goals, 0);
    const totalAssists = filteredPlayers.reduce((sum, p) => sum + p.assists, 0);
    const avgAge = total > 0
      ? filteredPlayers.reduce((sum, p) => sum + p.age, 0) / total
      : 0;
    const avgGoals = total > 0
      ? totalGoals / total
      : 0;
    const avgAssists = total > 0
      ? totalAssists / total
      : 0;
    const avgRating = total > 0
      ? filteredPlayers.reduce((sum, p) => sum + p.rating, 0) / total
      : 0;
    const topScorer = filteredPlayers.length > 0
      ? filteredPlayers.reduce((max, p) => p.goals > max.goals ? p : max)
      : null;

    const positionDistribution = filteredPlayers.reduce((acc, player) => {
      acc[player.position] = (acc[player.position] || 0) + 1;
      return acc;
    }, {});

    return {
      total,
      favorites: favorites.length,
      totalGoals,
      totalAssists,
      avgAge,
      avgGoals,
      avgAssists,
      avgRating,
      topScorer,
      positionDistribution
    };
  }, [filteredPlayers, favorites]);

  // Handlers
  const handleSort = (key) => {
    setSortConfig(prev => {
      if (prev.key !== key) {
        return { key, direction: 'asc' };
      }
      if (prev.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      if (prev.direction === 'desc') {
        return { key: null, direction: 'none' };
      }
      return { key, direction: 'asc' };
    });
  };

  const handleToggleFavorite = (playerId) => {
    setFavorites(prev =>
      prev.includes(playerId)
        ? prev.filter(id => id !== playerId)
        : [...prev, playerId]
    );
  };

  const handleRowClick = (player) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setDebouncedSearch('');
  };

  const handleSelectSearch = (search) => {
    setSearchTerm(search);
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  return (
    <div className={`app ${darkMode ? 'app--dark' : ''}`}>
      <header className="app__header">
        <div className="app__header-content">
          <div>
            <p style={{ fontSize: '0.75rem', color: '#ffd700', marginBottom: '0.25rem', fontWeight: '600', letterSpacing: '1px' }}>TOP CLUB SOCCER</p>
            <h1 className="app__title">Dashboard de Jugadores</h1>
            <p style={{ fontSize: '0.95rem', color: '#ffffff', marginTop: '0.25rem', fontWeight: '300' }}>Gestiona tus estrellas favoritas, analiza estadísticas y descubre talentos.</p>
          </div>
          <ThemeToggle darkMode={darkMode} onToggle={() => setDarkMode(!darkMode)} />
        </div>
      </header>

      <main className="app__main">
        <div className="app__table-container">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            onClear={handleClearSearch}
            resultsCount={filteredPlayers.length}
          />

          <StatsPanel stats={stats} darkMode={darkMode} searchHistory={searchHistory} onSelectSearch={handleSelectSearch} onClearHistory={handleClearHistory} />

          <div className="app__actions">
            <div className="app__button-group">
              <button
                className={`app__btn ${rowColors === 'pares' ? 'app__btn--active' : ''}`}
                onClick={() => setRowColors(rowColors === 'pares' ? 'none' : 'pares')}
              >
                🎨 Pintar Pares
              </button>
              <button
                className={`app__btn ${rowColors === 'impares' ? 'app__btn--active' : ''}`}
                onClick={() => setRowColors(rowColors === 'impares' ? 'none' : 'impares')}
              >
                🎨 Pintar Impares
              </button>
              <button
                className="app__btn"
                onClick={() => setRowColors('none')}
                disabled={rowColors === 'none'}
              >
                🧹 Limpiar Colores
              </button>
            </div>

            <div className="app__favorites">
              <button
                className={`app__btn ${showOnlyFavorites ? 'app__btn--active' : ''}`}
                onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              >
                ⭐ {showOnlyFavorites ? 'Mostrar Todos' : 'Solo Favoritos'}
              </button>
              <span className="app__favorites-count">
                {favorites.length} favorito{favorites.length !== 1 ? 's' : ''} guardado{favorites.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          <PlayerTable
          players={paginatedPlayers}
          onRowClick={handleRowClick}
          onSort={handleSort}
          sortConfig={sortConfig}
          darkMode={darkMode}
          rowColors={rowColors}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
            totalItems={sortedPlayers.length}
            darkMode={darkMode}
          />
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        player={selectedPlayer}
        darkMode={darkMode}
        isFavorite={selectedPlayer ? favorites.includes(selectedPlayer.id) : false}
        onToggleFavorite={() => selectedPlayer && handleToggleFavorite(selectedPlayer.id)}
      />
    </div>
  );
}

export default App;
