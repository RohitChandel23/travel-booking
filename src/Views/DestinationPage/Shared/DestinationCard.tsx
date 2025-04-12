import "./DestinationCard.css";
import { Link } from "react-router-dom";
import { ROUTES_CONFIG } from "../../../Shared/Constants";

interface DestinationCardProps {
  countryName: string;
  countryImage: string;
}

function DestinationCard({ countryName, countryImage }: DestinationCardProps) {
  //destination image, country name
  return (
    <div className="destination-card-wrapper">
      <img src={countryImage} alt={countryName} />

      <div className="destination-name-container">
        <Link
          className="link-class"
          to={ROUTES_CONFIG.DESTINATION_DETAIL.path.replace(
            ":countryName",
            countryName
          )}
        >
          <h5 className="cursive-text">{countryName}</h5>
          <div className="travelers-count">174,688 Travelers</div>
        </Link>
      </div>
    </div>
  );
}
export default DestinationCard;
