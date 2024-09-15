import styled from "styled-components";
import { MdOutlineStarBorder, MdStar } from "react-icons/md";

interface BookPreviewProps {
  bookImgURL?: string;
  bookTitle: string;
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
      <BookContent>
        <ImageContainer>
          {bookImgURL ? (
            <StyledImage src={bookImgURL} alt={bookTitle} />
          ) : (
            <TextImage>Image</TextImage>
          )}
        </ImageContainer>
        <TitleContainer title={bookTitle ?? "Title"}>
          {bookTitle ?? "Title"}
        </TitleContainer>
      </BookContent>
      {showRating && (
        <RatingsContainer>
          {[...Array(5)].map((_, index) =>
            bookRating && index < bookRating ? (
              <MdStar color="#FFD700" size={22} key={`star-${index}`} />
            ) : (
              <MdOutlineStarBorder
                color="#9f9f9f"
                size={22}
                key={`outlined-star-${index}`}
              />
            )
          )}
        </RatingsContainer>
      )}
    </BookPreviewContainer>
  );
};

export { BookPreview };

const BookPreviewContainer = styled.div`
  width: 100%;
  height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const BookContent = styled.div`
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
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
  margin-top: 8px;
  font-size: 14px;
  text-align: center;
  height: fit-content;
`;

const RatingsContainer = styled.div`
  width: fit-content;
  margin: 0 auto;
  position: absolute;
  bottom: 0;
`;
