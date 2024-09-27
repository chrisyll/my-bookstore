import { useState, useEffect } from "react";
import { Book } from "@/hooks/useFetchBooks";

/**
 * Custom hook to fetch a single book by its title and category
 *
 * @param {string} title - The title of the book to be fetched
 * @param {string} category - The category of the book to be fetched
 * @returns {Object} - The book, loading status, and error message
 */
const useFetchBook = (title: string, category: string) => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch("/assets/books.json");
        const data = await response.json();
        const book = data.books.find(
          (book: Book) =>
            book.title.toLowerCase() === title.toLowerCase() &&
            book.categories.includes(category)
        );
        setBook(book);
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

    fetchBook();
  }, [title, category]);

  return { book, loading, error };
};

export { useFetchBook };
