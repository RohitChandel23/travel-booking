import PageBanner from "../Shared/PageBanner";
import { useParams } from "react-router-dom";
import { ProjectImages } from "../../assets/ProjectImages";
import "./DestinationDetail.css";
import MapComponent from "../Shared/MapComponent";
import { useEffect, useState } from "react";

function DestinationDetail() {
  const { countryName } = useParams();
  const PEXELS_API_KEY =
    "Gev3EvtXpErr8iA59qj7W9YSuAqSlpUduaRBB2f5fWaULYSB2k9d09Yn";
  const [images, setImages] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [timezone, setTimezone] = useState();
  const [countryDescription, setCountryDescription] = useState<
    string | undefined
  >();
  const [countryInfo, setCountryInfo] = useState<any>({});
  const [languages, setLanguages] = useState<string | string[] | null>();
  const [capitals, setCapitals] = useState<string | string[] | undefined>();
  
  const monthNames = ["Jan - Feb", "Mar - Apr", "May - June", "July - Aug", "Sep - Oct", "Nov - Dec"];

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${countryName}&per_page=4`,
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
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${countryName}`
        );
        const data = await response.json();
        setCountryInfo(data);
        setTimezone(data[0].timezones);
        setLanguages(Object.values(data[0].languages));
        setCapitals(data[0].capital);
      } catch (error) {
        console.error("Failed to country information: ", error);
      }
    };

    const fetchDescription = async () => {
      try {
        const response = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${countryName}`
        );
        const data = await response.json();
        // console.log("countries description", data.extract);
        setCountryDescription(data.extract);
      } catch (error) {
        console.error("Failed to country description: ", error);
      }
    };

    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${countryName}`       // ------------have to use rtk here-----------
        );
        const result = await response.json();
        const { lat, lon } = result[0];

        const weatherData = await fetch(`https://archive-api.open-meteo.com/v1/archive?${lat}=48.8566&${lon}=2.3522&start_date=2020-01-01&end_date=2020-12-31&monthly=temperature_2m_mean&timezone=auto
`);

        console.log("data are", weatherData);
        } catch (error) {
        console.log(error);
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
        normalText="Home / Destination / "
        coloredText={countryName?.toUpperCase()}
        bannerImage={ProjectImages.DESTINATION_BANNER}
      />

      <div className="destination-detail-wrapper">
        <div className="destination-detail-container">
          <div className="destinaton-main-image">
            <img src={images[imageIndex]?.src?.large2x} />
          </div>

          <div className="destination-other-images">
            {[...Array(4)].map((_, idx) => {
              return (
                <span
                  onClick={() => setImageIndex(idx)}
                  className="minor-images-container"
                >
                  <img
                    src={images[idx]?.src?.large2x}
                    className="minor-image"
                  />
                </span>
              );
            })}
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
                  {capitals?.map((item: String, i: number) => {
                    return (
                      <span>
                        {item}
                        {i == capitals.length - 1 ? "" : ","}
                      </span>
                    );
                  })}
                </li>

                <li>
                  <p>Language</p>
                  {languages?.map((item: string, i: number) => {
                    return (
                      <span>
                        {item}
                        {i == languages.length - 1 ? "" : ","}
                      </span>
                    );
                  })}
                </li>

                <li>
                  <p>Currency</p>
                  <span>
                    {countryInfo[0]?.currencies &&
                      Object.values(countryInfo[0].currencies)[0]?.name}
                  </span>{" "}
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

                  {timezone?.map((item: string, i: number) => {
                    if (i > 3) return;
                    return (
                      <span>
                        {item}
                        {i == 3 || timezone.length == 1 ? "" : ","}
                      </span>
                    );
                  })}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="weather-map-container">
          <MapComponent cityName={countryName} mapHeadingText="City Map" />

          <div className="weather-wrapper">
            <div className="weather-container">
              <h6>Weather</h6>

              <div className="destination-baisc-info-container weather-report">
              <ul>
                {
                  monthNames.map((item)=>{
                    return <li>
                    <p>{item}</p>
                    <span>22°C - 32°C</span>
                    <div className="create-line"></div>
                  </li>
                  })
                }

                

        
                </ul>
                </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default DestinationDetail;
