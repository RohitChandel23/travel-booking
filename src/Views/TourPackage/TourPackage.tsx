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
  id: string | number;
  destinationId: string;
  ufiDetails?: {
    url?: {
      country?: string;
    };
    bCityName?: string;
  };
  name?: string;
  primaryPhoto?: {
    small?: string;
  };
  reviewsStats?: {
    combinedNumericStats?: {
      average?: number;
    };
    allReviewsCount?: number;
  };
  representativePrice?: {
    chargeAmount?: number;
  };
  slug?: string;
}

function TourPackagePage() {
  const [selectedDestination, setSelectedDestination] = useState<string[]>([]);
  const [currentDestinationIndex, setCurrentDestinationIndex] = useState(0);
  const [mergedAttractions, setMergedAttractions] = useState<AttractionType[]>([]);
  const [requestId, setRequestId] = useState(0);

  function handleDestinationData(data: string[]) {
    console.log("Destinations changed:", {
      previous: selectedDestination,
      new: data,
      isDeselect: data.length < selectedDestination.length
    });
    
    if (data.length < selectedDestination.length || data.length === 0) {
      setCurrentDestinationIndex(0);
      setMergedAttractions([]);
    }
    
    setSelectedDestination(data || []);
    setRequestId(prev => prev + 1);
  }

  const { data: trendingDestination } = useGetTrendingToursQuery(`trending-${requestId}`, {
    skip: selectedDestination.length > 0,
    refetchOnMountOrArgChange: true
  });

  const { data: filteredDestination } = useGetFilteredDestinationToursQuery(
    selectedDestination[currentDestinationIndex] || "",
    { 
      skip: !selectedDestination.length || currentDestinationIndex >= selectedDestination.length,
      refetchOnMountOrArgChange: true
    }
  );

  const destinationId = filteredDestination?.data?.products?.[0]?.id;

  const { data: attractionData } = useGetAttractionQuery(
    destinationId ? `${destinationId}-${requestId}` : undefined,
    {
      skip: !destinationId,
      refetchOnMountOrArgChange: true
    }
  );

  useEffect(() => {
    console.log("Processing effect:", {
      selectedDestinations: selectedDestination,
      currentIndex: currentDestinationIndex,
      hasAttractionData: !!attractionData?.data?.products,
      currentMergedCount: mergedAttractions.length,
      requestId
    });

    if (selectedDestination.length === 0) {
      // Show trending destinations when nothing is selected
      const trendingAttractions = (trendingDestination?.data?.products || []).map((attraction: AttractionType) => ({
        ...attraction,
        destinationId: 'trending'
      }));
      console.log("Setting trending attractions:", {
        count: trendingAttractions.length
      });
      setMergedAttractions(trendingAttractions.slice(0, 9));
      return;
    }

    if (attractionData?.data?.products) {
      console.log("Processing attractions for destination:", {
        destinationId: selectedDestination[currentDestinationIndex],
        currentIndex: currentDestinationIndex,
        totalDestinations: selectedDestination.length
      });
      
      setMergedAttractions(prev => {
        const newAttractions = [...prev];
        const currentAttractions = attractionData.data.products.map((attraction: AttractionType) => ({
          ...attraction,
          destinationId: selectedDestination[currentDestinationIndex]
        }));
        
        currentAttractions.forEach((attraction: AttractionType) => {
          if (!newAttractions.some(existing => existing.id === attraction.id)) {
            newAttractions.push(attraction);
          }
        });

        if (currentDestinationIndex < selectedDestination.length - 1) {
          setCurrentDestinationIndex(prev => prev + 1);
        }

        return newAttractions.slice(0, 9);
      });
    }
  }, [selectedDestination, currentDestinationIndex, attractionData, trendingDestination, requestId]);

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
