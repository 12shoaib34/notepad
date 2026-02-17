import React from 'react';

const IconToolbar = ({
  onSave,
  onDownload,
  onCut,
  onCopy,
  onPaste,
  onUndo,
  onRedo,
  onFind,
  onDelete,
  canUndo,
  canRedo,
}) => {
  return (
    <div className="icon-toolbar">
      <button className="icon-btn" onClick={onSave} title="Save (Ctrl+S)">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
          <polyline points="17 21 17 13 7 13 7 21"/>
          <polyline points="7 3 7 8 15 8"/>
        </svg>
      </button>

      <button className="icon-btn" onClick={onDownload} title="Download">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
      </button>

      <div className="toolbar-divider"></div>

      <button className="icon-btn" onClick={onCut} title="Cut (Ctrl+X)">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="6" cy="6" r="3"/>
          <circle cx="6" cy="18" r="3"/>
          <line x1="20" y1="4" x2="8.12" y2="15.88"/>
          <line x1="14.47" y1="14.48" x2="20" y2="20"/>
          <line x1="8.12" y1="8.12" x2="12" y2="12"/>
        </svg>
      </button>

      <button className="icon-btn" onClick={onCopy} title="Copy (Ctrl+C)">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
      </button>

      <button className="icon-btn" onClick={onPaste} title="Paste (Ctrl+V)">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
        </svg>
      </button>

      <div className="toolbar-divider"></div>

      <button className="icon-btn" onClick={onUndo} disabled={!canUndo} title="Undo (Ctrl+Z)">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 7v6h6"/>
          <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13"/>
        </svg>
      </button>

      <button className="icon-btn" onClick={onRedo} disabled={!canRedo} title="Redo (Ctrl+Y)">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 7v6h-6"/>
          <path d="M3 17a9 9 0 019-9 9 9 0 016 2.3l3 2.7"/>
        </svg>
      </button>

      <div className="toolbar-divider"></div>

      <button className="icon-btn" onClick={onFind} title="Find (Ctrl+F)">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="M21 21l-4.35-4.35"/>
        </svg>
      </button>

      <div className="toolbar-divider"></div>

      <button className="icon-btn danger" onClick={onDelete} title="Delete All">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          <line x1="10" y1="11" x2="10" y2="17"/>
          <line x1="14" y1="11" x2="14" y2="17"/>
        </svg>
      </button>
    </div>
  );
};

export default IconToolbar;
