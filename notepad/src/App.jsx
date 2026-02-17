import React, { useState, useRef, useEffect, useCallback } from "react";
import Tabs from "./components/Tabs";
import Toolbar from "./components/Toolbar";
import SearchModal from "./components/SearchModal";
import { useLocalStorage } from "./hooks/useLocalStorage";
import "./styles/App.scss";

const fontSizeMap = {
  xs: "12px",
  sm: "14px",
  md: "16px",
  lg: "18px",
  xl: "20px",
  xxl: "24px",
};

const fontFamilyMap = {
  system: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif',
  monospace: '"Courier New", Courier, monospace',
  georgia: "Georgia, serif",
  arial: "Arial, Helvetica, sans-serif",
  verdana: "Verdana, Geneva, sans-serif",
  comic: '"Comic Sans MS", cursive',
  times: '"Times New Roman", Times, serif',
};

const fontWeightMap = {
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
};

const lineHeightMap = {
  compact: "1.2",
  normal: "1.5",
  relaxed: "1.8",
  loose: "2.0",
};

function App() {
  const textareaRef = useRef(null);

  // Settings with localStorage
  const [theme, setTheme] = useLocalStorage("notepad-theme", "dark");
  const [fontSize, setFontSize] = useLocalStorage("notepad-fontSize", "md");
  const [fontFamily, setFontFamily] = useLocalStorage("notepad-fontFamily", "system");
  const [fontWeight, setFontWeight] = useLocalStorage("notepad-fontWeight", "normal");
  const [lineHeight, setLineHeight] = useLocalStorage("notepad-lineHeight", "normal");

  // Tabs management with localStorage
  const [tabs, setTabs] = useLocalStorage("notepad-tabs", [{ id: Date.now(), content: "", history: [], historyIndex: -1 }]);
  const [activeTabId, setActiveTabId] = useLocalStorage("notepad-activeTab", tabs[0].id);

  // Current tab text state
  const [text, setText] = useState("");

  // Search modal state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Load text when tab changes
  useEffect(() => {
    const currentTab = tabs.find((tab) => tab.id === activeTabId);
    if (currentTab) {
      setText(currentTab.content || "");
    }
  }, [activeTabId, tabs]);

  // Save text to current tab
  const saveCurrentTab = useCallback(
    (newText) => {
      setTabs((prevTabs) => prevTabs.map((tab) => (tab.id === activeTabId ? { ...tab, content: newText } : tab)));
    },
    [activeTabId, setTabs],
  );

  // Handle text change
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    saveCurrentTab(newText);
  };

  // Tab operations
  const handleTabChange = (tabId) => {
    setActiveTabId(tabId);
  };

  const handleTabClose = (tabId) => {
    if (tabs.length === 1) return;

    const newTabs = tabs.filter((tab) => tab.id !== tabId);
    setTabs(newTabs);

    if (activeTabId === tabId) {
      setActiveTabId(newTabs[0].id);
    }
  };

  const handleTabAdd = () => {
    const newTab = {
      id: Date.now(),
      content: "",
      history: [],
      historyIndex: -1,
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
  };

  // Undo/Redo functionality
  const undo = () => {
    const currentTab = tabs.find((tab) => tab.id === activeTabId);
    if (!currentTab || !currentTab.history || currentTab.historyIndex <= 0) return;

    const newIndex = currentTab.historyIndex - 1;
    const previousText = currentTab.history[newIndex];

    setText(previousText);

    setTabs((prevTabs) => prevTabs.map((tab) => (tab.id === activeTabId ? { ...tab, content: previousText, historyIndex: newIndex } : tab)));
  };

  const redo = () => {
    const currentTab = tabs.find((tab) => tab.id === activeTabId);
    if (!currentTab || !currentTab.history || currentTab.historyIndex >= currentTab.history.length - 1) return;

    const newIndex = currentTab.historyIndex + 1;
    const nextText = currentTab.history[newIndex];

    setText(nextText);

    setTabs((prevTabs) => prevTabs.map((tab) => (tab.id === activeTabId ? { ...tab, content: nextText, historyIndex: newIndex } : tab)));
  };

  const canUndo = () => {
    const currentTab = tabs.find((tab) => tab.id === activeTabId);
    return currentTab?.historyIndex > 0;
  };

  const canRedo = () => {
    const currentTab = tabs.find((tab) => tab.id === activeTabId);
    return currentTab?.history && currentTab.historyIndex < currentTab.history.length - 1;
  };

  // Add to history (with debouncing)
  useEffect(() => {
    const timer = setTimeout(() => {
      setTabs((prevTabs) =>
        prevTabs.map((tab) => {
          if (tab.id === activeTabId) {
            const history = [...(tab.history || []).slice(0, tab.historyIndex + 1), text];
            return {
              ...tab,
              history: history.slice(-50), // Keep last 50 entries
              historyIndex: Math.min(history.length - 1, 49),
            };
          }
          return tab;
        }),
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [text, activeTabId, setTabs]);

  // Toolbar actions
  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Text copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy text:", err);
      textareaRef.current?.select();
      document.execCommand("copy");
    }
  };

  const handleDeleteAll = () => {
    if (text && window.confirm("Are you sure you want to delete all text?")) {
      setText("");
      saveCurrentTab("");
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
        setText(newText);
        saveCurrentTab(newText);

        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + clipboardText.length;
          textarea.focus();
        }, 0);
      }
    } catch (err) {
      console.error("Failed to paste text:", err);
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
          setText(newText);
          saveCurrentTab(newText);

          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = start;
            textarea.focus();
          }, 0);
        } catch (err) {
          console.error("Failed to cut text:", err);
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
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === "y" || (e.key === "z" && e.shiftKey))) {
        e.preventDefault();
        redo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === "f") {
        e.preventDefault();
        handleFind();
      } else if ((e.ctrlKey || e.metaKey) && e.key === "t") {
        e.preventDefault();
        handleTabAdd();
      } else if ((e.ctrlKey || e.metaKey) && e.key === "w") {
        e.preventDefault();
        if (tabs.length > 1) {
          handleTabClose(activeTabId);
        }
      } else if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, tabs.length, activeTabId]);

  return (
    <div className={`app theme-${theme}`}>
      <Tabs tabs={tabs} activeTabId={activeTabId} onTabChange={handleTabChange} onTabClose={handleTabClose} onTabAdd={handleTabAdd} />

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
        canUndo={canUndo()}
        canRedo={canRedo()}
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
          setSearchTerm("");
        }}
        text={text}
        onHighlight={handleHighlight}
      />
    </div>
  );
}

export default App;
