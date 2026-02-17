import React from 'react';
import { MdUndo, MdRedo, MdContentCut, MdContentCopy, MdContentPaste, MdSelectAll, MdSearch, MdDelete } from 'react-icons/md';

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
          className="toolbar-icon-button"
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo (Ctrl+Z)"
        >
          <MdUndo />
        </button>
        <button
          className="toolbar-icon-button"
          onClick={onRedo}
          disabled={!canRedo}
          title="Redo (Ctrl+Y)"
        >
          <MdRedo />
        </button>
      </div>

      {/* Clipboard Actions */}
      <div className="toolbar-section divider-right">
        <button
          className="toolbar-icon-button"
          onClick={onCut}
          title="Cut (Ctrl+X)"
        >
          <MdContentCut />
        </button>
        <button
          className="toolbar-icon-button"
          onClick={onCopyAll}
          title="Copy All (Ctrl+C)"
        >
          <MdContentCopy />
        </button>
        <button
          className="toolbar-icon-button"
          onClick={onPaste}
          title="Paste (Ctrl+V)"
        >
          <MdContentPaste />
        </button>
      </div>

      {/* Selection Actions */}
      <div className="toolbar-section divider-right">
        <button
          className="toolbar-icon-button"
          onClick={onSelectAll}
          title="Select All (Ctrl+A)"
        >
          <MdSelectAll />
        </button>
        <button
          className="toolbar-icon-button"
          onClick={onFind}
          title="Find (Ctrl+F)"
        >
          <MdSearch />
        </button>
      </div>

      {/* Delete Action */}
      <div className="toolbar-section">
        <button
          className="toolbar-icon-button delete-btn"
          onClick={onDeleteAll}
          title="Delete All"
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
