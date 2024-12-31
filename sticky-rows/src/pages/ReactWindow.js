import React from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Link } from 'react-router-dom';
import './ReactWindow.css';

function ReactWindow() {
  // Create an array of 100 items
  const items = Array.from({ length: 100 }, (_, index) => `Item ${index + 1}`);

  // Group items into chunks of 10
  const itemGroups = [];
  for (let i = 0; i < items.length; i += 10) {
    itemGroups.push(items.slice(i, i + 10));
  }

  const itemHeight = 60;
  const itemsPerGroup = 11; // 1 header + 10 items
  const groupHeight = itemHeight * itemsPerGroup;

  const Row = ({ index, style }) => {
    const isHeader = index % itemsPerGroup === 0;
    const groupIndex = Math.floor(index / itemsPerGroup);
    const itemIndex = index % itemsPerGroup - 1;
    const group = itemGroups[groupIndex];

    if (isHeader) {
      return (
        <div className="header-item" style={style}>
          {`${groupIndex + 1}x items`}
        </div>
      );
    }

    return (
      <div className="list-item" style={style}>
        {group[itemIndex]}
      </div>
    );
  };

  return (
    <div className="window-page">
      <header>
        <Link to="/" className="back-link">← Back to Home</Link>
        <h1>React Window Example</h1>
      </header>
      <div className="list-container">
        <AutoSizer>
          {({ height, width }) => (
            <List
              className="list"
              width={width}
              height={height}
              itemCount={itemGroups.length * itemsPerGroup}
              itemSize={itemHeight}
              overscanCount={5}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </div>
    </div>
  );
}

export default ReactWindow; 