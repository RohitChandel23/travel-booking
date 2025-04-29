import "./AddReview.css";
import StarRating from "./Shared/StarRating/StarRating";
import AddingComment from "../../../../../../Shared/AddingComment/AddingComment";
import { useState } from "react";

function AddReview() {
  const [ratings, setRatings] = useState<{ [key: string]: number }>({
    Services: 0,
    "Value for money": 0,
    Location: 0,
    Facilities: 0,
    Staff: 0,
  });
  const [resetSignal, setResetSignal] = useState(0); 

  const handleRatingChange = (ratingName: string, rating: number) => {
    setRatings((prev) => ({ ...prev, [ratingName]: rating }));
  };

  const handleReset = () => {
    setRatings({
      Services: 0,
      "Value for money": 0,
      Location: 0,
      Facilities: 0,
      Staff: 0,
    });
    setResetSignal((prev) => prev + 1); 
  };

  return (
    <div className="add-review-container">
      <h5>Add a review</h5>

      <div className="review-rating-container">
        <StarRating
          ratingName="Services"
          onRatingChange={handleRatingChange}
          resetSignal={resetSignal}
        />
        <StarRating
          ratingName="Value for money"
          onRatingChange={handleRatingChange}
          resetSignal={resetSignal}
        />
        <StarRating
          ratingName="Location"
          onRatingChange={handleRatingChange}
          resetSignal={resetSignal}
        />
        <StarRating
          ratingName="Facilities"
          onRatingChange={handleRatingChange}
          resetSignal={resetSignal}
        />
        <StarRating
          ratingName="Staff"
          onRatingChange={handleRatingChange}
          resetSignal={resetSignal}
        />
      </div>

      <div className="adding-tour-review">
        <AddingComment ratings={ratings} onReset={handleReset} collectionType="tour-review"/>
      </div>
    </div>
  );
}

export default AddReview;