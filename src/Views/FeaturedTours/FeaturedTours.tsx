import { useGetAttractionQuery } from '../../Services/Api/module/demoApi';
import TourCard from '../TourCard';

function FeaturedTours() {
  const { data } = useGetAttractionQuery(
    'eyJwaW5uZWRQcm9kdWN0IjoiUFJpSEhIVjB1TGJPIiwidWZpIjoyMDA4ODMyNX0=' // use variables here
  );
  const attractions = data?.data?.products?.slice(5, 9) || [];

  return (
    <div className="featured-tours-container">
      <div className="featured-tour-content">
        {/* country name, city name, tour name, ratings, reviews, price , duration  */}

        {attractions.map((item: any) => {
          const countryName = (item?.ufiDetails?.url?.country).toUpperCase();
          const cityName = item?.ufiDetails?.bCityName;
          const tourName = item?.name;
          const tourImage = item?.primaryPhoto?.small;
          const tourRating = item?.reviewsStats?.combinedNumericStats?.average;
          const tourReview = item?.reviewsStats?.allReviewsCount;
          const tourPrice = Math.floor(item?.representativePrice?.chargeAmount);
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
  );
}
export default FeaturedTours;
