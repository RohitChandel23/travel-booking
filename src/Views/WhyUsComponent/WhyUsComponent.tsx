import './whyUsComponent.css';
import ForHomePage from './ForHomePage/index';
import { ProjectImages } from '../../assets/ProjectImages';

function WhyUsComponent() {
  return (
    <div className="whyUs-section">
      <div className="main-div-container">
        <div className="whyUs-image-div">
          <div className="image-container">
            <img className="second-image" src={ProjectImages.WHY_US_IMGTWO} />{' '}
            <img className="first-image" src={ProjectImages.WHY_US_IMGONE} />
          </div>
        </div>

        <div className="whyUs-content-div">
          {/* for about apge */}
          <ForHomePage />
          {/* upto here */}
        </div>
      </div>
    </div>
  );
}
export default WhyUsComponent;
