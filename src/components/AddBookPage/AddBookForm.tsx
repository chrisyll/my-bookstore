import { Formik, Field, ErrorMessage, Form, FieldArray } from "formik";
import styled from "styled-components";
import { BookSchema } from "../../utils/bookSchema";
import { useRef } from "react";
import crossIcon from "../../images/circle_outline_cross.png";

/**
 * Represents a form component to add a new book
 * Allows multiple books to be added
 *
 * @returns {JSX.element}
 */
const AddBookForm = () => {
  //STORE FIELD ARRAY PROPS
  const arrayHelpersRef = useRef<any>(null);

  //STORE IMAGE INPUT REF
  const imageInputRef = useRef<HTMLInputElement>(null);

  const formInitialValues = {
    title: "",
    description: "",
    categories: [""],
    author: [""],
    publisher: "",
    year: "",
    pages: "",
    image: null,
    rating: "",
    isbn10: "",
    isbn13: "",
  };

  return (
    <Formik
      initialValues={{
        forms: [formInitialValues],
      }}
      validationSchema={BookSchema}
      onSubmit={(values) => {
        console.log("Form submitted with values: ", values);
      }}
    >
      {({ values, setFieldValue, handleSubmit }) => (
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
                        <FormField>
                          <FlexContainer>
                            <label htmlFor={`forms[${index}].title`}>
                              Title:
                            </label>
                            <InputContainer>
                              <Field
                                name={`forms[${index}].title`}
                                type="text"
                              />
                              <ErrorMessage
                                component="div"
                                className="error"
                                name={`forms[${index}].title`}
                              />
                            </InputContainer>
                          </FlexContainer>
                        </FormField>

                        <FormField>
                          <FlexContainer>
                            <label htmlFor={`forms[${index}].description`}>
                              Description:
                            </label>
                            <InputContainer>
                              <Field
                                name={`forms[${index}].description`}
                                type="text"
                              />
                              <ErrorMessage
                                component="div"
                                className="error"
                                name={`forms[${index}].description`}
                              />
                            </InputContainer>
                          </FlexContainer>
                        </FormField>

                        <FormField>
                          <FlexContainer>
                            <label>Categories:</label>
                            <RelativeContainer>
                              {form.categories.map((_, catIndex) => (
                                <InputContainer key={catIndex}>
                                  <Field
                                    name={`forms[${index}].categories[${catIndex}]`}
                                    placeholder={`Category ${catIndex + 1}`}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="error"
                                    name={`forms[${index}].categories[${catIndex}]`}
                                  />
                                </InputContainer>
                              ))}

                              {form.categories.length < 4 && (
                                <AddButton
                                  type="button"
                                  onClick={() => {
                                    if (form.categories.length < 4) {
                                      setFieldValue(
                                        `forms[${index}].categories`,
                                        [...form.categories, ""]
                                      );
                                    }
                                  }}
                                  disabled={
                                    form.categories[
                                      form.categories.length - 1
                                    ] === ""
                                  }
                                >
                                  +
                                </AddButton>
                              )}
                            </RelativeContainer>
                          </FlexContainer>
                        </FormField>

                        <FormField>
                          <FlexContainer>
                            <label>Authors:</label>
                            <RelativeContainer>
                              {form.author.map((_, authIndex) => (
                                <InputContainer key={authIndex}>
                                  <Field
                                    name={`forms[${index}].author[${authIndex}]`}
                                    placeholder={`Author ${authIndex + 1}`}
                                  />
                                  <ErrorMessage
                                    component="div"
                                    className="error"
                                    name={`forms[${index}].author[${authIndex}]`}
                                  />
                                </InputContainer>
                              ))}

                              {form.author.length < 3 && (
                                <AddButton
                                  type="button"
                                  onClick={() => {
                                    if (form.author.length < 3) {
                                      setFieldValue(`forms[${index}].author`, [
                                        ...form.author,
                                        "",
                                      ]);
                                    }
                                  }}
                                  disabled={
                                    form.author[form.author.length - 1] === ""
                                  }
                                >
                                  +
                                </AddButton>
                              )}
                            </RelativeContainer>
                          </FlexContainer>
                        </FormField>

                        <FormField>
                          <FlexContainer>
                            <label htmlFor={`forms[${index}].publisher`}>
                              Publisher:
                            </label>
                            <InputContainer>
                              <Field
                                name={`forms[${index}].publisher`}
                                type="text"
                              />
                              <ErrorMessage
                                component="div"
                                className="error"
                                name={`forms[${index}].publisher`}
                              />
                            </InputContainer>
                          </FlexContainer>
                        </FormField>

                        <FormField>
                          <FlexContainer>
                            <label htmlFor={`forms[${index}].year`}>
                              Year:
                            </label>
                            <EndAlignedContainer>
                              <NumberInput
                                name={`forms[${index}].year`}
                                type="number"
                              />
                              <ErrorMessage
                                component="div"
                                className="error"
                                name={`forms[${index}].year`}
                              />
                            </EndAlignedContainer>
                          </FlexContainer>
                        </FormField>

                        <FormField>
                          <FlexContainer>
                            <label htmlFor={`forms[${index}].pages`}>
                              Page Numbers:
                            </label>
                            <EndAlignedContainer>
                              <NumberInput
                                name={`forms[${index}].pages`}
                                type="number"
                              />
                              <ErrorMessage
                                component="div"
                                className="error"
                                name={`forms[${index}].pages`}
                              />
                            </EndAlignedContainer>
                          </FlexContainer>
                        </FormField>
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
                            type="file"
                            accept=".jpg, .jpeg, .png, .gif"
                            ref={imageInputRef}
                            onChange={(event) => {
                              if (event.target.files?.[0]) {
                                setFieldValue(
                                  `forms[${index}].image`,
                                  event.target.files[0]
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

                        <FormField>
                          <FlexContainer>
                            <label htmlFor={`forms[${index}].rating`}>
                              Rating:
                            </label>
                            <InputContainer>
                              <NumberInput
                                name={`forms[${index}].rating`}
                                type="number"
                              />
                              <ErrorMessage
                                component="div"
                                className="error"
                                name={`forms[${index}].rating`}
                              />
                            </InputContainer>
                          </FlexContainer>
                        </FormField>

                        <FormField>
                          <FlexContainer>
                            <label htmlFor={`forms[${index}].isbn10`}>
                              ISBN-10:
                            </label>
                            <InputContainer>
                              <Field
                                name={`forms[${index}].isbn10`}
                                type="text"
                              />
                              <ErrorMessage
                                component="div"
                                className="error"
                                name={`forms[${index}].isbn10`}
                              />
                            </InputContainer>
                          </FlexContainer>
                        </FormField>

                        <FormField>
                          <FlexContainer>
                            <label htmlFor={`forms[${index}].isbn13`}>
                              ISBN-13:
                            </label>
                            <InputContainer>
                              <Field
                                name={`forms[${index}].isbn13`}
                                type="text"
                              />
                              <ErrorMessage
                                component="div"
                                className="error"
                                name={`forms[${index}].isbn13`}
                              />
                            </InputContainer>
                          </FlexContainer>
                        </FormField>
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
          <SaveButton type="submit">SAVE</SaveButton>
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

const NumberInput = styled(Field)`
  width: 40px;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Column = styled.div`
  width: 280px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 180px;
`;

const RelativeContainer = styled.div`
  position: relative;
`;

const EndAlignedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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

const SaveButton = styled.button`
  width: 180px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #3b4f6a;
  margin: 64px 0;
  background-color: #486289;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &: hover {
    background-color: #5a799c;
  }
`;
