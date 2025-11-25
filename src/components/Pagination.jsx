import React from 'react';
import '../styles/Pagination.css';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  itemsPerPage, 
  onItemsPerPageChange, 
  totalItems,
  darkMode 
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className={`pagination ${darkMode ? 'pagination--dark' : ''}`}>
      <div className="pagination__info">
        Mostrando <strong>{startItem}-{endItem}</strong> de <strong>{totalItems}</strong> registros
      </div>

      <div className="pagination__controls">
        <div className="pagination__selector">
          <label htmlFor="items-per-page">Elementos por página:</label>
          <select
            id="items-per-page"
            className="pagination__select"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="pagination__buttons">
          <button
            className="pagination__btn"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
          <button
            className="pagination__btn"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lsaquo;
          </button>

          {getPageNumbers().map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="pagination__ellipsis">...</span>
            ) : (
              <button
                key={page}
                className={`pagination__btn pagination__btn--number ${
                  currentPage === page ? 'pagination__btn--active' : ''
                }`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            )
          ))}

          <button
            className="pagination__btn"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &rsaquo;
          </button>
          <button
            className="pagination__btn"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
