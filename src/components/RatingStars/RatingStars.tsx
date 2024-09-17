import { MdStar, MdOutlineStarBorder } from "react-icons/md";

interface RatingStarsProps {
  /** The rating of the book (1-5) */
  rating?: number;
}

/**
 * Represents a component that renders star ratings
 *
 * @param {RatingStarsProps} - The properties for the RatingStars component
 * @returns {JSX.Element}
 */
const RatingStars = ({ rating }: RatingStarsProps): JSX.Element => {
  return (
    <>
      {[...Array(5)].map((_, index) =>
        rating && index < rating ? (
          <MdStar color="#FFD700" size={40} key={`star-${index}`} />
        ) : (
          <MdOutlineStarBorder
            color="#9f9f9f"
            size={40}
            key={`outlined-star-${index}`}
          />
        )
      )}
    </>
  );
};

export { RatingStars };
