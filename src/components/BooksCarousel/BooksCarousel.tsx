import AliceCarousel from "react-alice-carousel";

import "react-alice-carousel/lib/alice-carousel.css";
import { Book } from "@/hooks/useFetchBooks";
import { BookPreview } from "@/components/BookPage/BookPreview";
import styled from "styled-components";
import { useState } from "react";

interface BooksCarouselProps {
  /** The books displayed in the carousel */
  books: Book[];
}

/**
 * Represents a carousel component that contains books previews
 *
 * @param {BooksCarouselProps} - The properties for the BooksCarousel component
 * @returns {JSX.Element}
 */
const BooksCarousel = ({ books }: BooksCarouselProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleSlideChange = () => {
    setIsDragging(true);
  };

  const handleSlideEnd = () => {
    setTimeout(() => setIsDragging(false), 200);
  };

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 4 },
  };

  const items = books.map((book) => (
    <BookPreview book={book} smallHeight isDragging={isDragging} />
  ));

  return (
    <CarouselWrapper>
      <AliceCarousel
        items={items}
        responsive={responsive}
        disableButtonsControls
        mouseTracking
        onSlideChange={handleSlideChange}
        onSlideChanged={handleSlideEnd}
      />
    </CarouselWrapper>
  );
};

export { BooksCarousel };

const CarouselWrapper = styled.div`
  .alice-carousel__dots-item {
    background-color: #d3d3d3;
    transition: all 0.3s ease;
  }

  .alice-carousel__dots-item.__active {
    background-color: #000000;
  }

  .alice-carousel__dots-item:hover {
    background-color: #000000;
    transform: scale(1.2);
  }
`;
