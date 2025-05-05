import "./ReviewItem.css";

interface ReviewItemProps {
  readonly tourRating: string;
  readonly tourRatingName: string;
}

function ReviewItem({ tourRating, tourRatingName }:ReviewItemProps) {
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
