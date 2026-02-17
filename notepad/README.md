# Notepad - Material Design Text Editor

A modern, feature-rich notepad application built with React, featuring Material Design principles and SCSS styling.

## Features

### Themes
The application includes 8 beautiful color themes:
- **Light** - Clean, bright default theme
- **Dark** - Easy on the eyes dark theme
- **Ocean Blue** - Refreshing blue ocean vibes
- **Forest Green** - Natural green tones
- **Sunset Orange** - Warm sunset colors
- **Purple Haze** - Elegant purple theme
- **Midnight Black** - Deep dark theme with blue accents
- **Rose Gold** - Beautiful pink and rose tones

All themes are carefully designed for readability and accessibility.

### Text Customization
- **Font Size**: 6 options from Extra Small to XXL
- **Font Family**: 7 different font families including System Default, Monospace, Georgia, Arial, Verdana, Comic Sans, and Times New Roman
- **Font Weight**: 5 weight options from Light to Bold
- **Line Height**: 4 spacing options (Compact, Normal, Relaxed, Loose)

### Toolbar Features
- **Undo/Redo** - Full undo/redo support with keyboard shortcuts (Ctrl+Z / Ctrl+Y)
- **Copy All** - Copy entire text to clipboard
- **Cut** - Cut selected text
- **Paste** - Paste from clipboard
- **Select All** - Select all text (Ctrl+A)
- **Find** - Search within your text (Ctrl+F)
- **Delete All** - Clear all content with confirmation

### Auto-Save
- Text is automatically saved to localStorage on every keystroke
- Your work is preserved even if you close the browser or refresh the page
- All settings (theme, font preferences) are also saved

### Keyboard Shortcuts
- `Ctrl+Z` - Undo
- `Ctrl+Y` or `Ctrl+Shift+Z` - Redo
- `Ctrl+F` - Open Find dialog
- `Ctrl+A` - Select all text
- `Ctrl+C` - Copy
- `Ctrl+X` - Cut
- `Ctrl+V` - Paste
- `Escape` - Close Find dialog

## Installation & Setup

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Getting Started

1. **Navigate to the project directory**:
   ```bash
   cd notepad
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to the URL shown in the terminal (usually `http://localhost:5173` or `http://localhost:5174`)

### Build for Production

To create a production build:
```bash
npm run build
```

The build output will be in the `dist` folder.

To preview the production build:
```bash
npm run preview
```

## Project Structure

```
notepad/
├── src/
│   ├── components/
│   │   ├── Toolbar.jsx          # Toolbar component with all controls
│   │   └── SearchModal.jsx      # Search/Find modal component
│   ├── hooks/
│   │   ├── useLocalStorage.js   # Custom hook for localStorage sync
│   │   └── useUndoRedo.js       # Custom hook for undo/redo functionality
│   ├── styles/
│   │   ├── _variables.scss      # SCSS variables (themes, fonts, etc.)
│   │   ├── _mixins.scss         # Reusable SCSS mixins
│   │   └── App.scss             # Main application styles
│   ├── App.jsx                  # Main application component
│   └── main.jsx                 # Application entry point
├── index.html                   # HTML template
├── package.json                 # Project dependencies
└── vite.config.js              # Vite configuration
```

## Technology Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **SCSS (Sass)** - Styling with variables, mixins, and modular structure
- **localStorage API** - For data persistence
- **Clipboard API** - For copy/paste operations

## Design Principles

- **Material Design** - Clean, minimal, and modern UI
- **Accessibility** - High contrast ratios and readable color combinations
- **Responsive** - Works seamlessly on desktop, tablet, and mobile
- **Performance** - Optimized rendering and efficient state management
- **User Experience** - Smooth transitions and intuitive controls

## Browser Support

Works on all modern browsers that support:
- ES6+ JavaScript
- CSS Grid & Flexbox
- localStorage API
- Clipboard API

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project for personal or commercial purposes.

---

**Enjoy writing with Notepad!**
