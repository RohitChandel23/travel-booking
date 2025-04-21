import { ProjectImages } from "../../assets/ProjectImages";
import "./Contact.css";
import PageBanner from "../../Shared/PageBanner";
import ContactElement from "./Shared/ContactElements";
import MapComponent from "../../Shared/MapComponent";
import AddingComment from "../../Shared/AddingComment/AddingComment";
import { useEffect } from "react";

function ContactPage() {
  useEffect(() => {
      window.scrollTo(0, 0);
    });
  return (
    <>
      <PageBanner
        normalText="Home / "
        coloredText="Contact"
        headingText="Contact Us"
        bannerImage={ProjectImages.DESTINATION_BANNER}
      />

      <div className="contact-page-wrapper">
        <div className="contact-page-container">
          <div className="contact-info-tabs">
            <ContactElement
              contactIcon="fa-solid fa-location-dot"
              contactType="Location"
              contactInfo="Chandigarh, India"
            />
            <ContactElement
              contactIcon="fa fa-phone"
              contactType="Phone"
              contactInfo="987654321"
            />
            <ContactElement
              contactIcon="fa-regular fa-envelope"
              contactType="Email"
              contactInfo="support@trisog.com"
            />
          </div>

          <div className="question-map-section">
            <div className="question-wrapper">
              <h4 className="cursive-text">Have any question?</h4>
              <h2>Get in Touch</h2>

              <div className="asking-question-wrapper">
                <AddingComment />
              </div>
            </div>

            <div className="map__wrapper">
              <MapComponent cityName="Chandigarh" mapHeadingText="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactPage;
