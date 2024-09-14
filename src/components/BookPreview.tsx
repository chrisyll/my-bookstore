import styled from "styled-components";
import { MdOutlineStarBorder, MdStar } from "react-icons/md";

interface BookInfo {
  isbn: string;
  title: string;
  subtitle: string;
  author: string;
  published: string;
  publisher: string;
  pages: number;
  description: string;
  website: string;
}

interface BookPreviewProps {
  bookImgURL?: string;
  bookTitle?: string;
  bookRating?: number;
  showRating?: boolean;
}

const BookPreview = ({
  bookImgURL,
  bookTitle,
  bookRating,
  showRating,
}: BookPreviewProps) => {
  return (
    <BookPreviewContainer>
      <ImageContainer>
        {bookImgURL ? (
          <StyledImage src={bookImgURL} alt={bookTitle} />
        ) : (
          <TextImage>Image</TextImage>
        )}
      </ImageContainer>
      <TitleContainer>{bookTitle ?? "Title"}</TitleContainer>
      {showRating && (
        <RatingsContainer>
          {[...Array(5)].map((_, index) =>
            bookRating && index < bookRating ? (
              <MdStar color="#FFD700" size={22} />
            ) : (
              <MdOutlineStarBorder color="#9f9f9f" size={22} />
            )
          )}
        </RatingsContainer>
      )}
    </BookPreviewContainer>
  );
};

export { BookPreview };

const BookPreviewContainer = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 124px;
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
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;

const TextImage = styled.div`
  color: #b5b5b5;
  font-size: 14px;
  text-align: center;
`;

const TitleContainer = styled.div`
  margin-top: 4px;
  font-size: 14px;
  text-align: center;
`;

const RatingsContainer = styled.div`
  width: fit-content;
  margin: 0 auto;
`;
