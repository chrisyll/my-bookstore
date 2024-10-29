import styled from "styled-components";
import { AddBookForm } from "components/add-book-page/AddBookForm";
import { formSubmitHandler } from "utils/formHandlers";

/**
 * Represents a Form wrapper component
 *
 * @returns {JSX.Element}
 */
const AddBookPage = () => {
  return (
    <AddBookPageContainer>
      <AddBookForm onSubmit={formSubmitHandler} />
    </AddBookPageContainer>
  );
};

export { AddBookPage };

const AddBookPageContainer = styled.div`
  width: 50%;
  margin: 0 auto;
`;
