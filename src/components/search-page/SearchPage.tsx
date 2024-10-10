import { useMemo, useState } from "react";
import styled from "styled-components";
import { BookPreview } from "components/book-page/BookPreview";
import { Spinner } from "components/shared/Spinner";
import { ErrorMessage } from "components/shared/ErrorMessage";
import { Filters, getAvailableFilters } from "utils/filters";
import { FiltersDropdown } from "components/search-page/FiltersDropdown";
import { filterBooks } from "utils/filterBooks";
import { useFetchBooks } from "hooks/useFetchBooks";

/**
 * Represents a component that provides funcionality
 * to search for books and filter them
 *
 * @returns {JSX.Element}
 */
const SearchPage = () => {
  const { books, loading, error } = useFetchBooks();

  //SEARCH INPUT STATE
  const [searchInput, setSearchInput] = useState("");

  //FILTER STATE
  const [activeFilters, setActiveFilters] = useState<Filters>({
    category: [],
    year: [],
    publisher: [],
  });

  //LIST OF FILTERED BOOKS
  const filteredBooks = useMemo(
    () => filterBooks(books, searchInput, activeFilters),
    [books, searchInput, activeFilters]
  );

  const dropdownFilters: Filters = getAvailableFilters();

  //UPDATE ACTIVE FILTERS
  const handleFiltersChange = (filterType: keyof Filters, value: string) => {
    setActiveFilters((prev) => {
      const filters = prev[filterType];
      let updatedFilters;

      if (filters.includes(value)) {
        updatedFilters = filters.filter((filter) => filter !== value);
      } else {
        updatedFilters = [...filters, value];
      }

      return {
        ...prev,
        [filterType]: updatedFilters,
      };
    });
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <SearchPageContainer data-testid="app-search-page">
      <FiltersDropdownContainer>
        <FiltersDropdown
          dropdownFilters={dropdownFilters}
          activeFilters={activeFilters}
          onChange={handleFiltersChange}
        />
      </FiltersDropdownContainer>
      <MainContentContainer>
        <DescriptionText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </DescriptionText>
        <SearchContainer>
          <SearchInput
            type="search"
            placeholder="Search . . ."
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          <ActiveFiltersContainer>
            <FilterChipsContainer>
              {activeFilters.category.map((filter) => (
                <FilterChip>{filter}</FilterChip>
              ))}
              {activeFilters.year.map((filter) => (
                <FilterChip>{filter}</FilterChip>
              ))}
              {activeFilters.publisher.map((filter) => (
                <FilterChip>{filter}</FilterChip>
              ))}
            </FilterChipsContainer>
          </ActiveFiltersContainer>
        </SearchContainer>
        <ItemsContainer>
          {filteredBooks.map((book, index) => (
            <BookItem key={index}>
              <BookPreview showRating book={book} />
            </BookItem>
          ))}
        </ItemsContainer>
      </MainContentContainer>
    </SearchPageContainer>
  );
};

export { SearchPage };

const SearchPageContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;

const FiltersDropdownContainer = styled.div`
  position: absolute;
  left: 0;
`;

const MainContentContainer = styled.div`
  width: 50%;
`;

const DescriptionText = styled.div`
  font-size: 14px;
  text-align: center;
`;

const SearchContainer = styled.div`
  width: 90%;
  margin-top: 16px;
  margin-left: auto;
  margin-right: auto;
`;

const SearchInput = styled.input`
  width: 100%;
  margin: 0 auto;
  padding: 18px;
  border-radius: 8px;
  border: 1px solid black;
  text-align: center;
  font-size: 18px;
  box-sizing: border-box;

  &::placeholder {
    color: #dbdbdb;
  }
`;

const ActiveFiltersContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  padding-left: 8px;
  width: 100%;
  box-sizing: border-box;
`;

const FilterChipsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const FilterChip = styled.div`
  max-width: 140px;
  height: 24px;
  padding: 4px 8px;
  box-sizing: border-box;
  background-color: #dbdbdb;
  border-radius: 4px;
  color: white;
  font-size: 12px;
`;

const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 24px;
  row-gap: 40px;
  margin-top: 64px;
  margin-bottom: 32px;
`;

const BookItem = styled.div`
  display: flex;
  justify-content: center;
`;
