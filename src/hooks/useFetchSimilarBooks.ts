import { useState, useEffect } from "react";
import { Book } from "hooks/useFetchBooks";

/**
 * Custom hook to fetch all books with similar categories
 *
 * @param {string[]} categories - The categories to search for in books
 * @returns  {Object} - The books, loading status, and error message
 */
const useFetchSimilarBooks = (categories: string[]) => {
  const [similarBooks, setSimilarBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await fetch("/assets/books.json");
        const data = await response.json();

        const filteredBooks = data.books.filter((book: Book) =>
          book.categories.some((category) => categories.includes(category))
        );

        setSimilarBooks(filteredBooks);
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
  }, [categories]);

  return { similarBooks, loading, error };
};

export { useFetchSimilarBooks };
