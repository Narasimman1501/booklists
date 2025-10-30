// src/pages/MyList.tsx
import React from 'react';

const MyList: React.FC = () => {
  // Example: Replace with books fetched from backend/auth context if needed
  const books = [
    { id: 1, title: 'Book Title 1' },
    { id: 2, title: 'Book Title 2' }
  ];

  return (
    <div className="p-6 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-white">My Book List</h1>
      <ul>
        {books.map(book => (
          <li key={book.id} className="border-b py-2 text-white">{book.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyList;
