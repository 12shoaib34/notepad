import React, { useState } from 'react';

const MenuBar = ({
  onNew,
  onSave,
  onCopyAll,
  onSelectAll,
  onFind,
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
}) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const themes = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'ocean', label: 'Ocean Blue' },
    { value: 'forest', label: 'Forest Green' },
    { value: 'sunset', label: 'Sunset Orange' },
    { value: 'purple', label: 'Purple Haze' },
    { value: 'midnight', label: 'Midnight Black' },
    { value: 'rose', label: 'Rose Gold' },
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

  const handleMenuClick = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const closeMenu = () => {
    setActiveMenu(null);
  };

  return (
    <div className="menubar">
      <div className="menu-item" onClick={() => handleMenuClick('file')}>
        File
        {activeMenu === 'file' && (
          <div className="dropdown-menu">
            <div className="menu-option" onClick={() => { onNew(); closeMenu(); }}>
              New
              <span className="shortcut">Ctrl+N</span>
            </div>
            <div className="menu-option" onClick={() => { onSave(); closeMenu(); }}>
              Save
              <span className="shortcut">Ctrl+S</span>
            </div>
            <div className="menu-divider"></div>
            <div className="menu-option disabled">
              Exit
            </div>
          </div>
        )}
      </div>

      <div className="menu-item" onClick={() => handleMenuClick('edit')}>
        Edit
        {activeMenu === 'edit' && (
          <div className="dropdown-menu">
            <div className="menu-option" onClick={() => { onCopyAll(); closeMenu(); }}>
              Copy All
              <span className="shortcut">Ctrl+C</span>
            </div>
            <div className="menu-option" onClick={() => { onSelectAll(); closeMenu(); }}>
              Select All
              <span className="shortcut">Ctrl+A</span>
            </div>
            <div className="menu-divider"></div>
            <div className="menu-option" onClick={() => { onFind(); closeMenu(); }}>
              Find
              <span className="shortcut">Ctrl+F</span>
            </div>
          </div>
        )}
      </div>

      <div className="menu-item" onClick={() => handleMenuClick('view')}>
        View
        {activeMenu === 'view' && (
          <div className="dropdown-menu">
            <div className="menu-section-title">Theme</div>
            {themes.map(t => (
              <div
                key={t.value}
                className={`menu-option ${theme === t.value ? 'active' : ''}`}
                onClick={() => { setTheme(t.value); closeMenu(); }}
              >
                {t.label}
                {theme === t.value && <span className="checkmark">✓</span>}
              </div>
            ))}
            <div className="menu-divider"></div>
            <div className="menu-section-title">Font Size</div>
            {fontSizes.map(fs => (
              <div
                key={fs.value}
                className={`menu-option ${fontSize === fs.value ? 'active' : ''}`}
                onClick={() => { setFontSize(fs.value); closeMenu(); }}
              >
                {fs.label}
                {fontSize === fs.value && <span className="checkmark">✓</span>}
              </div>
            ))}
            <div className="menu-divider"></div>
            <div className="menu-section-title">Font Family</div>
            {fontFamilies.map(ff => (
              <div
                key={ff.value}
                className={`menu-option ${fontFamily === ff.value ? 'active' : ''}`}
                onClick={() => { setFontFamily(ff.value); closeMenu(); }}
              >
                {ff.label}
                {fontFamily === ff.value && <span className="checkmark">✓</span>}
              </div>
            ))}
            <div className="menu-divider"></div>
            <div className="menu-section-title">Font Weight</div>
            {fontWeights.map(fw => (
              <div
                key={fw.value}
                className={`menu-option ${fontWeight === fw.value ? 'active' : ''}`}
                onClick={() => { setFontWeight(fw.value); closeMenu(); }}
              >
                {fw.label}
                {fontWeight === fw.value && <span className="checkmark">✓</span>}
              </div>
            ))}
            <div className="menu-divider"></div>
            <div className="menu-section-title">Line Height</div>
            {lineHeights.map(lh => (
              <div
                key={lh.value}
                className={`menu-option ${lineHeight === lh.value ? 'active' : ''}`}
                onClick={() => { setLineHeight(lh.value); closeMenu(); }}
              >
                {lh.label}
                {lineHeight === lh.value && <span className="checkmark">✓</span>}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="menu-item" onClick={() => handleMenuClick('help')}>
        Help
        {activeMenu === 'help' && (
          <div className="dropdown-menu">
            <div className="menu-option disabled">
              About
            </div>
            <div className="menu-option disabled">
              Keyboard Shortcuts
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuBar;
