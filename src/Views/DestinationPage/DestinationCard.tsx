import { useNavigate } from "react-router-dom";
import { ROUTES_CONFIG } from "../../Shared/Constants";
import "./DestinationCard.css";

interface DestinationCardProps {
  countryName: string;
  countryImage: string;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ countryName, countryImage }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTES_CONFIG.TOURS.path, { 
      state: { destinationName: countryName }
    });
  };

  return (
    <div className="destination-card" onClick={handleClick}>
      <img src={countryImage} alt={countryName} />
      <div className="card-content">
        <h3>{countryName}</h3>
        <div className="travelers-count">174,688 Travelers</div>
      </div>
    </div>
  );
};

export default DestinationCard; 