import "./ReviewItem.css";

function ReviewItem({ tourRating, tourRatingName }) {
  return (
    <div className="review-item-container">
      <p>{tourRatingName}</p>
      <span>
        <progress value={tourRating} max={5}></progress>{" "}
        <span> {tourRating}</span>
      </span>
    </div>
  );
}
export default ReviewItem;
