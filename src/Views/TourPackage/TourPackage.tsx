import "./TourPackage.css";
import { useState, useEffect } from "react";
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

//filter by rating: received data, manipulate

function TourPackagePage() {
  const [selectedDestination, setSelectedDestination] = useState<string[]>([]);
  const [currentDestinationIndex, setCurrentDestinationIndex] = useState(0);
  const [mergedAttractions, setMergedAttractions] = useState<AttractionType[]>([]);

  function handleDestinationData(data: string[]) {
    console.log("Destinations changed:", {
      previous: selectedDestination,
      new: data
    });
    // Reset state when destinations change
    setCurrentDestinationIndex(0);
    setMergedAttractions([]);
    setSelectedDestination(data || []);
  }

  // Get trending tours when no destination is selected
  const { data: trendingDestination } = useGetTrendingToursQuery("", {
    skip: selectedDestination.length > 0,
  });

  // Get data for current destination
  const { data: filteredDestination } = useGetFilteredDestinationToursQuery(
    selectedDestination[currentDestinationIndex] || "",
    { 
      skip: !selectedDestination.length || currentDestinationIndex >= selectedDestination.length,
    }
  );

  const destinationId = filteredDestination?.data?.products?.[0]?.id;

  // Get attraction data
  const { data: attractionData } = useGetAttractionQuery(
    destinationId || undefined,
    {
      skip: !destinationId,
    }
  );

  // Process attractions
  useEffect(() => {
    if (selectedDestination.length === 0) {
      // Show trending destinations when nothing is selected
      const trendingAttractions = (trendingDestination?.data?.products || []).map((attraction: AttractionType) => ({
        ...attraction,
        destinationId: 'trending'
      }));
      setMergedAttractions(trendingAttractions.slice(0, 9));
      return;
    }

    if (attractionData?.data?.products) {
      setMergedAttractions(prev => {
        const newAttractions = [...prev];
        const currentAttractions = attractionData.data.products.map((attraction: AttractionType) => ({
          ...attraction,
          destinationId: selectedDestination[currentDestinationIndex]
        }));
        
        // Add new attractions while maintaining uniqueness
        currentAttractions.forEach((attraction: AttractionType) => {
          if (!newAttractions.some(existing => existing.id === attraction.id)) {
            newAttractions.push(attraction);
          }
        });

        // Move to next destination if available
        if (currentDestinationIndex < selectedDestination.length - 1) {
          setCurrentDestinationIndex(prev => prev + 1);
        }

        return newAttractions.slice(0, 9);
      });
    }
  }, [selectedDestination, currentDestinationIndex, attractionData, trendingDestination]);

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
            <FilterByDestination handleDestinationData={handleDestinationData} />
          </div>

          <div className="tour-filter-types">
            <FilterByReviews handleRatingData={() => {}} />
          </div>
        </div>

        <div className={CLASSNAMES.TOURS_CONTAINER}>
          {mergedAttractions.map((item: AttractionType) => {
            const countryName = item?.ufiDetails?.url?.country?.toUpperCase() || "N/A";
            const cityName = item?.ufiDetails?.bCityName || "N/A";
            const tourName = item?.name || "N/A";
            const tourImage = item?.primaryPhoto?.small || "";
            const tourRating =
              item?.reviewsStats?.combinedNumericStats?.average?.toString() || "N/A";
            const tourReview =
              item?.reviewsStats?.allReviewsCount?.toString() || "0";
            const tourPrice = Math.floor(
              item?.representativePrice?.chargeAmount || 0
            );
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
    </>
  );
}
export default TourPackagePage;