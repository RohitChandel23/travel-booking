import "./TourPackage.css";
import { useState } from "react";
import { CLASSNAMES } from "./Shared/Constants";
import PageBanner from "../Shared/PageBanner";
import SearchArea from "../Shared/SearchArea";
import FilterByDestination from "./Filter/FilterByDestination";
import FilterByReviews from "./Filter/FilterByReviews/FilterByReviews";
import TourCard from "../TourCard";
import {
  useGetTrendingToursQuery,
  useGetFilteredDestinationToursQuery,
  useGetAttractionQuery,
} from "../../Services/Api/module/demoApi";

//filter by rating: received data, manipulate

function TourPackagePage() {
  const [selectedDestination, setSelectedDestination] = useState<string[]>();
  const [selectedRating, setSelectedRating] = useState<any>();

  function handleRatingData(data: any) {
    setSelectedRating([...data]);
  }
  console.log("selected rating", selectedRating);

  function handleDestinationData(data: string[]) {
    setSelectedDestination([...data]);
  }
  console.log("data to be fetched", selectedDestination);

  const { data: trendingDestination } = useGetTrendingToursQuery("", {
    skip: selectedDestination?.length! > 0,
  });
  const { data: filteredDestination } = useGetFilteredDestinationToursQuery(
    selectedDestination,
    { skip: selectedDestination?.length == 0 }
  );
  console.log("received filtered data:", filteredDestination);
  const destinationId = filteredDestination?.data?.products[0]?.id;
  console.log("destination id is:", destinationId);

  const { data: attractionData } = useGetAttractionQuery(destinationId);
  console.log("tour card data", attractionData);
  console.log(attractionData?.status);


  const attractions = !attractionData?.status
    ? trendingDestination?.data?.products?.slice(0, 9)
    : attractionData?.data?.products?.slice(0, 9);

  return (
    <>
      <PageBanner
        headingText="Tour Package"
        normalText="Home /"
        coloredText="Tour Package"
      />
      <SearchArea />

      <div className={CLASSNAMES.FILTER_DISPLAY}>
        <div className={CLASSNAMES.FILTER_CONTAINER}>
          <div className="tour-filter-types">
            <FilterByDestination
              handleDestinationData={handleDestinationData}
            />
          </div>

          <div className="tour-filter-types">
            <FilterByReviews handleRatingData={handleRatingData} />
          </div>
        </div>

        <div className={CLASSNAMES.TOURS_CONTAINER}>
          {attractions?.map((item: any) => {
            const countryName = item?.ufiDetails?.url?.country?.toUpperCase();
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
    </>
  );
}
export default TourPackagePage;
