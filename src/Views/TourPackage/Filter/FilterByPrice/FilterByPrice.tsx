// import "./FilterByPrice.css";
// import { useState } from "react";
// import Slider from "rc-slider";
// import "rc-slider/assets/index.css";
// import Button from "../../../../Components/Buttons/Button";

// interface priceFilterProps {
//   handleSelectedPrice: (value: [number, number]) => void;
// }

// function FilterByPrice({ handleSelectedPrice }: priceFilterProps) {
//   const [range, setRange] = useState<[number, number]>([0, 1]);

//   return (
//     <div className="filter-by-price-container">
//       <h3>Filter By</h3>
//       <div style={{ width: 250, margin: "2rem auto" }}>
//         <Slider
//           range
//           min={0}
//           max={1}
//           step={0.00001}
//           value={range}
//           onChange={(value: number | number[]) => {
//             if (Array.isArray(value)) setRange(value as [number, number]);
//           }}
//           allowCross={false}
//         />
//         <div className="slider-selected-price">
//           <span>{range[0]} ETH</span>
//           <span>{range[1]} ETH</span>
//         </div>
//       </div>
//       <Button name="Submit" handleClick={() => handleSelectedPrice(range)} />
//     </div>
//   );
// }

// export default FilterByPrice;




import "./FilterByPrice.css";
import { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Button from "../../../../Components/Buttons/Button"; 

interface priceFilterProps {
  handleSelectedPrice: (value: number[]) => void;
  currentPriceRange: number[];
}

const DEFAULT_PRICE_RANGE: [number, number] = [0, 1];

function FilterByPrice({ handleSelectedPrice, currentPriceRange }: priceFilterProps) {
  const [range, setRange] = useState<[number, number]>(DEFAULT_PRICE_RANGE);

//resetting
  useEffect(() => {
    if (currentPriceRange.length === 0) {
        if (range[0] !== DEFAULT_PRICE_RANGE[0] || range[1] !== DEFAULT_PRICE_RANGE[1]) {
           setRange(DEFAULT_PRICE_RANGE);
        }
    } else if (Array.isArray(currentPriceRange) && currentPriceRange.length === 2) {
        const parentRange = currentPriceRange as [number, number];
         if (range[0] !== parentRange[0] || range[1] !== parentRange[1]) {
           setRange(parentRange);
         }
    }
  }, [currentPriceRange]);

  const handleSubmit = () => {
      handleSelectedPrice(range);
  };

  const handleSliderChange = (value: number | number[]) => {
      if (Array.isArray(value) && value.length === 2) {
          setRange(value as [number, number]);
      }
  };

  return (
    <div className="filter-by-price-container">
      <h3>Filter By Price (ETH)</h3>
      <div style={{ width: 250, margin: "2rem auto" }}>
        <Slider
          range
          min={0}
          max={1}
          step={0.00001}
          value={range}
          onChange={handleSliderChange}
          allowCross={false}
          //  trackStyle={[{ backgroundColor: '#007bff' }]} // Example Style
          //  handleStyle={[{ borderColor: '#007bff', borderWidth: 2 }, { borderColor: '#007bff', borderWidth: 2 }]} // Example Style
          //  railStyle={{ backgroundColor: '#dee2e6' }} // Example Style
        />
        <div className="slider-selected-price">
          <span>{range[0].toFixed(5)} ETH</span>
          <span>{range[1].toFixed(5)} ETH</span>
        </div>
      </div>
      <Button name="Apply Price" handleClick={handleSubmit} />
    </div>
  );
}

export default FilterByPrice;