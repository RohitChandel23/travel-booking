import './TourCard.css';
import { Link } from 'react-router-dom';
import { ROUTES_CONFIG } from '../../Shared/Constants';

interface tourCardProps {
  cityName: string;
  countryName: string;
  tourName: string;
  tourImage: string;
  tourRating: string;
  tourReview: string;
  tourPrice: number;
  tourDuration: string;
  slugValue: string;
}

function TourCard({
  cityName,
  countryName,
  tourName,
  tourImage,
  tourRating,
  tourReview,
  tourPrice,
  tourDuration,
  slugValue,
}: tourCardProps) {
  return (
    <div className="tour-card-container">
      <div className="tour-image-container">
        <img src={tourImage} />
      </div>
      <div className="tour-info-container">
        <p>
          {cityName}, {countryName}
        </p>
        <Link className='link-class'
          to={ROUTES_CONFIG.TOURS_DETAIL.path.replace(':slugId', slugValue)}
        >
          {' '}
          <h4>{tourName}</h4>
        </Link>

        <div className="tour-additional-info">
          <div className="rating-reviews">
            <span className="rating-star-class">
              <i className="fa fa-star" /> {tourRating} <br />
            </span>
            <span className="tour-additional-info-text">
              {tourReview} reviews <br />
            </span>
          </div>
          <span className="tour-additional-info-text">
            {tourDuration}
            <br />
          </span>
        </div>

        <div className="tour-price">
          <p>Starting From</p>
          <span className="tour-price-text">
            ${tourPrice}
            <br />
          </span>
        </div>
      </div>
    </div>
  );
}

export default TourCard;
