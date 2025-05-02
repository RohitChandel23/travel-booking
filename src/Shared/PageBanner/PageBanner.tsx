import "./PageBaner.css";
import { Link } from "react-router-dom";
import { ROUTES_CONFIG } from "../Constants";

interface PageBannerProps {
  normalText: string;
  coloredText: string | undefined;
  middleText?: string;
  headingText: string;
  bannerImage: string;
}

function PageBanner({
  normalText,
  coloredText,
  headingText,
  bannerImage,
  middleText,
}: PageBannerProps) {
  return (
    <>
      <div className="page-banner-container">
        <img src={bannerImage} alt="page-banner" />
        <div className="pageBanner-text-content">
          <h1 className="project-heading-font">{headingText}</h1>

          {/* <p>{normalText}{" "}<span className='project-theme-color project-normal-font'>{coloredText}</span></p> */}

          <p>
            <Link to={ROUTES_CONFIG.HOMEPAGE.path} className="page-banner-text">
              <span className="page-banner-normal">{normalText}</span>{" "}
            </Link>

            {/* {middleText ? <><Link to={`/${middleText.toLowerCase()}`} className="page-banner-text">
              <span className="page-banner-normal">{middleText}</span>{" "}
            </Link>

            <span className="page-banner-text-color">
              <Link to={`/${middleText}/${coloredText}`} className="link-class">
                <span className="page-banner-color">{coloredText}</span>
              </Link>
            </span></>
:
            <span className="page-banner-text-color">
              <Link to={`/${middleText}/${coloredText}`} className="link-class">
                <span className="page-banner-color">{coloredText}</span>
              </Link>
            </span>} */}

            {middleText ? (
              <>
                <Link
                  to={`/${middleText.toLowerCase()}`}
                  className="page-banner-text"
                >
                  <span className="page-banner-normal">{middleText}</span>{" "}
                </Link>

                <span className="page-banner-text-color">
                  <Link
                    to={`/${middleText.toLowerCase()}/${coloredText}`}
                    className="link-class"
                  >
                    <span className="page-banner-color">{coloredText}</span>
                  </Link>
                </span>
              </>
            ) : (
              <span className="page-banner-text-color">
                <Link to={`/${coloredText}`} className="link-class">
                  <span className="page-banner-color">{coloredText}</span>
                </Link>
              </span>
            )}
          </p>
        </div>
      </div>
    </>
  );
}
export default PageBanner;
