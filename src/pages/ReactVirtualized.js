import React from 'react';
import { Grid, AutoSizer } from 'react-virtualized';
import { Link } from 'react-router-dom';
import { ITEMS_IN_GROUP, VIRTUALIZED } from '../constants';
import './ReactVirtualized.css';

function ReactVirtualized() {
  // Create an array of 100 items
  const items = Array.from({ length: 100 }, (_, index) => `Item ${index + 1}`);

  // Group items into chunks
  const itemGroups = [];
  for (let i = 0; i < items.length; i += ITEMS_IN_GROUP) {
    itemGroups.push(items.slice(i, i + ITEMS_IN_GROUP));
  }

  const cellRenderer = ({ columnIndex, key, rowIndex, style }) => {
    const sectionIndex = Math.floor(rowIndex / VIRTUALIZED.ITEMS_PER_SECTION);
    const indexInSection = rowIndex % VIRTUALIZED.ITEMS_PER_SECTION;
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

  const calculateOverscanIndices = ({
    cellCount,
    startIndex,
    stopIndex,
    overscanCellsCount = 50
  }) => {
    return {
      overscanStartIndex: Math.max(0, startIndex - overscanCellsCount),
      overscanStopIndex: Math.min(cellCount - 1, stopIndex + overscanCellsCount)
    };
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
    const sectionHeight = VIRTUALIZED.ROW_HEIGHT * VIRTUALIZED.ITEMS_PER_SECTION;

    // Group cells by section
    const sections = new Map();

    for (let rowIndex = rowStartIndex; rowIndex <= rowStopIndex; rowIndex++) {
      const sectionIndex = Math.floor(rowIndex / VIRTUALIZED.ITEMS_PER_SECTION);
      
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
              top: (rowIndex % VIRTUALIZED.ITEMS_PER_SECTION) * VIRTUALIZED.ROW_HEIGHT,
              height: VIRTUALIZED.ROW_HEIGHT,
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
            {cells}
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
              rowHeight={VIRTUALIZED.ROW_HEIGHT}
              rowCount={itemGroups.length * VIRTUALIZED.ITEMS_PER_SECTION}
              cellRenderer={cellRenderer}
              cellRangeRenderer={cellRangeRenderer}
              overscanIndicesGetter={calculateOverscanIndices}
            />
          )}
        </AutoSizer>
      </div>
    </div>
  );
}

export default ReactVirtualized; 