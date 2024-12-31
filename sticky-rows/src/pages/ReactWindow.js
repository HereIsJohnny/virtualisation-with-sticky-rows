import React from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Link } from 'react-router-dom';
import { ITEMS_IN_GROUP, WINDOW } from '../constants';
import './ReactWindow.css';

function ReactWindow() {
  // Create an array of 100 items
  const items = Array.from({ length: 100 }, (_, index) => `Item ${index + 1}`);

  // Group items into chunks
  const itemGroups = [];
  for (let i = 0; i < items.length; i += ITEMS_IN_GROUP) {
    itemGroups.push(items.slice(i, i + ITEMS_IN_GROUP));
  }

  const groupHeight = WINDOW.ITEM_HEIGHT * WINDOW.ITEMS_PER_GROUP;

  const Row = ({ index, style }) => {
    const group = itemGroups[index];
    
    return (
      <div style={style} className="group-container">
        <div 
          className="header-item" 
          style={{ 
            top: `0px` 
          }}
        >
          {`${index + 1}x items`}
        </div>
        {group.map((item, idx) => (
          <div key={idx} className="list-item">
            {item}
          </div>
        ))}
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
              itemCount={itemGroups.length}
              itemSize={groupHeight}
              overscanCount={2}
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