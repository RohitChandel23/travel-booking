import "./StartRating.css";
import { useState } from "react";

function StarRating() {
  const [coloredStar, setColoredStar] = useState(0); 

  return (
    <div className="star-rating-container">
      <span className="project-normal-font">Services</span>
      <span className="star-container">
        {[...Array(5)].map((_, i) => (
          <i
            key={i}
            className={`fa-solid fa-star ${coloredStar > i ? "red-star" : "grey-star"}`}
            onClick={() => setColoredStar(i + 1)}   
          />
        ))}
      </span>
    </div>
  );
}
export default StarRating;
