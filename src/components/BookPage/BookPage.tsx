import { useParams } from "react-router-dom";
import styled from "styled-components";
import authorIcon from "@/images/author_icon.png";
import { BooksCarousel } from "@/components/BooksCarousel/BooksCarousel";
import { useFetchSimilarBooks } from "@/hooks/useFetchSimilarBooks";
import { ErrorMessage } from "@/components/ErrorMessage/ErrorMessage";
import { Spinner } from "@/components/Spinner/Spinner";
import { useFetchBook } from "@/hooks/useFetchBook";
import { RatingStars } from "@/components/RatingStars/RatingStars";
import { BookImageContainer } from "@/components/BookPage/BookImageContainer";

/**
 * Represents a component that displays detailed information about
 * a specific book
 *
 * @returns {JSX.Element}
 */
const BookPage = () => {
  //GET URL PARAMS
  const { bookCategory = "", bookTitle = "" } = useParams();

  //GET CORRESPONDING BOOK
  const { book, loading, error } = useFetchBook(bookTitle, bookCategory);

  const {
    similarBooks,
    loading: loadingSimilarBooks,
    error: errorSimilarBooks,
  } = useFetchSimilarBooks(book?.categories ?? []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (!book) {
    return <ErrorMessage error="Something went wrong" />;
  }

  return (
    <Container>
      <ContentWrapper>
        <ImageSection>
          <BookImageContainer imageURL={book.imageURL} title={book.title} />
          <AuthorSection>
            <AuthorImage src={authorIcon} alt="Author Icon" />
            <AuthorName>{book.author}</AuthorName>
          </AuthorSection>
          <RatingsContainer>
            <RatingStars rating={book.rating} />
          </RatingsContainer>
        </ImageSection>
        <DetailsSection>
          <Title>{book.title}</Title>
          <Description>{book.description}</Description>
          <ButtonGroup>
            <StyledButton
              onClick={() => console.log("FAVORITE")}
              $backgroundColor="#f1c40f"
              $hoverColor="#f39c12"
              $borderColor="#d4ac0d"
            >
              Favorite
            </StyledButton>
            <StyledButton
              onClick={() => console.log("SHARE")}
              $backgroundColor="#3498db"
              $hoverColor="#2980b9"
              $borderColor="#2980b9"
            >
              Share
            </StyledButton>
          </ButtonGroup>
          <InfoSection>
            <InfoItem>
              Category:{" "}
              {book.categories.map((category) => `#${category}`).join(", ")}
            </InfoItem>
            <InfoItem>Year: {book.published}</InfoItem>
            <InfoItem>Number of Pages: {book.pages}</InfoItem>
          </InfoSection>
          <InfoSection>
            <InfoItem>Publisher: {book.publisher}</InfoItem>
            <InfoItem>ISBN-10: {book.isbn10}</InfoItem>
            <InfoItem>ISBN-13: {book.isbn13}</InfoItem>
          </InfoSection>
          <BuyButton onClick={() => console.log("BUY")}>BUY</BuyButton>
        </DetailsSection>
      </ContentWrapper>
      <OtherBooksSection>
        <SectionTitle>Other Books you may like</SectionTitle>
        {loadingSimilarBooks ? (
          <Spinner />
        ) : errorSimilarBooks ? (
          <ErrorMessage error={errorSimilarBooks} />
        ) : (
          <BooksCarousel books={similarBooks} />
        )}
      </OtherBooksSection>
    </Container>
  );
};

export { BookPage };

const Container = styled.div`
  width: 50%;
  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 160px;
`;

const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorSection = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

const AuthorName = styled.div`
  height: 32px;
  line-height: 32px;
  font-size: 14px;
`;

const AuthorImage = styled.img`
  width: 32px;
`;

const RatingsContainer = styled.div`
  width: fit-content;
`;

const DetailsSection = styled.div``;

const Title = styled.div`
  font-weight: 500;
  font-size: 32px;
  margin-bottom: 16px;
`;

const Description = styled.div`
  font-size: 14px;
  margin-bottom: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const StyledButton = styled.button<{
  $backgroundColor: string;
  $hoverColor: string;
  $borderColor: string;
}>`
  background-color: ${(props) => props.$backgroundColor};
  color: white;
  width: 64px;
  border: 1px solid ${(props) => props.$borderColor};
  border-radius: 4px;
  padding: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => props.$hoverColor};
  }
`;

const InfoSection = styled.div`
  font-size: 14px;
  margin-bottom: 16px;
`;

const InfoItem = styled.div``;

const BuyButton = styled.button`
  width: 192px;
  padding: 8px;
  box-sizing: border-box;
  background-color: #e74c3c;
  color: white;
  border-radius: 4px;
  border: 1px solid #c0392b;
  margin: 0 auto;
  display: block;
  margin-top: 32px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #c0392b;
  }
`;

const OtherBooksSection = styled.div`
  margin: 80px 0;
`;

const SectionTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin: 32px 0;
`;
