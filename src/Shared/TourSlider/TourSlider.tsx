import './TourSlider.css';
import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useGetTrendingAttractionQuery } from '../../Services/Api/module/demoApi';
import TourCard from '../../Views/TourCard';
import TourCardSkeleton from '../TourCardSkeleton/TourCardSkeleton';

function TourSlider() {
  const destinationId = "eyJwaW5uZWRQcm9kdWN0IjoiUFJpSEhIVjB1TGJPIiwidWZpIjoyMDA4ODMyNX0=";
  const currentPage = 1;
  const { data, isLoading } = useGetTrendingAttractionQuery({ destinationId, currentPage });

  const attractions = data?.data?.products?.slice(1, 9) || [];
  const cardsPerSlide = 4;
  const totalSlides = attractions.length - cardsPerSlide + 1;
  const [currentIndex, setCurrentIndex] = useState(0);
  const ethPrice = 1765;

  const handleSwipeLeft = () => {
    setCurrentIndex((prev) =>
      prev + 1 < attractions.length ? prev + 1 : 0
    );
  };

  const handleSwipeRight = () => {
    setCurrentIndex((prev) =>
      prev - 1 >= 0 ? prev - 1 : attractions.length - cardsPerSlide
    );
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    trackMouse: true,
  });

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const getVisibleCards = () => {
    let visible = attractions.slice(currentIndex, currentIndex + cardsPerSlide);
    if (visible.length < cardsPerSlide) {
      const remaining = cardsPerSlide - visible.length;
      visible = [...visible, ...attractions.slice(0, remaining)];
    }
    return visible;
  };

  return (
    <div className="tour-slider-container" {...handlers}>
      <div className="tour-slider-content">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <TourCardSkeleton key={i} />)
        ) : (
          getVisibleCards().map((item: any, i: number) => {
            const countryName = item?.ufiDetails?.url?.country?.toUpperCase();
            const cityName = item?.ufiDetails?.bCityName;
            const tourName = item?.name;
            const tourImage = item?.primaryPhoto?.small;
            const tourRating = item?.reviewsStats?.combinedNumericStats?.average;
            // const tourReview = item?.reviewsStats?.allReviewsCount;
            const tourReview = item?.reviewsStats?.combinedNumericStats.total;

            const usdPrice = item?.representativePrice?.chargeAmount;
            const tourPrice = ethPrice ? `${(usdPrice / ethPrice).toFixed(5)} ETH` : "Loading...";
            const slugValue = item?.slug;

            return (
              <TourCard
                key={`${slugValue}-${i}`}
                cityName={cityName}
                countryName={countryName}
                tourName={tourName}
                tourImage={tourImage}
                tourRating={tourRating}
                tourReview={tourReview}
                tourPrice={tourPrice}
                tourDuration="1 day"
                slugValue={slugValue}
              />
            );
          })
        )}
      </div>

      <div className="navigation-dots">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className={`slider-btn dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default TourSlider;
