import "./TourPackage.css";
import { useState, useEffect } from "react";
import { CLASSNAMES } from "./Shared/Constants";
import PageBanner from "../../Shared/PageBanner";
import SearchArea from "../../Shared/SearchArea";
import FilterByDestination from "./Filter/FilterByDestination";
import FilterByReviews from "./Filter/FilterByReviews/index";
import FilterByPrice from "./Filter/FilterByPrice/index";
import TourCard from "../TourCard";
import {
  useGetTrendingToursQuery,
  useGetFilteredDestinationToursQuery,
  useGetAttractionQuery,
  useGetSearchedToursQuery,
} from "../../Services/Api/module/demoApi";
import { useLocation } from "react-router-dom";
import { ProjectImages } from "../../assets/ProjectImages";

interface AttractionType {
  id: string;
  name: string;
  slug: string;
  destinationId: string;
  ufiDetails: {
    url: {
      country: string;
    };
    bCityName: string;
  };
  primaryPhoto: {
    small: string;
  };
  reviewsStats: {
    combinedNumericStats: {
      average: number;
    };
    allReviewsCount: number;
  };
  representativePrice: {
    chargeAmount: number;
  };
}

interface SearchAreaDataProps{
  selectDate:any,
  destinationName:string
}

function TourPackagePage() {
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [mergedAttractions, setMergedAttractions] = useState<AttractionType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedRating, setSelectedRating] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [selectedDate, setSelectedDate] = useState([]);

  const location = useLocation();
  const searchingData = location.state || "";

  
  useEffect(() => {
    if (searchingData?.formattedData) {
      const { destinationName, selectDate } = searchingData.formattedData;
      setSelectedDestination(destinationName || null);
      setSelectedDate(selectDate || []);
    }
  }, []); 

  // Handle searched data (destination name, dates)
  function searchAreaData(values: SearchAreaDataProps) {
    setSelectedDate(values.selectDate);
    setSelectedDestination(values.destinationName);
  }

  // Manage selected price
  function handleSelectedPrice(value:any) {
    setSelectedPrice(value);
  }

  // Handle destination
  function handleDestinationData(data: string | null) {
    setMergedAttractions([]);
    setSelectedDestination(data || null);
    setCurrentPage(1);
  }

  // Filtered destination ID and getting data
  const { data: filteredDestination } = useGetFilteredDestinationToursQuery(
    selectedDestination || "",
    {
      skip: !selectedDestination,
    }
  );
  const destinationId = filteredDestination?.data?.products?.[0]?.id;
  const { data: searchedTours } = useGetSearchedToursQuery(
    { destinationId, selectedDate, currentPage },
    {
      skip: !destinationId || selectedDate.length !== 2,
    }
  );

  // Fetching data for the destination-specific attractions
  const { data: attractionData } = useGetAttractionQuery(
    { destinationId, currentPage },
    {
      skip: !destinationId || selectedDate.length > 0,
    }
  );

  // Trending tour data
  const { data: trendingDestination } = useGetTrendingToursQuery(currentPage, {
    skip: !!selectedDestination || selectedDate.length === 2,
  });

  useEffect(() => {
    if (selectedDestination && selectedDate.length === 2 && searchedTours?.data?.products) {
      setMergedAttractions(searchedTours.data.products);
      return;
    }

    if (selectedDestination && attractionData?.data?.products) {
      setMergedAttractions(attractionData.data.products);
      return;
    }

    if (!selectedDestination && trendingDestination?.data?.products) {
      setMergedAttractions(trendingDestination.data.products);
      return;
    }

    setMergedAttractions([]);
    }, [selectedDestination, selectedDate, attractionData, trendingDestination, searchedTours]);

  // Getting selected rating input
  function handleRatingData(value: any) {
    setSelectedRating(value);
  }

  let displayedAttractions = [...mergedAttractions];

  // Filtering based on rating
  if (selectedRating.length > 0) {
    selectedRating.sort((a, b) => a - b);
    const minRating = selectedRating[0];
    const maxRating = selectedRating[selectedRating.length - 1];
    displayedAttractions = displayedAttractions.filter(
      (item) =>
        item?.reviewsStats?.combinedNumericStats?.average >= minRating &&
        item?.reviewsStats?.combinedNumericStats?.average <= maxRating
    );
  }

  // Filtering based on price
  if (selectedPrice?.length > 0) {
    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];
    displayedAttractions = displayedAttractions.filter(
      (item) =>
        Math.ceil(item?.representativePrice?.chargeAmount) <= maxPrice &&
        Math.ceil(item?.representativePrice?.chargeAmount) >= minPrice
    );
  }

  function handlePageChange(value: any) {
    if (value > 0) setCurrentPage((prev) => prev + 1);
    else if (value < 0 && currentPage !== 1) setCurrentPage((prev) => prev - 1);
  }

  const initialSearchValues = searchingData?.formattedData || {};

  return (
    <>
      <PageBanner
        headingText="Tour Package"
        normalText="Home /"
        coloredText="Tour Package"
        bannerImage={ProjectImages.TOURPAGE_BANNER}
      />
      <SearchArea searchAreaData={searchAreaData} initialSearchValues={initialSearchValues} />

      <div className={CLASSNAMES.FILTER_DISPLAY}>
        <div className={CLASSNAMES.FILTER_CONTAINER}>
          <div className="tour-filter-types">
            <FilterByPrice handleSelectedPrice={handleSelectedPrice} />
          </div>

          <div className="tour-filter-types">
            <FilterByDestination handleDestinationData={handleDestinationData} />
          </div>

          <div className="tour-filter-types">
            <FilterByReviews handleRatingData={handleRatingData} />
          </div>
        </div>

        <div className={CLASSNAMES.TOURS_CONTAINER}>
          {displayedAttractions.map((item: AttractionType) => {
            const countryName = item?.ufiDetails?.url?.country?.toUpperCase() || "N/A";
            const cityName = item?.ufiDetails?.bCityName || "N/A";
            const tourName = item?.name || "N/A";
            const tourImage = item?.primaryPhoto?.small || "";
            const tourRating =
              item?.reviewsStats?.combinedNumericStats?.average?.toString() || "N/A";
            const tourReview = item?.reviewsStats?.allReviewsCount?.toString() || "0";
            const tourPrice = Math.ceil(item?.representativePrice?.chargeAmount || 0);
            const slugValue = item?.slug || item.id.toString();

            return (
              <TourCard
                key={`${item.destinationId}-${slugValue}`}
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

      <div className="page-navigation-container">
        <div className="pages-navigation">
          <span
            className="page-number-container"
            onClick={() => {
              handlePageChange(-1);
            }}
          >
            <i className="fa-solid fa-chevron-left" />
          </span>{" "}

          <span
            className="page-number-container colored-page-number"
            onClick={() => setCurrentPage((prev) => prev + 1)}  
          >
            {currentPage}
          </span>

          <span
            className="page-number-container"
            onClick={() => {
              handlePageChange(1);
            }}
          >
            <i className="fa-solid fa-chevron-right" />
          </span>{" "}
        </div>
      </div>
    </>
  );
}

export default TourPackagePage;