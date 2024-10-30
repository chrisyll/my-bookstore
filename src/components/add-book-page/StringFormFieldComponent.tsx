import { Field, ErrorMessage } from "formik";
import styled from "styled-components";

interface StringFormFieldComponentProps {
  /** The Formik field path, used to map to form state */
  fieldPath: string;
  /** The display name for the field */
  fieldName: string;
}

/**
 * Represents a component that displays a Formik Field that
 * accepts string values
 *
 * @param {StringFormFieldComponentProps} props - The properties for the FormFieldComponent
 * @returns {JSX.Element}
 */
const StringFormFieldComponent = ({
  fieldPath,
  fieldName,
}: StringFormFieldComponentProps) => {
  return (
    <FormField>
      <FlexContainer>
        <label htmlFor={fieldPath}>{fieldName}:</label>
        <InputContainer>
          <Field name={fieldPath} type="text" id={fieldPath} />
          <ErrorMessage component="div" className="error" name={fieldPath} />
        </InputContainer>
      </FlexContainer>
    </FormField>
  );
};

export { StringFormFieldComponent };

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
