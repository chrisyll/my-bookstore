import { ErrorMessage, Field } from "formik";
import styled from "styled-components";

interface NumFormFieldComponentProps {
  /** The Formik field path, used to map to form state */
  fieldPath: string;
  /** The display name for the field */
  fieldName: string;
  /** The current field value */
  fieldValue: number;
  /** Change handler for the numeric field */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Represents a component that displays a Formik Field that
 * accepts numeric values
 *
 * @param {NumFormFieldComponentProps} props - The properties for the FormNumFieldComponent
 * @returns {JSX.Element}
 */
const NumFormFieldComponent = ({
  fieldPath,
  fieldName,
  fieldValue,
  onChange,
}: NumFormFieldComponentProps) => {
  return (
    <FormField>
      <FlexContainer>
        <label htmlFor={fieldPath}>{fieldName}:</label>
        <EndAlignedContainer>
          <FieldSmall
            name={fieldPath}
            id={fieldPath}
            value={fieldValue === 0 ? "" : fieldValue}
            onChange={onChange}
          />
          <ErrorMessage component="div" className="error" name={fieldPath} />
        </EndAlignedContainer>
      </FlexContainer>
    </FormField>
  );
};

export { NumFormFieldComponent };

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

const FieldSmall = styled(Field)`
  width: 40px;
`;

const EndAlignedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
