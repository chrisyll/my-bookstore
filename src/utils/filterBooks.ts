import { Filters } from "./filters";
import { Book } from "../hooks/useFetchBooks";

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
