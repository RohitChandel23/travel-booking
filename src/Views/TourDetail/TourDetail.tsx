import { Link, useParams } from 'react-router-dom';
import './TourDetail.css';
import { useGetTourDetailQuery } from '../../Services/Api/module/demoApi';
import MapComponent from '../Shared/MapComponent';
import { ROUTES_CONFIG } from '../../Shared/Constants';
import TourBookingDetail from './TourBookingDetail';
import TourReview from './TourBookingDetail/Shared/TourReview';
import CalendarComponent from './TourBookingDetail/Shared/CalendarComponent/index';
import IncludeExclude from './TourBookingDetail/Shared/IncludeExclude';




function TourDetail() {

  const { slugId } = useParams();
  const slugValue = slugId;
  const { data } = useGetTourDetailQuery(slugValue);
  const tourData = data?.data;
  const tourName = tourData?.name;
  const tourCity: string = tourData?.ufiDetails?.bCityName;
  const tourCountry = tourData?.ufiDetails?.url?.country;
  const tourRating = tourData?.reviewsStats?.combinedNumericStats?.average;
  const tourReviewCount = tourData?.reviewsStats?.combinedNumericStats?.total;
  const tourPrice = tourData?.representativePrice?.chargeAmount;
  const tourDescription = tourData?.description;
  const tourAllImages = tourData?.photos;
  const tourImageItem = tourAllImages?.find((item: any) => item?.isPrimary);
  const tourImage = tourImageItem?.medium || tourImageItem?.small;
  const tourId = tourData?.id;
  const includedItems = tourData?.whatsIncluded;
  const includedClassName = "fa-solid fa-check";
  const excludedItems = tourData?.notIncluded;
  const excludedClassName = "fa-solid fa-xmark";

  const includedItemsObj = {
    includedItems,
    includedClassName
  }

  const excludedItemsObj = {
    excludedItems,
    excludedClassName
  }

  const includedExcludedObj = {
    includedItemsObj,
    excludedItemsObj
  }


  return (
    <>
      <section className="tour-detail-section">
        <div className="tour-detail-container">
          <div className="tour-detail-image-container">
            <img className="tour-image" src={tourImage} />
          </div>

          <div className="tour-detail-video-gallery-div">
            <button className="video-gallery-btn">
              Video <i className="fa-solid fa-video" />
            </button>
            <button className="video-gallery-btn">
              Gallery <i className="fa-regular fa-image" />
            </button>
          </div>

          <div className="tour-detail-location-share">
            <div className="tour-detail-location">
              <p className='project-normal-font'>
                {' '}
                <i className="fa-solid fa-location-dot" /> {tourCity},{' '}
                {tourCountry} {'  '}
                <Link
                  to={ROUTES_CONFIG.LOGIN.path} // {/* -----------put google map link here -----------------  */}
                  className="link-class project-theme-color"
                >
                  view on map
                </Link>{' '}
              </p>
            </div>
            <div className="tour-detail-share">
              <i className="fa-solid fa-share-nodes" />
              <i className="fa-regular fa-heart" />
            </div>
          </div>
          <h3 className='tour-title-name project-heading-font'>{tourName}</h3>

          <div className="tour-features-container">
            <div className="tour-feature">
              <span className="tour-feature-heading">From</span>
              <span className="tour-feature-value project-theme-color project-normal-font">
                ${tourPrice}
              </span>
            </div>

            <div className="tour-feature">
              <span className="tour-feature-heading">Duration</span>
              <span className="tour-feature-value project-normal-font">1 day</span>
            </div>

            <div className="tour-feature">
              <span className="tour-feature-heading">Max People</span>
              <span className="tour-feature-value project-normal-font">10</span>
            </div>

            <div className="tour-feature">
              <span className="tour-feature-heading">Min Age</span>
              <span className="tour-feature-value project-normal-font">5</span>
            </div>

            <div className="tour-feature">
              <span className="tour-feature-heading">Tour Type</span>
              <span className="tour-feature-value project-normal-font">Adventure</span>
            </div>

            <div className="tour-feature">
              <span className="tour-feature-heading">Reviews</span>
              <span className="tour-feature-value project-normal-font">
                <i className="fa-solid fa-star project-theme-color" />{' '}
                {tourRating} <span className='project-normal-font'>({tourReviewCount} reviews) </span>
              </span>
            </div>
          </div>

          <div className="tour-detail-overview">
            <h5 className="detail-page-minor-title">Overview</h5>
            <p className='project-normal-font'> {tourDescription} </p>
          </div>

          <div className='include-exclude-container'>
              <h5 className="detail-page-minor-title">Included / Exclude</h5>
              <IncludeExclude itemsObj = {includedExcludedObj} />
          </div>

          <div className='calendar-section'>
           <h5 className="detail-page-minor-title">Calendar & Prices</h5> 
          <CalendarComponent tourPrice={tourPrice}/>
          </div>

          <div className="tour-location-map">
            <MapComponent cityName={tourCity} />
          </div>

          <div className='tour-detail-review'>
          <h5 className='project-heading-font'>Average Reviews</h5>
          <TourReview tourRating = {tourRating} tourId = {tourId}/>
          </div>
            
        </div>

        <div className="tour-booking-detail">
          <TourBookingDetail tourPrice={tourPrice} />
        </div>
      </section>

      {/* <div className="tour-detail-featured-tours">
         some tours will be featured here
        <FeaturedTours />
      </div> */}

    </>
  );
}

export default TourDetail;
