import './HomepageDestination.css';
import DestinationCard from '../DestinationPage/Shared/DestinationCard';
import { ProjectImages } from '../../assets/ProjectImages'; // Adjust path as needed

function HomepageDestination() {
  // Destination data structure similar to the DestinationPage component
  const destinationData = {
    firstGrouped: ["United Kingdom", "Canada", "Switzerland"],
    secondGrouped: ["Norway", "Australia"],
    single: "France"
  };

  // Map country names to their respective images
  const countryImageMap = {
    "United Kingdom": ProjectImages.UNITED_KINGDOM,
    "Canada": ProjectImages.CANADA,
    "Switzerland": ProjectImages.SWITZERLAND,
    "Norway": ProjectImages.NORWAY,
    "Australia": ProjectImages.AUSTRALIA,
    "France": ProjectImages.FRANCE
  };

  return (
    <div className='homepage-destination-section'>
      <div className='homepage-destination-container'>
        <h4 className='cursive-text'>Destination</h4>
        <h2>Top Attractions Destinations</h2>
        
        <div className="destination-grid-wrapper">
          <div className="grid-section">
            <div className="grouped-destinations-grid">
              <div className="first-grouped-destinations">
                {destinationData.firstGrouped.map((countryName) => (
                  <DestinationCard
                    key={countryName}
                    countryName={countryName}
                    countryImage={countryImageMap[countryName]}
                  />
                ))}
              </div>

              <div className="second-grouped-destinations">
                {destinationData.secondGrouped.map((countryName) => (
                  <DestinationCard
                    key={countryName}
                    countryName={countryName}
                    countryImage={countryImageMap[countryName]}
                  />
                ))}
              </div>
            </div>

            <div className="single-destinations-grid">
              <DestinationCard
                countryName={destinationData.single}
                countryImage={countryImageMap[destinationData.single]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomepageDestination;