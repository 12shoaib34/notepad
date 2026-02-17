import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Custom hook for undo/redo functionality with NO LAG
 * @param {*} initialValue - initial value
 */
export const useUndoRedo = (initialValue = '') => {
  const [history, setHistory] = useState([initialValue]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentValue, setCurrentValue] = useState(initialValue);
  const debounceTimer = useRef(null);
  const isUndoRedoAction = useRef(false);

  // Update history when currentValue changes (with debouncing)
  useEffect(() => {
    // Skip if this was an undo/redo action
    if (isUndoRedoAction.current) {
      isUndoRedoAction.current = false;
      return;
    }

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      setHistory((prev) => {
        // Don't add to history if value hasn't changed
        if (prev[currentIndex] === currentValue) {
          return prev;
        }

        // Remove all history after current index
        const newHistory = prev.slice(0, currentIndex + 1);
        // Add new value
        newHistory.push(currentValue);
        // Limit history to last 100 entries
        const limitedHistory = newHistory.slice(-100);

        return limitedHistory;
      });

      setCurrentIndex((prev) => {
        const newHistory = history.slice(0, prev + 1);
        newHistory.push(currentValue);
        return Math.min(newHistory.length - 1, 99);
      });
    }, 500);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [currentValue]);

  // Set value immediately (NO LAG!)
  const setValue = useCallback((newValue) => {
    setCurrentValue(newValue);
  }, []);

  // Immediate set for operations like paste, cut, delete
  const setValueImmediate = useCallback((newValue) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    setCurrentValue(newValue);

    setHistory((prev) => {
      const newHistory = prev.slice(0, currentIndex + 1);
      newHistory.push(newValue);
      return newHistory.slice(-100);
    });

    setCurrentIndex((prev) => Math.min(prev + 1, 99));
  }, [currentIndex]);

  // Undo operation
  const undo = useCallback(() => {
    if (currentIndex > 0) {
      isUndoRedoAction.current = true;
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setCurrentValue(history[newIndex]);
    }
  }, [currentIndex, history]);

  // Redo operation
  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      isUndoRedoAction.current = true;
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setCurrentValue(history[newIndex]);
    }
  }, [currentIndex, history]);

  // Check if can undo/redo
  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  return {
    value: currentValue,
    setValue,
    setValueImmediate,
    undo,
    redo,
    canUndo,
    canRedo,
  };
};
