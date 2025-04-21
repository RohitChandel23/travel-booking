import '../../Views/TourCard/TourCard.css';
import './TourCardSkeleton.css';

function TourCardSkeleton() {
  return (
    <div className="tour-card-container skeleton">
      <div className="tour-image-container skeleton-box" />

      <div className="tour-info-container">
        <div className="skeleton-line short" />
        <div className="skeleton-line medium" />

        <div className="tour-additional-info">
          <div className="rating-reviews">
            <div className="skeleton-badge" />
            <div className="skeleton-line tiny" />
          </div>
          <div className="skeleton-line tiny" />
        </div>

        <div className="tour-price">
          <div className="skeleton-line tiny" />
          <div className="skeleton-line short" />
        </div>
      </div>
    </div>
  );
}

export default TourCardSkeleton;
