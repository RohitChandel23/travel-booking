import "./StarRating.css";
import { useState, useEffect } from "react";

interface StarRatingProps {
  ratingName?: string;
  onRatingChange: (ratingName: string, rating: number) => void;
  resetSignal: number; 
}

function StarRating({ ratingName = "", onRatingChange, resetSignal }: StarRatingProps) {
  const [coloredStar, setColoredStar] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);

  useEffect(() => {
    setColoredStar(0);
    setHoverStar(0);
  }, [resetSignal]);

  const handleClick = (index: number) => {
    const newRating = coloredStar === index + 1 ? 0 : index + 1;
    setColoredStar(newRating);
    onRatingChange(ratingName, newRating);
  };

  return (
    <div className="star-rating-container">
      {ratingName && <span className="project-normal-font">{ratingName}</span>}
      <span className="star-container">
        {[...Array(5)].map((_, i) => {
          let starClass = "grey-star";

          if (coloredStar > 0) {
            starClass = coloredStar > i ? "red-star" : "grey-star";
          } else if (hoverStar > 0) {
            starClass = hoverStar > i ? "hover-star" : "grey-star";
          }

          return (
            <i
              key={i}
              className={`fa-solid fa-star ${starClass}`}
              onClick={() => handleClick(i)}
              onMouseEnter={() => setHoverStar(i + 1)}
              onMouseLeave={() => setHoverStar(0)}
            />
          );
        })}
      </span>
    </div>
  );
}

export default StarRating;