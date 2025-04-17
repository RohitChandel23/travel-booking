import "./AboutPage.css";
import Testimonial from "../../Shared/Testimonial";
import WhyUsComponent from "../WhyUsComponent";
import TeamCard from "./Shared/TeamCard";
import { ProjectImages } from "../../assets/ProjectImages";
import FeatureBox from "./Shared/FeatureBox/FeatureBox";

function AboutPage() {
  return (
    <>  
      <WhyUsComponent />

      <div className="about-feature-wrapper">
        <div className="about-feature-container">
          <FeatureBox
            image={ProjectImages.QUALITY_PACKAGES}
            title="High Quality Travel Packages"
            textContent="Credibly target visionary portals rather than prospective human capital."
          />
          <FeatureBox
            image={ProjectImages.QUALITY_PACKAGES}
            title="High Quality Travel Packages"
            textContent="Credibly target visionary portals rather than prospective human capital."
          />
          <FeatureBox
            image={ProjectImages.QUALITY_PACKAGES}
            title="High Quality Travel Packages"
            textContent="Credibly target visionary portals rather than prospective human capital."
          />
          <FeatureBox
            image={ProjectImages.QUALITY_PACKAGES}
            title="High Quality Travel Packages"
            textContent="Credibly target visionary portals rather than prospective human capital."
          />
        </div>
      </div>

      <div className="team-member-wrapper">
        <div className="team-member-container">
          <TeamCard />
          <TeamCard />
          <TeamCard />
          <TeamCard />
        </div>
      </div>
      <Testimonial />
    </>
  );
}
export default AboutPage;
