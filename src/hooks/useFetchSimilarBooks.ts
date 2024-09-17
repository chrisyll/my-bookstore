import { useState, useEffect } from "react";
import { Book } from "./useFetchBooks";

const useFetchSimilarBooks = (selectedCategories: string[]) => {
  const [similarBooks, setSimilarBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch("/assets/books.json");
      const data = await response.json();

      const filteredBooks = data.books.filter((book: Book) =>
        book.categories.some((category) =>
          selectedCategories.includes(category)
        )
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

  useEffect(() => {
    fetchBooks();
  }, [selectedCategories]);

  return { similarBooks, loading, error };
};

export { useFetchSimilarBooks };
