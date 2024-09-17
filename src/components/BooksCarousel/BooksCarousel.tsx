import AliceCarousel from "react-alice-carousel";

import "react-alice-carousel/lib/alice-carousel.css";
import { Book } from "../../hooks/useFetchBooks";
import { BookPreview } from "../BookPage/BookPreview";
import styled from "styled-components";

interface BooksCarouselProps {
  books: Book[];
}

const BooksCarousel = ({ books }: BooksCarouselProps) => {
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 4 },
  };

  const items = books.map((book) => <BookPreview book={book} smallHeight />);

  return (
    <CarouselWrapper>
      <AliceCarousel
        items={items}
        responsive={responsive}
        disableButtonsControls
      />
    </CarouselWrapper>
  );
};

export { BooksCarousel };

const CarouselWrapper = styled.div`
  .alice-carousel__dots-item {
    background-color: #c9c9c9;
  }

  .alice-carousel__dots-item.__active {
    background-color: #777777;
  }

  .alice-carousel__dots-item:hover {
    background-color: #777777;
  }
`;
