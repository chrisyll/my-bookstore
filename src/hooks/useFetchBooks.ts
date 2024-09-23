import { useState, useEffect } from "react";

interface Book {
  isbn10: string;
  isbn13: string;
  title: string;
  author: string[];
  published: string;
  publisher: string;
  pages: number;
  description: string;
  categories: string[];
  imageURL: string;
  rating: number;
}

/**
 * Custom hook to fetch all books
 *
 * @returns  {Object} - The books, loading status, and error message
 */
const useFetchBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/assets/books.json");

        const data = await response.json();
        setBooks(data.books);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Unknown error occured.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return { books, loading, error };
};

export { useFetchBooks, type Book };
