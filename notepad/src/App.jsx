import React, { useState, useRef, useEffect, useCallback } from 'react';
import Toolbar from './components/Toolbar';
import SearchModal from './components/SearchModal';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useUndoRedo } from './hooks/useUndoRedo';
import './styles/App.scss';

const fontSizeMap = {
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
  xxl: '24px',
};

const fontFamilyMap = {
  system: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif',
  monospace: '"Courier New", Courier, monospace',
  georgia: 'Georgia, serif',
  arial: 'Arial, Helvetica, sans-serif',
  verdana: 'Verdana, Geneva, sans-serif',
  comic: '"Comic Sans MS", cursive',
  times: '"Times New Roman", Times, serif',
};

const fontWeightMap = {
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

const lineHeightMap = {
  compact: '1.2',
  normal: '1.5',
  relaxed: '1.8',
  loose: '2.0',
};

function App() {
  const textareaRef = useRef(null);

  // State management with localStorage
  const [theme, setTheme] = useLocalStorage('notepad-theme', 'dark');
  const [fontSize, setFontSize] = useLocalStorage('notepad-fontSize', 'md');
  const [fontFamily, setFontFamily] = useLocalStorage('notepad-fontFamily', 'system');
  const [fontWeight, setFontWeight] = useLocalStorage('notepad-fontWeight', 'normal');
  const [lineHeight, setLineHeight] = useLocalStorage('notepad-lineHeight', 'normal');
  const [savedText, setSavedText] = useLocalStorage('notepad-text', '');

  // Undo/Redo functionality
  const { value: text, setValue, setValueImmediate, undo, redo, canUndo, canRedo } = useUndoRedo(savedText);

  // Search modal state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Auto-save to localStorage on text change
  useEffect(() => {
    setSavedText(text);
  }, [text, setSavedText]);

  // Handle text change
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setValue(newText);
  };

  // Toolbar actions
  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Text copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text:', err);
      textareaRef.current?.select();
      document.execCommand('copy');
    }
  };

  const handleDeleteAll = () => {
    if (text && window.confirm('Are you sure you want to delete all text?')) {
      setValueImmediate('');
    }
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      const textarea = textareaRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newText = text.substring(0, start) + clipboardText + text.substring(end);
        setValueImmediate(newText);

        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + clipboardText.length;
          textarea.focus();
        }, 0);
      }
    } catch (err) {
      console.error('Failed to paste text:', err);
    }
  };

  const handleCut = async () => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = text.substring(start, end);

      if (selectedText) {
        try {
          await navigator.clipboard.writeText(selectedText);
          const newText = text.substring(0, start) + text.substring(end);
          setValueImmediate(newText);

          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = start;
            textarea.focus();
          }, 0);
        } catch (err) {
          console.error('Failed to cut text:', err);
        }
      }
    }
  };

  const handleSelectAll = () => {
    textareaRef.current?.select();
  };

  const handleFind = () => {
    setIsSearchOpen(true);
  };

  const handleHighlight = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redo();
      }
      else if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        handleFind();
      }
      else if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, isSearchOpen]);

  return (
    <div className={`app theme-${theme}`}>
      <Toolbar
        theme={theme}
        setTheme={setTheme}
        fontSize={fontSize}
        setFontSize={setFontSize}
        fontFamily={fontFamily}
        setFontFamily={setFontFamily}
        fontWeight={fontWeight}
        setFontWeight={setFontWeight}
        lineHeight={lineHeight}
        setLineHeight={setLineHeight}
        onCopyAll={handleCopyAll}
        onDeleteAll={handleDeleteAll}
        onUndo={undo}
        onRedo={redo}
        onPaste={handlePaste}
        onCut={handleCut}
        onSelectAll={handleSelectAll}
        onFind={handleFind}
        canUndo={canUndo}
        canRedo={canRedo}
      />

      <div className="notepad-container">
        <textarea
          ref={textareaRef}
          className="notepad-textarea"
          value={text}
          onChange={handleTextChange}
          placeholder="Start typing..."
          style={{
            fontSize: fontSizeMap[fontSize],
            fontFamily: fontFamilyMap[fontFamily],
            fontWeight: fontWeightMap[fontWeight],
            lineHeight: lineHeightMap[lineHeight],
          }}
          spellCheck="true"
        />
      </div>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => {
          setIsSearchOpen(false);
          setSearchTerm('');
        }}
        text={text}
        onHighlight={handleHighlight}
      />
    </div>
  );
}

export default App;
