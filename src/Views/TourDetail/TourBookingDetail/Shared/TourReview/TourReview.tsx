import "./TourReview.css";
import AddReview from "./AddReview";
import ReviewItem from "./ReviewItem";

interface TourReviewProps {
  tourRating: string | number;
}

function TourReview({ tourRating }: TourReviewProps) {
  // Ensure the tourRating is always a string
  const rating = typeof tourRating === 'number' ? tourRating.toString() : tourRating;

  function generateRatingCategory(rating: string | number) {
    if (typeof rating === "number") {
      if (rating >= 4) return "Excellent";
      if (rating < 3) return "Bad";
      return "Good";
    }
    return "N/A"; // Handle cases where it's not a valid number
  }

  return (
    <div className="tour-review-section">
      <div className="average-review-section">
        <div className="total-average-reviews">
          <h2 className="project-heading-font">{rating}</h2>
          {/* tour average review */}
          <p>
            <i className="fa-solid fa-star" />
            {generateRatingCategory(Number(rating))}
          </p>
          {/* tour review category */}
        </div>
        <div className="review-item">
          <ReviewItem tourRating={rating} tourRatingName="Service" />
          <ReviewItem tourRating={rating} tourRatingName="Location" />
          <ReviewItem tourRating={rating} tourRatingName="Price" />
        </div>
        <div className="review-item">
          <ReviewItem tourRating={rating} tourRatingName="Food" />
          <ReviewItem tourRating={rating} tourRatingName="Amenities" />
          <ReviewItem tourRating={rating} tourRatingName="Quality" />
        </div>
      </div>

      <AddReview />
    </div>
  );
}

export default TourReview;
