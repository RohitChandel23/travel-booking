import "./FilterByPrice.css";
import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Button from "../../../../Components/Buttons/Button";

interface priceFilterProps {
  handleSelectedPrice: (value: [number, number]) => void;
}

function FilterByPrice({ handleSelectedPrice }: priceFilterProps) {
  const [range, setRange] = useState<[number, number]>([0, 6000]);

  return (
    <div className="filter-by-price-container">
      <h3>Filter By</h3>
      <div style={{ width: 250, margin: "2rem auto" }}>
        <Slider
          range
          min={0}
          max={6000}
          value={range}
          onChange={(value: number | number[]) => {
            if (Array.isArray(value)) setRange(value as [number, number]);
          }}
          allowCross={false}
        />
        <div className="slider-selected-price">
          <span>{range[0]}$</span>
          <span>{range[1]}$</span>
        </div>
      </div>
      <Button name="Submit" handleClick={() => handleSelectedPrice(range)} />
    </div>
  );
}

export default FilterByPrice;
