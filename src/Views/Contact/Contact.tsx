import { ProjectImages } from "../../assets/ProjectImages";
import './Contact.css';
import PageBanner from "../Shared/PageBanner";
import ContactElement from "./Shared/ContactElements";

function ContactPage() {
  return (
    <>
      <PageBanner normalText="Home / " coloredText="Contact" headingText="Contact Us" bannerImage={ProjectImages.DESTINATION_BANNER}/>

      <div className="contact-page-wrapper">
        <div className="contact-page-container">
          <div className="contact-info-tabs">
          <ContactElement/>
          <ContactElement/>
          <ContactElement/>
          </div>

        </div>

      </div>
    </>
  );
}

export default ContactPage;
