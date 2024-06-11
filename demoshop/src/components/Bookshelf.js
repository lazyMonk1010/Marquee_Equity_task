import React, { useState, useEffect } from 'react';

function Bookshelf() {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBookshelf);
  }, []);

  return (
    <div>
      <h2>My Bookshelf</h2>
      {bookshelf.length === 0 ? (
        <p>No books in your bookshelf. Add some from the search page!</p>
      ) : (
        <div>
          {bookshelf.map((book) => (
            <div key={book.key} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
              <h3>{book.title}</h3>
              <p>Author: {book.author_name ? book.author_name.join(', ') : 'Unknown'}</p>
              <p>First Published: {book.first_publish_year || 'Unknown'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Bookshelf;
