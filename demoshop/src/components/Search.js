import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Search.css';

function Search({ addToBookshelf }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      if (query.trim() !== '') {
        try {
          console.log(`Fetching books for query: ${query}`);
          const response = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`);
          const data = await response.json();
          console.log('Fetched data:', data);
          setResults(data.docs);
        } catch (error) {
          console.error('Error fetching books:', error);
        }
      } else {
        setResults([]);
      }
    };

    const debounceFetch = setTimeout(fetchBooks, 300);
    return () => clearTimeout(debounceFetch);
  }, [query]);

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books..."
        />
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
      </div>
      <div className="search-results">
        {results.map((book) => (
          <div key={book.key} className="book-item">
            <h3>{book.title}</h3>
            <p>Author: {book.author_name ? book.author_name.join(', ') : 'Unknown'}</p>
            <p>First Published: {book.first_publish_year || 'Unknown'}</p>
            <button onClick={() => addToBookshelf(book)}>Add to Bookshelf</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
