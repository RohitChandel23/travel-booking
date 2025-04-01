import "./TourReview.css";
import ReviewItem from "./ReviewItem";


function TourReview({ tourRating }) {
  function generateRatingCategory(tourRating) {
    if (tourRating >= 4) return "Excellent";
    else if (tourRating < 3) return "Bad";
    else return "Good";
  }

  return (
    <div className="tour-review-section">
      <div className="total-average-reviews">
        <h2 className="project-heading-font">{tourRating}</h2>{" "}
        {/* tour average review */}
        <p>
          <i className="fa-solid fa-star" />
          {generateRatingCategory(tourRating)}
        </p>{" "}
        {/*tour review category */}
      </div>
      <div className="review-item">
        <ReviewItem tourRating={tourRating} tourRatingName={"Service"} />
        <ReviewItem tourRating={tourRating} tourRatingName={"Location"} />
        <ReviewItem tourRating={tourRating} tourRatingName={"Price"} />
      </div>
      <div className="review-item">
        <ReviewItem tourRating={tourRating} tourRatingName={"Food"} />
        <ReviewItem tourRating={tourRating} tourRatingName={"Amenities"} />
        <ReviewItem tourRating={tourRating} tourRatingName={"Quality"} />
      </div>
    </div>
  );
}
export default TourReview;
