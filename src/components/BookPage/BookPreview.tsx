import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Book } from "../../hooks/useFetchBooks";
import { RatingStars } from "../RatingStars/RatingStars";
import { BookImageContainer } from "./BookImageContainer";

interface BookPreviewProps {
  /** The book data displayed in the preview */
  book: Book;

  /** Determines if the rating stars should be displayed */
  showRating?: boolean;

  /** Determines if the height of the book preview should be smaller */
  smallHeight?: boolean;

  /** Whether the BookPreview item is being dragged */
  isDragging?: boolean;
}

/**
 * Represents a component that is a preview of a book
 * When clicked, it navigates to the book's details page
 *
 * @param {BookPreviewProps} props - The properties for the BookPreview component
 * @returns {JSX.Element}
 */
const BookPreview = ({
  book,
  showRating,
  smallHeight,
  isDragging,
}: BookPreviewProps) => {
  const navigate = useNavigate();

  return (
    <BookPreviewContainer
      onClick={() =>
        !isDragging && navigate(`/home/${book.categories[0]}/${book.title}`)
      }
      $smallHeight={smallHeight}
    >
      <BookContent>
        <BookImageContainer
          imageURL={book.imageURL}
          title={book.title}
          isSmallWidth
        />
        <TitleContainer title={book.title ?? "Title"}>
          {book?.title ?? "Title"}
        </TitleContainer>
      </BookContent>
      {showRating && (
        <RatingsContainer>
          <RatingStars rating={book.rating} isSmallStars />
        </RatingsContainer>
      )}
    </BookPreviewContainer>
  );
};

export { BookPreview };

const BookPreviewContainer = styled.div<{ $smallHeight?: boolean }>`
  width: 100%;
  max-width: 180px;
  height: ${(props) => (!props.$smallHeight ? "256px" : "unset")};
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

const TitleContainer = styled.div`
  margin-top: 8px;
  font-size: 14px;
  text-align: center;
  height: 40px;
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RatingsContainer = styled.div`
  width: fit-content;
  margin: 0 auto;
  position: absolute;
  bottom: 0;
`;
