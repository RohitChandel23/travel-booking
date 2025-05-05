import "./DestinationCard.css";
import { Link } from "react-router-dom";
import { ROUTES_CONFIG } from "../../../Shared/Constants";

interface DestinationCardProps {
  readonly countryName: string;
  readonly countryImage: string;
}

function DestinationCard({ countryName, countryImage }: DestinationCardProps) {
  const path = ROUTES_CONFIG.DESTINATION_DETAIL.path.replace(
    ":countryName",
    countryName
  );

  return (
    <div className="destination-card-wrapper">
      <img src={countryImage} alt={countryName} />
      <div className="destination-name-container">
        <h5 className="cursive-text">{countryName}</h5>
        <div className="travelers-count">174,688 Travelers</div>
      </div>
      <Link to={path} className="clickable-overlay" />
    </div>
  );
}

export default DestinationCard;
