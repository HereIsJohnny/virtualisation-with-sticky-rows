import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ReactVirtualized from './pages/ReactVirtualized';
import ReactWindow from './pages/ReactWindow';
import './App.css';

function Home() {
  return (
    <div className="home">
      <h1>React Virtualization Examples</h1>
      <nav>
        <ul>
          <li>
            <Link to="/react-virtualized">React Virtualized Example</Link>
          </li>
          <li>
            <Link to="/react-window">React Window Example</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/react-virtualized" element={<ReactVirtualized />} />
          <Route path="/react-window" element={<ReactWindow />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;