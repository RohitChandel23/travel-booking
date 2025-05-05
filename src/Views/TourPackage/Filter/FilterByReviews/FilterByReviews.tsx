import ReviewCheckBox from "./Shared/FilterCheckBox";
import "./FilterReviews.css";

interface Props {
  readonly handleRatingData: (value: number[]) => void;
  readonly currentRatings: number[];
}

function FilterByReview({ handleRatingData, currentRatings }: Props) {
  const ratingData = [1, 2, 3, 4, 5];

  function handleChange(value: number) {
    const nextSelectedRatings = currentRatings.includes(value)
      ? currentRatings.filter((item) => item !== value)
      : [...currentRatings, value];
    handleRatingData(nextSelectedRatings);
  }

  return (
    <div className="filter-by-review-container">
      <h3>Reviews</h3>
      <ul>
        {ratingData.map((value) => (
          <ReviewCheckBox
            key={`rating-${value}`}
            type="checkbox"
            id={`rating-${value}`}
            value={value}
            checked={currentRatings.includes(value)}
            onChange={() => handleChange(value)}
            labelText={` ${value} stars`}
          />
        ))}
      </ul>
    </div>
  );
}
export default FilterByReview;
