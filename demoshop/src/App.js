import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import Search from './components/Search';
import Bookshelf from './components/Bookshelf';

function App() {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBookshelf);
  }, []);

  const addToBookshelf = (book) => {
    const updatedBookshelf = [...bookshelf, book];
    setBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Book Search</h1>
          <nav>
            <Link to="/">Search</Link>
            <Link to="/bookshelf">My Bookshelf</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Search addToBookshelf={addToBookshelf} />} />
            <Route path="/bookshelf" element={<Bookshelf />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
