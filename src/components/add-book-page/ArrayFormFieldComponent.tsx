import { Field, ErrorMessage } from "formik";
import styled from "styled-components";

interface ArrayFormFieldComponentProps {
  /** The Formik field path, used to map to form state */
  fieldPath: string;
  /** The display name for the field */
  fieldName: string;
  /** Maximum number of entries allowed for the field */
  maxLength: number;
  /** Array of current values for the field entries */
  itemsList: string[];
  /** Handler to add a new entry to the list */
  onClick: () => void;
}

/**
 * Represents a component that displays a Formik Field that
 * may have multiple dynamic entries
 *
 * @param {ArrayFormFieldComponentProps} props - The properties for the ArrayFormFieldComponent
 * @returns {JSX.Element}
 */
const ArrayFormFieldComponent = ({
  fieldPath,
  fieldName,
  maxLength,
  itemsList,
  onClick,
}: ArrayFormFieldComponentProps) => {
  return (
    <FormField>
      <FlexContainer>
        <label htmlFor={`${fieldPath}[${0}]`}>{fieldName}:</label>
        <RelativeContainer>
          {itemsList.map((_, index) => (
            <InputContainer key={index}>
              <Field
                name={`${fieldPath}[${index}]`}
                placeholder={`Category ${index + 1}`}
                id={`${fieldPath}[${index}]`}
              />
              <ErrorMessage
                component="div"
                className="error"
                name={`${fieldPath}[${index}]`}
              />
            </InputContainer>
          ))}

          {itemsList.length < maxLength && (
            <AddButton
              type="button"
              onClick={onClick}
              disabled={itemsList[itemsList.length - 1] === ""}
            >
              +
            </AddButton>
          )}
        </RelativeContainer>
      </FlexContainer>
    </FormField>
  );
};

export { ArrayFormFieldComponent };

const FormField = styled.div`
  margin-bottom: 12px;
  min-height: 48px;

  label {
    display: block;
    margin-bottom: 8px;
  }

  .error {
    color: red;
    margin-top: 5px;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 180px;
`;

const RelativeContainer = styled.div`
  position: relative;
`;

const AddButton = styled.button`
  background-color: #c3c3c3;
  color: white;
  border: none;
  border-radius: 25%;
  padding: 4px 8px;
  cursor: pointer;
  right: 0;

  &:hover {
    background-color: #afafaf;
  }

  &:disabled {
    cursor: default;
    background-color: #e0e0e0;
  }

  &:disabled:hover {
    background-color: #e0e0e0;
  }
`;
