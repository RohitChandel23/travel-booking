import { useGetAttractionQuery } from '../../Services/Api/module/demoApi';
import { ProjectImages } from '../../assets/ProjectImages';
import HomepageDestination from '../HomepageDestination/HomepageDestination';
import TourCard from '../TourCard/TourCard';
import WhyUsComponent from '../WhyUsComponent/index';
import './Dashboard.css';

export default function Dashboard() {
  // manages the id of the cities as per your requirements
  const { data } = useGetAttractionQuery(
    'eyJwaW5uZWRQcm9kdWN0IjoiUFJpSEhIVjB1TGJPIiwidWZpIjoyMDA4ODMyNX0=' // use variables here
  );

  const attractions = data?.data?.products?.slice(10, 14) || [];

  return (
    <div>
      <div className="homepage-banner">
        <img src={ProjectImages.HomePageBanner} />
        <div className="banner-text-container">
          <div className="banner-text-content">
            <h3 className="kaushan-text">Save 15% off in Worldwide</h3>
            <h1>Travel & Adventures</h1>
            <p>Find awesome hotel, tour, car and activities in London</p>
          </div>
        </div>
      </div>

      <div className="search-container">
        <div className="search-container-elements">search elements</div>
      </div>

      <div className="tour-container">
        <div className="section-headers">
          <h4 className="kaushan-text cursive-normal">Tours</h4>
          <h2 className="section-heading">Most Popular Tours</h2>
        </div>
        <div className="tour-content-container">
          <div className="tour-content">
            {attractions.map((item: any) => {
              const countryName =
                (item?.ufiDetails?.url?.country).toUpperCase();
              const cityName = item?.ufiDetails?.bCityName;
              const tourName = item?.name;
              const tourImage = item?.primaryPhoto?.small;
              const tourRating =
                item?.reviewsStats?.combinedNumericStats?.average;
              const tourReview = item?.reviewsStats?.allReviewsCount;
              const tourPrice = Math.floor(
                item?.representativePrice?.chargeAmount
              );
              const slugValue = item?.slug;

              return (
                <TourCard
                  cityName={cityName}
                  countryName={countryName}
                  tourName={tourName}
                  tourImage={tourImage}
                  tourRating={tourRating}
                  tourReview={tourReview}
                  tourPrice={tourPrice}
                  tourDuration="2 days"
                  slugValue={slugValue}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* destination section  */}
      <HomepageDestination />

      {/* why us section */}
      <WhyUsComponent />
    </div>
  );
}
