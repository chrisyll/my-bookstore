import styled from "styled-components";

interface BookImageContainerProps {
  /** The URL of the image to be shown */
  imageURL?: string;

  /** The title of the book */
  title?: string;

  /** Whether the container should have smaller width */
  isSmallWidth?: boolean;
}

/**
 * Represents a component that displays the Image of a book
 * or an empty container if the Image is not defined
 *
 * @param {BookImageContainerProps} props - The properties for the BookImageContainer component
 * @returns {JSX.Element}
 */
const BookImageContainer = ({
  imageURL,
  title,
  isSmallWidth,
}: BookImageContainerProps) => {
  return (
    <ImageContainer $hasNoImage={false} $isSmallWidth={!!isSmallWidth}>
      <StyledImage src={imageURL} alt={title} />
    </ImageContainer>
  );
};

export { BookImageContainer };

const ImageContainer = styled.div<{
  $hasNoImage: boolean;
  $isSmallWidth: boolean;
}>`
  width: ${(props) => (props.$isSmallWidth ? "124px" : "240px")};
  aspect-ratio: 4/5;
  background-color: #f7f7f7;
  outline: ${(props) => props.$hasNoImage && "2px solid #f7f7f7"};
  border: ${(props) =>
    props.$hasNoImage ? "2px solid white" : "1px solid black"};
  border-radius: ${(props) => props.$hasNoImage && "4px"};
  display: ${(props) => props.$hasNoImage && "flex"};
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;
