import React from 'react';
import './App.css';

function App() {
  // Create an array of 100 items
  const items = Array.from({ length: 100 }, (_, index) => `Item ${index + 1}`);

  // Group items into chunks of 10
  const itemGroups = [];
  for (let i = 0; i < items.length; i += 10) {
    itemGroups.push(items.slice(i, i + 10));
  }

  return (
    <div className="App">
      <h1>Scrollable List</h1>
      <div className="list-container">
        {itemGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="list-section">
            {/* Sticky item at the beginning of each group */}
            <div className="list-item sticky-item">
              {`${groupIndex + 1}x items`}
            </div>
            {/* Regular items */}
            {group.map((item, index) => (
              <div 
                key={index} 
                className="list-item absolute-item"
                style={{ top: `${(index + 1) * 40}px` }}
              >
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;