import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { BookPreview } from "../BookPage/BookPreview";
import { Spinner } from "../Spinner/Spinner";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { Filters, getAvailableFilters } from "../../utils/filters";
import { FiltersDropdown } from "./FiltersDropdown";
import { filterBooks } from "../../utils/filterBooks";
import { useFetchBooks } from "../../hooks/useFetchBooks";

const SearchPage = () => {
  const { books, loading, error } = useFetchBooks();
  const [searchInput, setSearchInput] = useState("");
  const [activeFilters, setActiveFilters] = useState<Filters>({
    category: [],
    year: [],
    publisher: [],
  });
  const filteredBooks = useMemo(
    () => filterBooks(books, searchInput, activeFilters),
    [books, searchInput, activeFilters]
  );

  const dropdownFilters: Filters = getAvailableFilters();
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const handleShowFiltersDropdown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { top, left } = e.currentTarget.getBoundingClientRect();
      setDropdownPosition({ top: top + 24, left: left });
      setShowDropdown(!showDropdown);
    },
    [setDropdownPosition, setShowDropdown, showDropdown]
  );

  const handleFiltersChange = useCallback(
    (filterType: keyof Filters, value: string) => {
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
    },
    [setActiveFilters]
  );

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
    <SearchPageContainer>
      <DescriptionText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </DescriptionText>
      <SearchContainer>
        <SearchInput
          type="search"
          placeholder="Search . . ."
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <FiltersContainer>
          <FilterLabel>Filters:</FilterLabel>
          <FilterCirclesContainer onClick={handleShowFiltersDropdown}>
            {Object.keys(activeFilters).map((_, index) => (
              <FilterCircle key={index} />
            ))}
          </FilterCirclesContainer>
        </FiltersContainer>
        {showDropdown && (
          <FiltersDropdown
            dropdownPosition={dropdownPosition}
            dropdownFilters={dropdownFilters}
            activeFilters={activeFilters}
            onChange={handleFiltersChange}
          />
        )}
      </SearchContainer>
      <ItemsContainer>
        {filteredBooks.map((book, index) => (
          <BookItem key={index}>
            <BookPreview showRating book={book} />
          </BookItem>
        ))}
      </ItemsContainer>
    </SearchPageContainer>
  );
};

export { SearchPage };

const SearchPageContainer = styled.div`
  padding: 0 80px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  flex: 1;
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

  &::placeholder {
    color: #dbdbdb;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  padding-left: 8px;
  position: relative;
`;

const FilterLabel = styled.span`
  font-size: 18px;
`;

const FilterCirclesContainer = styled.div`
  display: flex;
  gap: 8px;
  cursor: pointer;
`;

const FilterCircle = styled.div`
  border: 1px solid black;
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;

const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 16px;
  row-gap: 32px;
  margin-top: 64px;
  margin-bottom: 32px;
`;

const BookItem = styled.div`
  display: flex;
  justify-content: center;
`;
