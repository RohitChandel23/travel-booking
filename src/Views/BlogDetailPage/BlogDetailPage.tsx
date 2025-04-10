import "./BlogDetailPage.css";
import { ProjectImages } from "../../assets/ProjectImages";

function BlogDetailPage() {
  return (
    <div className="blog-detail-page-wrapper">
      <div className="blog-detail-page-container">
        <div className="blog-detail-image-container">
          <img
            src={ProjectImages.DESTINATION_BANNER}
            className="blog-detail-image"
          />
        </div>

        <div className="blog-detail-content-wrapper">
          <div className="blog-detail-date">
            <p>Sep 26, 2025 • Admin</p>
          </div>

          <h3 className="blog-detail-title">
            The Impact of Covid-19 on travel & tourisom industry
          </h3>
          <p className="blog__description project-normal-font">
            Laboratories used for scientific research take many forms because of
            the differing requirements of specialists in the various fields of
            science and engineering.
            <br />
            <br /> A physics laboratory Sed ut perspiciatis unde omnis iste
            natus error sit voluptatem accusantium doloremque laudantium,
            aperiam ipsquae ab illo inventore veritatis et quasi architecto
            beatae vitae dicta sunt explicabo. Nemo enim voluptatem voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit Sed ut perspiciatis unde omnis iste
            natus error sit voluptatem accusantium doloremque laudantium,
            aperiam ipsquae ab illo inventore veritatis et quasi architecto
            beatae vitae dicta sunt explicabo
          </p>
        </div>

        <div className="blog-details-tag-share-wrapper">
          <div className="blog-share-tag-container">
            <div className="blog-share-container">
              <span>Share: </span>
              <span className="social-share-icons">
                <i className="fa-brands fa-facebook-f" />
                <i className="fa-brands fa-x-twitter" />
                <i className="fa-brands fa-whatsapp" />
                <i className="fa-brands fa-linkedin-in" />
                <i className="fa-solid fa-link" />
              </span>
            </div>

            <div className="blog-detail-page-tags">
              <span>Destination</span>
              <span>Museums</span>
              <span>Sports</span>
            </div>
          </div>
          <div className="blog-tags"></div>
        </div>

        <div className="author-section">
          <div className="author-image-wrapper">
            <div className="author-image-container">
                <img src={ProjectImages.BLANK_PROFILE}/></div>
          </div>
          <div className="author-information-container">
            <h6>Simmons</h6>
            <span>Author</span>
            <p className="project-normal-font">
              Objectively productivate just in time information with dynamic
              channels. Energistically exploit seamless growth strategies after
              24/7 experiences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BlogDetailPage;
