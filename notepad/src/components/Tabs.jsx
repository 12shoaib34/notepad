import React from 'react';

const Tabs = ({ tabs, activeTabId, onTabChange, onTabClose, onTabAdd }) => {
  const getTabTitle = (tab) => {
    if (!tab.content || tab.content.trim() === '') {
      return 'Untitled';
    }
    const firstLine = tab.content.split('\n')[0].trim();
    return firstLine.substring(0, 20) || 'Untitled';
  };

  return (
    <div className="tabs-container">
      <div className="tabs-list">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab ${activeTabId === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="tab-title">{getTabTitle(tab)}</span>
            {tabs.length > 1 && (
              <button
                className="tab-close"
                onClick={(e) => {
                  e.stopPropagation();
                  onTabClose(tab.id);
                }}
                title="Close tab"
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button className="tab-add" onClick={onTabAdd} title="New tab">
          +
        </button>
      </div>
    </div>
  );
};

export default Tabs;
