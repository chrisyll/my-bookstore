import { MdStar, MdOutlineStarBorder } from "react-icons/md";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import authorIcon from "../../images/author_icon.png";
import { BooksCarousel } from "../BooksCarousel/BooksCarousel";
import { useFetchSimilarBooks } from "../../hooks/useFetchSimilarBooks";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { Spinner } from "../Spinner/Spinner";
import { useFetchBook } from "../../hooks/useFetchBook";

const BookPage = () => {
  const { bookCategory = "", bookTitle = "" } = useParams();
  const { book, loading, error } = useFetchBook(bookTitle, bookCategory);

  const {
    similarBooks,
    loading: loadingSimilarBooks,
    error: errorSimilarBooks,
  } = useFetchSimilarBooks(book?.categories ?? []);

  if (!book) {
    return <ErrorMessage error="Something went wrong" />;
  }

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <Container>
      <ContentWrapper>
        <ImageSection>
          <ImageContainer>
            <StyledImage src={book?.imageURL} alt={book.title} />
          </ImageContainer>
          <AuthorSection>
            <AuthorImage src={authorIcon} alt="Author Icon" />
            <AuthorName>{book.author}</AuthorName>
          </AuthorSection>
          <RatingsContainer>
            {[...Array(5)].map((_, index) =>
              book.rating && index < book.rating ? (
                <MdStar color="#FFD700" size={40} key={`star-${index}`} />
              ) : (
                <MdOutlineStarBorder
                  color="#9f9f9f"
                  size={40}
                  key={`outlined-star-${index}`}
                />
              )
            )}
          </RatingsContainer>
        </ImageSection>
        <DetailsSection>
          <Title>{book.title}</Title>
          <Description>{book.description}</Description>
          <ButtonGroup>
            <StyledButton onClick={() => console.log("FAVORITE")}>
              Favorite
            </StyledButton>
            <StyledButton onClick={() => console.log("SHARE")}>
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
  width: 90%;
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

const ImageContainer = styled.div`
  width: 240px;
  aspect-ratio: 4/5;
  background-color: #f7f7f7;
  outline: 2px solid #f7f7f7;
  border: 2px solid white;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
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

const StyledButton = styled.button`
  background-color: white;
  width: 64px;
  border: 1px solid black;
  border-radius: 4px;
  padding: 4px;
  cursor: pointer;

  &:hover {
    background-color: #e7e7e7;
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
  background-color: white;
  border-radius: 4px;
  border: 1px solid black;
  margin: 0 auto;
  display: block;
  margin-top: 32px;
  cursor: pointer;

  &:hover {
    background-color: #e7e7e7;
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
