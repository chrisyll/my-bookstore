import styled from "styled-components";
import { FilterType, Filters } from "../../utils/filters";

interface FiltersDropdownProps {
  dropdownPosition: { top: number; left: number } | null;
  dropdownFilters: Filters;
  activeFilters: Filters;
  onChange: (filterType: keyof Filters, value: string) => void;
}

const FiltersDropdown = ({
  dropdownPosition,
  dropdownFilters,
  activeFilters,
  onChange,
}: FiltersDropdownProps) => {
  return (
    <DropdownContainer
      style={{
        top: dropdownPosition?.top,
        left: dropdownPosition?.left,
      }}
    >
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
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 10px;
  z-index: 1000;
  max-height: 300px;
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
