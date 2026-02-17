import React from 'react';

const Toolbar = ({
  theme,
  setTheme,
  fontSize,
  setFontSize,
  fontFamily,
  setFontFamily,
  fontWeight,
  setFontWeight,
  lineHeight,
  setLineHeight,
  onCopyAll,
  onDeleteAll,
  onUndo,
  onRedo,
  onPaste,
  onCut,
  onSelectAll,
  onFind,
  canUndo,
  canRedo,
}) => {
  const themes = [
    { value: 'dark', label: 'Dark' },
    { value: 'github', label: 'GitHub Dark' },
    { value: 'vscode', label: 'VS Code Dark' },
    { value: 'chrome', label: 'Chrome Dark' },
    { value: 'dracula', label: 'Dracula' },
    { value: 'nord', label: 'Nord' },
    { value: 'monokai', label: 'Monokai' },
    { value: 'onedark', label: 'One Dark' },
  ];

  const fontSizes = [
    { value: 'xs', label: 'Extra Small' },
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
    { value: 'xl', label: 'Extra Large' },
    { value: 'xxl', label: 'XXL' },
  ];

  const fontFamilies = [
    { value: 'system', label: 'System Default' },
    { value: 'monospace', label: 'Monospace' },
    { value: 'georgia', label: 'Georgia' },
    { value: 'arial', label: 'Arial' },
    { value: 'verdana', label: 'Verdana' },
    { value: 'comic', label: 'Comic Sans' },
    { value: 'times', label: 'Times New Roman' },
  ];

  const fontWeights = [
    { value: 'light', label: 'Light' },
    { value: 'normal', label: 'Normal' },
    { value: 'medium', label: 'Medium' },
    { value: 'semibold', label: 'Semibold' },
    { value: 'bold', label: 'Bold' },
  ];

  const lineHeights = [
    { value: 'compact', label: 'Compact' },
    { value: 'normal', label: 'Normal' },
    { value: 'relaxed', label: 'Relaxed' },
    { value: 'loose', label: 'Loose' },
  ];

  return (
    <div className="toolbar">
      {/* Theme Selector */}
      <div className="toolbar-section divider-right">
        <select
          className="dropdown"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          title="Select Theme"
        >
          {themes.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {/* Font Options */}
      <div className="toolbar-section divider-right">
        <select
          className="dropdown"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          title="Font Size"
        >
          {fontSizes.map((fs) => (
            <option key={fs.value} value={fs.value}>
              {fs.label}
            </option>
          ))}
        </select>

        <select
          className="dropdown"
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          title="Font Family"
        >
          {fontFamilies.map((ff) => (
            <option key={ff.value} value={ff.value}>
              {ff.label}
            </option>
          ))}
        </select>

        <select
          className="dropdown"
          value={fontWeight}
          onChange={(e) => setFontWeight(e.target.value)}
          title="Font Weight"
        >
          {fontWeights.map((fw) => (
            <option key={fw.value} value={fw.value}>
              {fw.label}
            </option>
          ))}
        </select>

        <select
          className="dropdown"
          value={lineHeight}
          onChange={(e) => setLineHeight(e.target.value)}
          title="Line Height"
        >
          {lineHeights.map((lh) => (
            <option key={lh.value} value={lh.value}>
              {lh.label}
            </option>
          ))}
        </select>
      </div>

      {/* Edit Actions */}
      <div className="toolbar-section divider-right">
        <button
          className="toolbar-button"
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo (Ctrl+Z)"
        >
          Undo
        </button>
        <button
          className="toolbar-button"
          onClick={onRedo}
          disabled={!canRedo}
          title="Redo (Ctrl+Y)"
        >
          Redo
        </button>
      </div>

      {/* Clipboard Actions */}
      <div className="toolbar-section divider-right">
        <button
          className="toolbar-button"
          onClick={onCut}
          title="Cut (Ctrl+X)"
        >
          Cut
        </button>
        <button
          className="toolbar-button"
          onClick={onCopyAll}
          title="Copy All (Ctrl+C)"
        >
          Copy All
        </button>
        <button
          className="toolbar-button"
          onClick={onPaste}
          title="Paste (Ctrl+V)"
        >
          Paste
        </button>
      </div>

      {/* Selection Actions */}
      <div className="toolbar-section divider-right">
        <button
          className="toolbar-button"
          onClick={onSelectAll}
          title="Select All (Ctrl+A)"
        >
          Select All
        </button>
        <button
          className="toolbar-button"
          onClick={onFind}
          title="Find (Ctrl+F)"
        >
          Find
        </button>
      </div>

      {/* Delete Action */}
      <div className="toolbar-section">
        <button
          className="toolbar-button"
          onClick={onDeleteAll}
          title="Delete All"
          style={{ color: '#f44336' }}
        >
          Delete All
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
