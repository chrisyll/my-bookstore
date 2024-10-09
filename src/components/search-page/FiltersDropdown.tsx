import styled from "styled-components";
import { FilterType, Filters } from "utils/filters";

interface FiltersDropdownProps {
  /** Object containing the available filters for each filter type */
  dropdownFilters: Filters;

  /** Object containing the currently active filters */
  activeFilters: Filters;

  /** Callback function to handle changes in filter selection */
  onChange: (filterType: keyof Filters, value: string) => void;
}

/**
 * Represents a component that renders a dropdown menu that allows users to select filters
 *
 * @param {FiltersDropdownProps} props - The properties for the FiltersDropdown component
 * @returns {JSX.Element}
 */
const FiltersDropdown = ({
  dropdownFilters,
  activeFilters,
  onChange,
}: FiltersDropdownProps) => {
  return (
    <DropdownContainer>
      {Object.entries(dropdownFilters).map(([filterType, options]) => (
        <DropdownSection key={filterType}>
          <DropdownHeader>
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </DropdownHeader>
          {(options as string[]).map((option) => (
            <DropdownItem key={option}>
              <input
                type="checkbox"
                id={`${filterType}-${option}`}
                checked={activeFilters[filterType as FilterType].includes(
                  option
                )}
                onChange={() => onChange(filterType as keyof Filters, option)}
              />
              <label htmlFor={`${filterType}-${option}`}>{option}</label>
            </DropdownItem>
          ))}
        </DropdownSection>
      ))}
    </DropdownContainer>
  );
};

export { FiltersDropdown };

const DropdownContainer = styled.div`
  background-color: white;
  border-right: 1px solid #ccc;
  padding: 10px;
  overflow-y: auto;
  width: 240px;
`;

const DropdownSection = styled.div`
  margin-bottom: 10px;
`;

const DropdownHeader = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  input {
    margin-right: 8px;
  }

  label {
    cursor: pointer;
  }
`;
