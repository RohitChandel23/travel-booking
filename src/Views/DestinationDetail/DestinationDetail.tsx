import PageBanner from "../../Shared/PageBanner";
import { useParams } from "react-router-dom";
import { ProjectImages } from "../../assets/ProjectImages";
import "./DestinationDetail.css";
import MapComponent from "../../Shared/MapComponent";
import TourSlider from "../../Shared/TourSlider";
import { useEffect, useState } from "react";

type PexelsPhoto = {
  src: {
    large2x: string;
  };
};

type Country = {
  capital: string[];
  languages: { [key: string]: string };
  currencies: { [key: string]: { name: string } };
  area: number;
  population: number;
  timezones: string[];
};

function DestinationDetail() {
  const { countryName } = useParams();
  const PEXELS_API_KEY = "Gev3EvtXpErr8iA59qj7W9YSuAqSlpUduaRBB2f5fWaULYSB2k9d09Yn";

  const [images, setImages] = useState<PexelsPhoto[]>([]);
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [timezone, setTimezone] = useState<string[]>([]);
  const [countryDescription, setCountryDescription] = useState<string>();
  const [countryInfo, setCountryInfo] = useState<Country[]>([]);
  const [languages, setLanguages] = useState<string[] | null>([]);
  const [capitals, setCapitals] = useState<string[]>();

  const monthNames = ["Jan - Feb", "Mar - Apr", "May - June", "July - Aug", "Sep - Oct", "Nov - Dec"];

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${countryName}&per_page=5`,
          {
            headers: {
              Authorization: PEXELS_API_KEY,
            },
          }
        );
        const data = await response.json();
        setImages(data.photos || []);
      } catch (error) {
        console.error("Failed to fetch images:", error);
      }
    };

    const fetchInformation = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data: Country[] = await response.json();
        setCountryInfo(data);
        setTimezone(data[0].timezones || []);
        setLanguages(data[0].languages ? Object.values(data[0].languages) : []);
        setCapitals(data[0].capital || []);
      } catch (error) {
        console.error("Failed to fetch country information: ", error);
      }
    };

    const fetchDescription = async () => {
      try {
        const response = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${countryName}`
        );
        const data = await response.json();
        setCountryDescription(data.extract);
      } catch (error) {
        console.error("Failed to fetch country description: ", error);
      }
    };

    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${countryName}`
        );
        const result = await response.json();
        const { lat, lon } = result[0];

        const weatherData = await fetch(
          `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=2020-01-01&end_date=2020-12-31&monthly=temperature_2m_mean&timezone=auto`
        );

        console.log("Weather data:", await weatherData.json());
      } catch (error) {
        console.error("Failed to fetch coordinates/weather:", error);
      }
    };

    fetchCoordinates();
    fetchDescription();
    fetchInformation();
    fetchImages();
  }, [countryName]);

  return (
    <>
      <PageBanner
        headingText="Destination Details"
        normalText="Home / "
        middleText="Destination/"
        coloredText={countryName?.toUpperCase()}
        bannerImage={ProjectImages.DESTINATION_BANNER}
      />

      <div className="destination-detail-wrapper">
        <div className="destination-detail-container">
          <div className="destinaton-main-image">
            <img src={images[imageIndex]?.src?.large2x} alt ={images[imageIndex]?.src?.large2x} />
          </div>

          <div className="destination-other-images">
            {[...Array(5)].map((_, idx) => (

<button key={images[idx]?.src?.large2x} onClick={() => setImageIndex(idx)} className="minor-images-container btn-as-container">
<img src={images[idx]?.src?.large2x} alt={countryName} className="minor-image" />
</button>
            ))}
          </div>

          <div className="destination-description-container">
            <h4>About {countryName?.toUpperCase()}</h4>
            <p className="project-normal-font">{countryDescription}</p>
          </div>

          <div className="destination-basic-info-wrapper">
            <h4>Basic Information</h4>
            <div className="destination-baisc-info-container">
              <ul>
                <li>
                  <p>Country</p>
                  <span>{countryName?.toUpperCase()}</span>
                </li>

                <li>
                  <p>Capital</p>
                  {capitals?.map((item, i) => (
                    <span key={i}>
                      {item}
                      {i === capitals.length - 1 ? "" : ", "}
                    </span>
                  ))}
                </li>

                <li>
                  <p>Language</p>
                  {languages?.map((item, i) => (
                    <span key={i}>
                      {item}
                      {i === languages.length - 1 ? "" : ", "}
                    </span>
                  ))}
                </li>

                <li>
                  <p>Currency</p>
                  <span>
                    {countryInfo[0]?.currencies &&
                      Object.values(countryInfo[0].currencies)[0]?.name}
                  </span>
                </li>

                <li>
                  <p>Area</p>
                  <span>{countryInfo[0]?.area} km²</span>
                </li>

                <li>
                  <p>Population</p>
                  <span>{countryInfo[0]?.population}</span>
                </li>

                <li>
                  <p>Timezone</p>
                  {timezone?.slice(0, 4).map((item, i) => (
                    <span key={i}>
                      {item}
                      {i === timezone.length - 1 ? "" : ", "}
                    </span>
                  ))}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="weather-map-container">
          <MapComponent cityName={countryName} mapHeadingText="City Map" zoomLevel={4}/>

          <div className="weather-wrapper">
            <div className="weather-container">
              <h6>Weather</h6>

              <div className="destination-baisc-info-container weather-report">
                <ul>
                  {monthNames.map((item, i) => (
                    <li key={i}>
                      <p>{item}</p>
                      <span>22°C - 32°C</span>
                      <div className="create-line"></div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

 <div className="destination-tour-slider-wrapper">
        <div className="destination-tour-slider">
        <h2>Popular Tours</h2>
            <TourSlider/>
        </div>
          </div> 
    </>
  );
}

export default DestinationDetail;
