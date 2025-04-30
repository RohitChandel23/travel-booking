import {useEffect, useState} from 'react';
import "./FilterByDestination.css";
import FilterCheckBox from "../FilterByReviews/Shared/FilterCheckBox";

interface Props{
    handleDestinationData: (value:string | null)=>void
}

function FilterByDestination({handleDestinationData}:Props) {        
    const [selectedDestination, setSelectedDestination] = useState<string | null>(null);    
    
    function handleChange(destination:string){
        setSelectedDestination(prev => 
            prev === destination ? null : destination
        );  
    }
    console.log(selectedDestination)

    useEffect(()=>{
        handleDestinationData(selectedDestination ? selectedDestination: null ); 
    },[selectedDestination]);

    
    
  const asianLocations = ["Tokyo", "Nepal", "Mumbai", "China"];
  const europenLocations = ["Paris", "Italy", "Greece"];
  const americanLocations = ["Brazil", "Canada", "New York"];
   
  return (
    <div className="filter-by-review-container">
      <h6>Destinations</h6>

      <div className="destination-continent-divs">
        <h6>Asia</h6>
        <ul>
          {asianLocations?.map((locationName) => (
            <FilterCheckBox
              type="checkbox"
              id={locationName}
              value={locationName}
              labelText={locationName}
              checked={selectedDestination === locationName }
              onChange= {handleChange}
            />
          ))}
        </ul>
      </div>

      <div className="destination-continent-divs">
        <h6>Europe</h6>
        <ul>
          {europenLocations?.map((locationName) => (
            <FilterCheckBox
            type="checkbox"
            id={locationName}
            value={locationName}
            labelText={locationName}
            checked={selectedDestination === locationName}
            onChange= {handleChange}
            />
          ))}
        </ul>
      </div>

      <div className="destination-continent-divs">
        <h6>America</h6>
        <ul>
          {americanLocations?.map((locationName) => (
            <FilterCheckBox
            type="checkbox"
            id={locationName}
            value={locationName}
            labelText={locationName}
            checked={selectedDestination === locationName}
            onChange= {handleChange}
            />
          ))}
        </ul>
      </div>

    </div>
  );
}
export default FilterByDestination;


