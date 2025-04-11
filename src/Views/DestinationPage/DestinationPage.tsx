import PageBanner from "../Shared/PageBanner";
import DestinationCard from "./Shared/DestinationCard";
import "./DestinationPage.css";
import { ProjectImages } from "../../assets/ProjectImages";
import SearchArea from "../Shared/SearchArea";

function DestinationPage() {
  const destinationData = {
    firstGrouped: ["United Kingdom", "Canada", "Switzerland"],
    secondGrouped: ["Thailand", "Australia"],
    singleDestination: "France",
  };

  return (
    <>
      <PageBanner
        headingText="Destination"
        normalText="Home /"
        coloredText="Destination"
        bannerImage={ProjectImages.DESTINATION_BANNER}
      />

      <SearchArea />

      <div className="destination-grid-wrapper">
        <div className="destination-grid-container">


          <div className="grouped-destinations-grid">
            <div className="first-grouped-destinations">
              {destinationData.firstGrouped.map((countryName) => (
                <DestinationCard
                  countryName={countryName}
                  countryImage={ProjectImages.TOURPAGE_BANNER}
                />
              ))}
            </div>

            <div className="second-grouped-destinations">
              {destinationData.secondGrouped.map((countryName) => (
                <DestinationCard
                  countryName={countryName}
                  countryImage={ProjectImages.TOURPAGE_BANNER}
                />
              ))}
            </div>
          </div>
          

          <div className="single-destinations-grid">
            <DestinationCard
              countryName={destinationData.singleDestination}
              countryImage={ProjectImages.TOURPAGE_BANNER}
            />{" "}
            {/* country-name, country-image*/}
          </div>


        </div>
      </div>
    </>
  );
}
export default DestinationPage;
