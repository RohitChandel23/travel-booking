import { ProjectImages } from "../../../../assets/ProjectImages";
import "./AuthBannerImg.css";
function AuthBannerImg() {
  return (
    <>
      <div className="auth-page-banner">
        <img src={ProjectImages.AUTH_BANNER} className="auth-banner-image" alt="auth-banner-image"/>

        <div className="auth-page-banner-text-container">
          <h1>Authentication</h1>
          <p>Home * <span className="project-theme-color">Authentication </span></p>
      </div>
      </div>

     
    </>
  );
}
export default AuthBannerImg;
