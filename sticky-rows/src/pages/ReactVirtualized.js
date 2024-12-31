import React from 'react';
import { Grid, AutoSizer } from 'react-virtualized';
import { Link } from 'react-router-dom';
import './ReactVirtualized.css';

function ReactVirtualized() {
  // Create an array of 100 items
  const items = Array.from({ length: 100 }, (_, index) => `Item ${index + 1}`);

  // Group items into chunks of 10
  const itemGroups = [];
  for (let i = 0; i < items.length; i += 10) {
    itemGroups.push(items.slice(i, i + 10));
  }

  const rowHeight = 60;
  const itemsPerSection = 11; // 1 header + 10 items

  const cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    const sectionIndex = Math.floor(rowIndex / itemsPerSection);
    const indexInSection = rowIndex % itemsPerSection;
    const group = itemGroups[sectionIndex];

    if (indexInSection === 0) {
      return (
        <div key={key} style={{ ...style, position: 'sticky' }} className="list-item sticky-item">
          {`${sectionIndex + 1}x items`}
        </div>
      );
    }

    const itemIndex = indexInSection - 1;
    return (
      <div key={key} style={style} className="list-item">
        {group[itemIndex]}
      </div>
    );
  };

  const cellRangeRenderer = ({
    rowStartIndex,
    rowStopIndex,
    cellCache,
    cellRenderer,
    columnStartIndex,
    columnStopIndex,
  }) => {
    const renderedCells = [];
    const sectionHeight = rowHeight * itemsPerSection;

    // Group cells by section
    const sections = new Map();

    for (let rowIndex = rowStartIndex; rowIndex <= rowStopIndex; rowIndex++) {
      const sectionIndex = Math.floor(rowIndex / itemsPerSection);
      
      if (!sections.has(sectionIndex)) {
        sections.set(sectionIndex, []);
      }

      for (let columnIndex = columnStartIndex; columnIndex <= columnStopIndex; columnIndex++) {
        const cellKey = `${rowIndex}-${columnIndex}`;
        const cell = cellCache[cellKey] || 
          cellRenderer({
            columnIndex,
            key: cellKey,
            rowIndex,
            style: {
              position: 'absolute',
              left: 0,
              right: 0,
              top: (rowIndex % itemsPerSection) * rowHeight,
              height: rowHeight,
            }
          });

        sections.get(sectionIndex).push(cell);
      }
    }

    // Render each section with its cells
    sections.forEach((cells, sectionIndex) => {
      renderedCells.push(
        <div
          key={`section-${sectionIndex}`}
          className="section-wrapper"
          style={{
            position: 'absolute',
            top: sectionIndex * sectionHeight,
            height: sectionHeight,
            left: 0,
            right: 0,
          }}
        >
          <div className="section-container">
            {cells}
          </div>
        </div>
      );
    });

    return renderedCells;
  };

  return (
    <div className="virtualized-page">
      <header>
        <Link to="/" className="back-link">← Back to Home</Link>
        <h1>React Virtualized Example</h1>
      </header>
      <div className="list-container">
        <AutoSizer>
          {({ height, width }) => (
            <Grid
              className="virtual-grid"
              width={width}
              height={height}
              columnWidth={width}
              columnCount={1}
              rowHeight={rowHeight}
              rowCount={itemGroups.length * itemsPerSection}
              cellRenderer={cellRenderer}
              cellRangeRenderer={cellRangeRenderer}
              overscanRowCount={20}
            />
          )}
        </AutoSizer>
      </div>
    </div>
  );
}

export default ReactVirtualized; 