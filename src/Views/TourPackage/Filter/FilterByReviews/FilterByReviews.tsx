import { useState, useEffect } from "react";
import ReviewCheckBox from "./Shared/FilterCheckBox";
import "./FilterReviews.css";

interface Props {
  handleRatingData: (value: any[]) => void;
}

function FilterByReview({ handleRatingData }: Props) {
  const [selectedRating, setSelectedRating] = useState<any>([]);
  const ratingData = [1, 2, 3, 4, 5];

  useEffect(() => {
    handleRatingData(selectedRating);
  }, [selectedRating]);

  function handleChange(value: any) {
    setSelectedRating((prev: any) =>
      selectedRating.includes(value)
        ? selectedRating.filter((item: any) => item != value)
        : [...prev, value]
    );
  }

  return (
    <div className="filter-by-review-container">
      <h6>Reviews</h6>
      <ul>
        {ratingData.map((value) => (
          <ReviewCheckBox
            type="checkbox"
            id={value}
            value={value}
            checked={selectedRating?.includes(value)}
            onChange={() => handleChange(value)}
            labelText={` ${value} stars`}
          />
        ))}
      </ul>
    </div>
  );
}
export default FilterByReview;
