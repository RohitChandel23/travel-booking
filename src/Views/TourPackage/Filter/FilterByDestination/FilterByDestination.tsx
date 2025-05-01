import FilterCheckBox from "../FilterByReviews/Shared/FilterCheckBox"; 
import "./FilterByDestination.css";

interface Props {
  handleDestinationData: (value: string | null) => void;
  currentDestination: string | null; 
}

function FilterByDestination({ handleDestinationData, currentDestination }: Props) {

  function handleChange(destination: string) {
    const nextDestination = currentDestination === destination ? null : destination;
    handleDestinationData(nextDestination);
  }

  const asianLocations = ["Tokyo", "Nepal", "Mumbai", "China"];
  const europenLocations = ["Paris", "Italy", "Greece"];
  const americanLocations = ["Brazil", "Canada", "New York"];

  return (
    <div className="filter-by-destination-container"> 
      <h3>Destinations</h3>

      <div className="destination-continent-divs">
        <h4>Asia</h4> 
        <ul>
          {asianLocations.map((locationName) => (
            <FilterCheckBox
              key={`dest-asia-${locationName}`} 
              type="checkbox"
              id={`dest-${locationName}`} 
              value={locationName} 
              labelText={locationName}
              checked={currentDestination === locationName} 
              onChange={() => handleChange(locationName)} 
            />
          ))}
        </ul>
      </div>

      <div className="destination-continent-divs">
        <h4>Europe</h4>
        <ul>
          {europenLocations.map((locationName) => (
            <FilterCheckBox
              key={`dest-europe-${locationName}`}
              type="checkbox"
              id={`dest-${locationName}`}
              value={locationName}
              labelText={locationName}
              checked={currentDestination === locationName}
              onChange={() => handleChange(locationName)}
            />
          ))}
        </ul>
      </div>

      <div className="destination-continent-divs">
        <h4>America</h4>
        <ul>
          {americanLocations.map((locationName) => (
            <FilterCheckBox
              key={`dest-america-${locationName}`}
              type="checkbox"
              id={`dest-${locationName}`}
              value={locationName}
              labelText={locationName}
              checked={currentDestination === locationName}
              onChange={() => handleChange(locationName)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
export default FilterByDestination;