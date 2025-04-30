import "./DestinationPage.css";
import PageBanner from "../../Shared/PageBanner";
import SearchArea from "../../Shared/SearchArea";
import DestinationCard from "./Shared/DestinationCard";
import { ProjectImages } from "../../assets/ProjectImages";

type DestinationDataType = {
  section1: {
    firstGrouped: string[];
    secondGrouped: string[];
    single: string;
  };
  section2: {
    firstGrouped: string[];
    secondGrouped: string[];
    single: string;
  };
};

type CountryImageMapType = {
  [key: string]: string;
};

function DestinationPage() {
  const destinationData: DestinationDataType = {
    section1: {
      firstGrouped: ["United Kingdom", "Canada", "Switzerland"],
      secondGrouped: ["Norway", "Japan"],
      single: "France",
    },
    section2: {
      firstGrouped: ["Italy", "Thailand", "Egypt"],
      secondGrouped: ["Australia", "India"],
      single: "New Zealand",
    },
  };

  const countryImageMap: CountryImageMapType = {
    "United Kingdom": ProjectImages.UNITED_KINGDOM,
    Canada: ProjectImages.CANADA,
    Switzerland: ProjectImages.SWITZERLAND,
    Thailand: ProjectImages.THAILAND,
    Australia: ProjectImages.AUSTRALIA,
    France: ProjectImages.FRANCE,
    Italy: ProjectImages.ITALY,
    Norway: ProjectImages.NORWAY,
    Egypt: ProjectImages.EGYPT,
    Japan: ProjectImages.JAPAN,
    India: ProjectImages.INDIA,
    "New Zealand": ProjectImages.NEWZEALAND,
  };

  return (
    <>
      <PageBanner
        headingText="Destination"
        normalText="Home /"
        coloredText="Destination"
        bannerImage={ProjectImages.DESTINATION_BANNER}
      />

      <SearchArea searchAreaData={() => {}} />

      <div className="destination-grid-wrapper">
        <div className="destination-grid-container">
          <div className="grid-section">
            <div className="grouped-destinations-grid">
              <div className="first-grouped-destinations">
                {destinationData.section1.firstGrouped.map((countryName) => (
                  <DestinationCard
                    key={countryName}
                    countryName={countryName}
                    countryImage={countryImageMap[countryName]}
                  />
                ))}
              </div>

              <div className="second-grouped-destinations">
                {destinationData.section1.secondGrouped.map((countryName) => (
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
                countryName={destinationData.section1.single}
                countryImage={countryImageMap[destinationData.section1.single]}
              />
            </div>
          </div>

          <div className="grid-section reversed">
            <div className="single-destinations-grid">
              <DestinationCard
                countryName={destinationData.section2.single}
                countryImage={countryImageMap[destinationData.section2.single]}
              />
            </div>

            <div className="grouped-destinations-grid">
              <div className="first-grouped-destinations">
                {destinationData.section2.firstGrouped.map((countryName) => (
                  <DestinationCard
                    key={countryName}
                    countryName={countryName}
                    countryImage={countryImageMap[countryName]}
                  />
                ))}
              </div>

              <div className="second-grouped-destinations">
                {destinationData.section2.secondGrouped.map((countryName) => (
                  <DestinationCard
                    key={countryName}
                    countryName={countryName}
                    countryImage={countryImageMap[countryName]}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DestinationPage;
