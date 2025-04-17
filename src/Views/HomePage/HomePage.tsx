import { ProjectImages } from "../../assets/ProjectImages";
import HomepageDestination from "./Shared/HomepageDestination/HomepageDestination";
import WhyUsComponent from "../WhyUsComponent/index";
import SearchArea from "../../Shared/SearchArea";
import Testimonial from "../../Shared/Testimonial";
import "./HomePage.css";
import TourSlider from "../../Shared/TourSlider";
import { useEffect } from "react";

export default function Dashboard() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="homepage-banner">
        <img src={ProjectImages.HomePageBanner} alt="home-page-banner" />
        <div className="banner-text-container">
          <div className="banner-text-content">
            <h3 className="kaushan-text">Save 15% off in Worldwide</h3>
            <h1 className="">Travel & Adventures</h1>
            <p className="project-normal-font">
              Find awesome hotel, tour, car and activities in London
            </p>
          </div>
        </div>
      </div>

      <SearchArea searchAreaData={() => {}} />

      <div className="tour-container">
        <div className="section-headers">
          <h4 className="kaushan-text cursive-normal">Tours</h4>
          <h2 className="section-heading">Most Popular Tours</h2>
        </div>
        <div className="tour-content-container">
          <div className="tour-content">
            <TourSlider />
          </div>
        </div>
      </div>

      <HomepageDestination />

      {/* why us section */}
      <WhyUsComponent />
      <div className="testimonial-section">
        <Testimonial />
      </div>
    </div>
  );
}
