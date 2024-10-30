import { Formik, ErrorMessage, Form, FieldArray } from "formik";
import styled from "styled-components";
import { BookSchema } from "utils/bookSchema";
import { useRef } from "react";
import crossIcon from "images/circle_outline_cross.png";
import { parseToNumber, FormValues } from "utils/formHandlers";
import { StringFormFieldComponent } from "components/add-book-page/StringFormFieldComponent";
import { NumFormFieldComponent } from "components/add-book-page/NumFormFieldComponent";
import { ArrayFormFieldComponent } from "components/add-book-page/ArrayFormFieldComponent";

interface AddBookFormProps {
  /** Function called when form is submitted */
  onSubmit: (values: FormValues) => void;
}

/**
 * Represents a form component to add a new book
 * Allows multiple books to be added
 *
 * @param {AddBookFormProps} props - The properties for the AddBookForm component
 * @returns {JSX.element}
 */
const AddBookForm = ({ onSubmit }: AddBookFormProps) => {
  //STORE FIELD ARRAY PROPS
  const arrayHelpersRef = useRef<any>(null);

  //STORE IMAGE INPUT REF
  const imageInputRef = useRef<HTMLInputElement>(null);

  const formInitialValues = {
    title: "",
    description: "",
    categories: [""],
    authors: [""],
    publisher: "",
    published: 0,
    pages: 0,
    image: null,
    rating: 0,
    isbn10: "",
    isbn13: "",
  };

  return (
    <Formik
      initialValues={{
        forms: [formInitialValues],
      }}
      validationSchema={BookSchema}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, handleSubmit, isValid, dirty }) => (
        <StyledForm onSubmit={handleSubmit}>
          <FieldArray
            name="forms"
            render={(arrayHelpers) => {
              arrayHelpersRef.current = arrayHelpers;
              return (
                <>
                  {/* RENDER FORM FOR EACH BOOK ENTRY */}
                  {/* RENDER FORM FOR EACH BOOK ENTRY */}
                  {/* RENDER FORM FOR EACH BOOK ENTRY */}
                  {values.forms.map((form, index) => (
                    <FormContainer key={index}>
                      <Column>
                        <StringFormFieldComponent
                          fieldPath={`forms[${index}].title`}
                          fieldName="Title"
                        />
                        <StringFormFieldComponent
                          fieldPath={`forms[${index}].description`}
                          fieldName="Description"
                        />
                        <ArrayFormFieldComponent
                          fieldPath={`forms[${index}].categories`}
                          fieldName="Categories"
                          itemsList={form.categories}
                          maxLength={4}
                          onClick={() => {
                            if (form.categories.length < 4) {
                              setFieldValue(`forms[${index}].categories`, [
                                ...form.categories,
                                "",
                              ]);
                            }
                          }}
                        />
                        <ArrayFormFieldComponent
                          fieldPath={`forms[${index}].authors`}
                          fieldName="Authors"
                          itemsList={form.authors}
                          maxLength={3}
                          onClick={() => {
                            if (form.authors.length < 3) {
                              setFieldValue(`forms[${index}].authors`, [
                                ...form.authors,
                                "",
                              ]);
                            }
                          }}
                        />
                        <StringFormFieldComponent
                          fieldPath={`forms[${index}].publisher`}
                          fieldName="Publisher"
                        />
                        <NumFormFieldComponent
                          fieldPath={`forms[${index}].published`}
                          fieldName="Published"
                          fieldValue={form.published}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setFieldValue(
                              `forms[${index}].published`,
                              parseToNumber(e.target.value)
                            );
                          }}
                        />
                        <NumFormFieldComponent
                          fieldPath={`forms[${index}].pages`}
                          fieldName="Pages"
                          fieldValue={form.pages}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setFieldValue(
                              `forms[${index}].pages`,
                              parseToNumber(e.target.value)
                            );
                          }}
                        />
                      </Column>
                      <Column>
                        <FormField>
                          <ImageContainer
                            onClick={() => imageInputRef.current?.click()}
                          >
                            {form.image ? (
                              <StyledImage
                                src={URL.createObjectURL(form.image)}
                                alt="Image preview"
                              />
                            ) : (
                              <>
                                <TextImage>Import image</TextImage>
                                <TextImage>.jpg .png .gif</TextImage>
                              </>
                            )}
                          </ImageContainer>
                          <HiddenLabel htmlFor={`forms[${index}].image`}>
                            Image
                          </HiddenLabel>
                          <ImageInput
                            name={`forms[${index}].image`}
                            id={`forms[${index}].image`}
                            type="file"
                            accept=".jpg, .jpeg, .png, .gif"
                            ref={imageInputRef}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              if (e.target.files?.[0]) {
                                setFieldValue(
                                  `forms[${index}].image`,
                                  e.target.files[0]
                                );
                              }
                            }}
                          />
                          <ErrorMessage
                            component="div"
                            className="error"
                            name={`forms[${index}].image`}
                          />
                        </FormField>
                        <NumFormFieldComponent
                          fieldPath={`forms[${index}].rating`}
                          fieldName="Rating"
                          fieldValue={form.rating}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setFieldValue(
                              `forms[${index}].rating`,
                              parseToNumber(e.target.value)
                            );
                          }}
                        />
                        <StringFormFieldComponent
                          fieldPath={`forms[${index}].isbn10`}
                          fieldName="ISBN-10"
                        />
                        <StringFormFieldComponent
                          fieldPath={`forms[${index}].isbn13`}
                          fieldName="ISBN-13"
                        />
                      </Column>
                    </FormContainer>
                  ))}
                </>
              );
            }}
          />
          <AddAnotherBookContainer>
            <AddButtonContainer>
              <CrossIcon
                src={crossIcon}
                onClick={() =>
                  arrayHelpersRef.current.insert(
                    values.forms.length,
                    formInitialValues
                  )
                }
              />
              <AddAnotherBookText>Add another book</AddAnotherBookText>
            </AddButtonContainer>
          </AddAnotherBookContainer>
          <SaveButton disabled={!isValid || !dirty} type="submit">
            SAVE
          </SaveButton>
        </StyledForm>
      )}
    </Formik>
  );
};

export { AddBookForm };

const StyledForm = styled(Form)`
  .error {
    font-size: 12px;
  }
`;

const FormContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  padding: 16px;
  box-sizing: border-box;
  margin: 8px auto;
`;

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

const Column = styled.div`
  width: 280px;
`;

const ImageContainer = styled.div`
  width: 124px;
  aspect-ratio: 4/5;
  background-color: #f7f7f7;
  outline: 2px solid #f7f7f7;
  border: 2px solid white;
  border-radius: 4px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 auto;
`;

const ImageInput = styled.input`
  display: none;
`;

const TextImage = styled.div`
  color: #b5b5b5;
  font-size: 14px;
  text-align: center;
  margin-bottom: 8px;
`;

const HiddenLabel = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;

const AddAnotherBookContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  margin-top: 32px;
`;

const AddButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CrossIcon = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const AddAnotherBookText = styled.div`
  margin-top: 8px;
`;

const SaveButton = styled.button<{ disabled: boolean }>`
  width: 180px;
  padding: 8px;
  border-radius: 4px;
  border: ${(props) => (props.disabled ? "none" : "1px solid #3b4f6a")};
  margin: 64px 0;
  background-color: ${(props) => (props.disabled ? "#e0e0e0" : "#486289")};
  color: ${(props) => (props.disabled ? "#a9a9a9" : "white")};
  cursor: ${(props) => !props.disabled && "pointer"};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => !props.disabled && "#5a799c"};
  }
`;
