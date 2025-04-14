  import { ProjectImages } from "../../assets/ProjectImages";
  import "./Contact.css";
  import PageBanner from "../Shared/PageBanner";
  import ContactElement from "./Shared/ContactElements";
  import MapComponent from "../Shared/MapComponent";
  import AddingComment from "../../Components/customComponent/AddingComment/AddingComment";
  import ConnectWalletButton from "../ConnectWalletButton";

  function ContactPage() {
    return (
      <>
        <PageBanner
          normalText="Home / "
          coloredText="Contact"
          headingText="Contact Us"
          bannerImage={ProjectImages.DESTINATION_BANNER}
        />

        <div>
            <ConnectWalletButton />
        </div>

        <div className="contact-page-wrapper">
          <div className="contact-page-container">
            <div className="contact-info-tabs">
              <ContactElement
                contactIcon="fa-solid fa-location-dot"
                contactType="Location"
                contactInfo="20,Love Street, Muscat, Oman"
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
                  <AddingComment/>

                </div>
              </div>

              <div className="map__wrapper">
                <MapComponent cityName="India" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  export default ContactPage;
