// import { useState, useEffect } from "react";
// import ReviewCheckBox from "./Shared/FilterCheckBox";
// import "./FilterReviews.css";

// interface Props {
//   handleRatingData: (value: any[]) => void;
// }

// function FilterByReview({ handleRatingData }: Props) {
//   const [selectedRating, setSelectedRating] = useState<any>([]);
//   const ratingData = [1, 2, 3, 4, 5];

//   useEffect(() => {
//     handleRatingData(selectedRating);
//   }, [selectedRating]);

//   function handleChange(value: any) {
//     setSelectedRating((prev: any) =>
//       selectedRating.includes(value)
//         ? selectedRating.filter((item: any) => item != value)
//         : [...prev, value]
//     );
//   }

//   return (
//     <div className="filter-by-review-container">
//       <h6>Reviews</h6>
//       <ul>
//         {ratingData.map((value) => (
//           <ReviewCheckBox
//             type="checkbox"
//             id={value}
//             value={value}
//             checked={selectedRating?.includes(value)}
//             onChange={() => handleChange(value)}
//             labelText={` ${value} stars`}
//           />
//         ))}
//       </ul>
//     </div>
//   );
// }
// export default FilterByReview;







import ReviewCheckBox from "./Shared/FilterCheckBox";
import "./FilterReviews.css";

interface Props {
  handleRatingData: (value: number[]) => void;
  currentRatings: number[];
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
