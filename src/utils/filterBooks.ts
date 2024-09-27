import { Filters } from "./filters";
import { Book } from "@/hooks/useFetchBooks";

/**
 * Filters a list of books based on search input and active filters
 *
 * @param {Book[]} books - The array of books to be filtered
 * @param {string} searchInput - The search input string used to filter books by title
 * @param {Filters} activeFilters - The active filters including category, year, and publisher
 *
 * @returns {Book[]} - An array of books filtered according to the search input and active filters
 */
const filterBooks = (
  books: Book[],
  searchInput: string,
  activeFilters: Filters
) => {
  const searchInputFilteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  const filteredBooks = searchInputFilteredBooks.filter((book) => {
    const categoryMatches =
      activeFilters.category.length === 0 ||
      book.categories.some((category) =>
        activeFilters.category.includes(category)
      );

    const yearMatches =
      activeFilters.year.length === 0 ||
      activeFilters.year.includes(book.published);

    const publisherMatches =
      activeFilters.publisher.length === 0 ||
      activeFilters.publisher.includes(book.publisher);

    return categoryMatches && yearMatches && publisherMatches;
  });

  return filteredBooks;
};

export { filterBooks };
