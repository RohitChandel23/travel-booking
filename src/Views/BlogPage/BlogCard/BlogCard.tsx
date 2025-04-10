import "./BlogCard.css";
import { ProjectImages } from "../../../assets/ProjectImages";

function BlogCard() {
  return (
    <div className="blog-card-wrapper">
      <div className="blog-image-container">
        <img
          src={ProjectImages.DESTINATION_BANNER}
          className="blog-card-image"
        />
      </div>

      <div className="blog-date-part"><p>Sep 26, 2025 • Admin</p></div>

      <h4>The Impact of Covid-19 on travel & tourisom industry</h4>
      <p className="project-normal-font">
        Istanbul, the vibrant and historic city straddling the continents of
        Europe and Asia, offers an enchanting blend of cultures, sights, and
        experiences that captivate...
      </p>

      <span className="read-more">Read More <span><i className="fa-solid fa-long-arrow-right"/></span></span>
    </div>
  );
}
export default BlogCard;
