import { useState, useEffect } from "react";
import { Book } from "./useFetchBooks";

const useFetchBook = (title: string, category: string) => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    fetchBook();
  }, [title, category]);

  return { book, loading, error };
};

export { useFetchBook };
