import './HomepageDestination.css';
import DestinationCard from '../../../DestinationPage/Shared/DestinationCard';
import { ProjectImages } from '../../../../assets/ProjectImages';

interface DestinationData {
  firstGrouped: string[];
  secondGrouped: string[];
  single: string;
}

interface CountryImageMap {
  [key: string]: string; // assuming image URLs/paths are strings
}

function HomepageDestination() {
  const destinationData: DestinationData = {
    firstGrouped: ["United Kingdom", "Canada", "Switzerland"],
    secondGrouped: ["Norway", "Australia"],
    single: "France"
  };

  const countryImageMap: CountryImageMap = {
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
