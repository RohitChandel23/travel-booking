import "./TourCategoryCard.css";

interface TourCategoryCardProps {
  tourType: string;
  numberOfTours: number;
  startingPrice: number;
  categoryIcon: string;
}

function TourCategoryCard({
  tourType,
  numberOfTours,
  startingPrice,
  categoryIcon,
}: TourCategoryCardProps) {
  return (
    <div className="tour-category-card">
      <img src={categoryIcon} />
      <h6>{tourType}</h6>
      <p>{numberOfTours} Tours+</p>
      <div className="category-card-price">
        <p>From</p>
        <h5 className="cursive-text">${startingPrice}</h5>
      </div>
    </div>
  );
}
export default TourCategoryCard;
