import "./AboutPage.css";
import Testimonial from "../../Shared/Testimonial";
import WhyUsComponent from "../WhyUsComponent";
import TeamCard from "./Shared/TeamCard";
import { ProjectImages } from "../../assets/ProjectImages";
import FeatureBox from "./Shared/FeatureBox/FeatureBox";
import { useEffect } from "react";

function AboutPage() {
  const numberData = [
    {quantity: 120, quantityElement:"Total Destination"},
    {quantity: 500, quantityElement:"Travel Packages"},
    {quantity: "10K", quantityElement:"Total Travelers"},
    {quantity: "7K", quantityElement:"Positive Reviews"},
  ]

  useEffect(() => {
      window.scrollTo(0, 0);
    });
  return (
    <>  
      <WhyUsComponent />

      <div className="our-numbers-wrapper">
        <div className="our-numbers-container">
          {numberData.map((item)=>
            <div className="number-data">
            <h1>{item.quantity}+</h1>
            <p>{item.quantityElement}</p>
                        </div>                        
          )}

        </div>
      </div>
      
      <div className="about-feature-wrapper">
        <h4 className='cursive-text'>Features</h4>
          <h2>Why Choose Us</h2>
        <div className="about-feature-container">
          <FeatureBox
            image={ProjectImages.QUALITY_PACKAGES}
            title="High Quality Travel Packages"
            textContent="Credibly target visionary portals rather than prospective human capital."
          />
          <FeatureBox
            image={ProjectImages.BEST_TRAVEL_PLAN}
            title="Best Travel Plan"
            textContent="Credibly target visionary portals rather than prospective human capital."
          />
          <FeatureBox
            image={ProjectImages.QUICK_BOOKING}
            title="Easy & Quick Booking"
            textContent="Credibly target visionary portals rather than prospective human capital."
          />
          
          <FeatureBox
            image={ProjectImages.HAND_PICKED_TOUR}
            title="Hand-picked Tour"
            textContent="Credibly target visionary portals rather than prospective human capital."
          />
          <FeatureBox
            image={ProjectImages.PRIVATE_GUIDE}
            title="Private Guide"
            textContent="Credibly target visionary portals rather than prospective human capital."
          />
          <FeatureBox
            image={ProjectImages.CUSTOMER_CARE}
            title="Customer Care 24/7"
            textContent="Credibly target visionary portals rather than prospective human capital."
          />
        </div>
      </div>

      <div className="team-member-wrapper">
      <h4 className='cursive-text'>Team</h4>
          <h2>Our Amazing Team</h2>
        <div className="team-member-container">
          
          <TeamCard 
            profileImage={ProjectImages.TEAM_MEMBER} 
            name="Antoni Shkraba" 
            role="Founder & Director"
          />
          <TeamCard 
            profileImage={ProjectImages.TEAM_MEMBER} 
            name="Andrew Davie" 
            role="Chief Operating Officer"
          />
          <TeamCard 
            profileImage={ProjectImages.TEAM_MEMBER} 
            name="Orlando Diggs" 
            role="Director - Hotels"
          />
          <TeamCard 
            profileImage={ProjectImages.TEAM_MEMBER} 
            name="Philip Martin" 
            role="Chief Executive"
          />
          <TeamCard 
            profileImage={ProjectImages.TEAM_MEMBER} 
            name="Tamara Bellis" 
            role="Customer Support"
          />
        </div>
      </div>
      <Testimonial />
    </>
  );
}
export default AboutPage;
