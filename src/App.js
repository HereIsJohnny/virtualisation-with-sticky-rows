import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ReactVirtualized from './pages/ReactVirtualized';
import ReactWindow from './pages/ReactWindow';
import './App.css';

function Home() {
  return (
    <div className="home">
      <h1>React Virtualization Examples (Sticky Rows)</h1>
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
        <header className="App-header">
          <a 
            href="https://github.com/HereIsJohnny/virtualisation-with-sticky-rows"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#61dafb', marginTop: '1rem' }}
          >
            View on GitHub
          </a>
        </header>
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