import "./DestinationPage.css";
import PageBanner from "../Shared/PageBanner";
import SearchArea from "../Shared/SearchArea";
import { ProjectImages } from "../../assets/ProjectImages";
import DestinationCard from "./Shared/DestinationCard";

function DestinationPage() {
  const destinationData = {
    section1: {
      firstGrouped: ["United Kingdom", "Canada", "Switzerland"],
      secondGrouped: ["Thailand", "Australia"],
      single: "France"
    },
    section2: {
      firstGrouped: ["Italy", "Norway", "Egypt"],
      secondGrouped: ["Japan", "India"],
      single: "New Zealand"
    }
  };

  const searchAreaData = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <PageBanner
        headingText="Destination"
        normalText="Home /"
        coloredText="Destination"
        bannerImage={ProjectImages.DESTINATION_BANNER}
      />
      <SearchArea searchAreaData={searchAreaData} />

      <div className="destination-grid-wrapper">
        <div className="destination-grid-container">
          {/* First Grid Section - Single card on right */}
          <div className="grid-section">
            <div className="grouped-destinations-grid">
              <div className="first-grouped-destinations">
                {destinationData.section1.firstGrouped.map((countryName) => (
                  <DestinationCard
                    key={countryName}
                    countryName={countryName}
                    countryImage={ProjectImages.TOURPAGE_BANNER}
                  />
                ))}
              </div>

              <div className="second-grouped-destinations">
                {destinationData.section1.secondGrouped.map((countryName) => (
                  <DestinationCard
                    key={countryName}
                    countryName={countryName}
                    countryImage={ProjectImages.TOURPAGE_BANNER}
                  />
                ))}
              </div>
            </div>

            <div className="single-destinations-grid">
              <DestinationCard
                countryName={destinationData.section1.single}
                countryImage={ProjectImages.TOURPAGE_BANNER}
              />
            </div>
          </div>

          {/* Second Grid Section - Single card on left */}
          <div className="grid-section reversed">
            <div className="single-destinations-grid">
              <DestinationCard
                countryName={destinationData.section2.single}
                countryImage={ProjectImages.TOURPAGE_BANNER}
              />
            </div>

            <div className="grouped-destinations-grid">
              <div className="first-grouped-destinations">
                {destinationData.section2.firstGrouped.map((countryName) => (
                  <DestinationCard
                    key={countryName}
                    countryName={countryName}
                    countryImage={ProjectImages.TOURPAGE_BANNER}
                  />
                ))}
              </div>

              <div className="second-grouped-destinations">
                {destinationData.section2.secondGrouped.map((countryName) => (
                  <DestinationCard
                    key={countryName}
                    countryName={countryName}
                    countryImage={ProjectImages.TOURPAGE_BANNER}
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
