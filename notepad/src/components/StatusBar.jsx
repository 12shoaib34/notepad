import React from 'react';

const StatusBar = ({ lineNumber, columnNumber, charCount, wordCount }) => {
  return (
    <div className="statusbar">
      <div className="status-item">
        Line {lineNumber}, Column {columnNumber}
      </div>
      <div className="status-separator">|</div>
      <div className="status-item">
        Chars {charCount}, Words {wordCount}
      </div>
    </div>
  );
};

export default StatusBar;
