import React, { useState, useEffect, useRef } from 'react';

const SearchModal = ({ isOpen, onClose, text, onHighlight }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [matchCount, setMatchCount] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchTerm && text) {
      // Count matches (case insensitive)
      const regex = new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      const matches = text.match(regex);
      setMatchCount(matches ? matches.length : 0);

      // Notify parent component to highlight matches
      if (onHighlight) {
        onHighlight(searchTerm);
      }
    } else {
      setMatchCount(0);
      if (onHighlight) {
        onHighlight('');
      }
    }
  }, [searchTerm, text, onHighlight]);

  const handleClose = () => {
    setSearchTerm('');
    if (onHighlight) {
      onHighlight('');
    }
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay" onClick={handleClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Find Text</h3>
        <div className="search-input-group">
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter text to search..."
          />
        </div>
        {searchTerm && (
          <div className="search-info">
            {matchCount > 0
              ? `Found ${matchCount} match${matchCount > 1 ? 'es' : ''}`
              : 'No matches found'}
          </div>
        )}
        <div className="search-controls">
          <button className="close-btn" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
