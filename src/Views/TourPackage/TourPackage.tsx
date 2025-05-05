import "./TourPackage.css";
import { useState, useEffect, useCallback } from "react";
import { CLASSNAMES } from "./Shared/Constants";
import PageBanner from "../../Shared/PageBanner";
import SearchArea from "../../Shared/SearchArea";
import FilterByDestination from "./Filter/FilterByDestination";
import FilterByReviews from "./Filter/FilterByReviews/index";
import FilterByPrice from "./Filter/FilterByPrice/index";
import TourCardSkeleton from "../../Shared/TourCardSkeleton/TourCardSkeleton";
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
      total: number;
      average: number;
    };
    allReviewsCount: number;
  };
  representativePrice: {
    chargeAmount: number;
  };
}

interface SearchAreaDataProps {
  selectDate: [string | null, string | null];
  destinationName: string;
  activity: string;
  "guest-numbers": string;
}

const TOURS_PER_PAGE = 21;
const PAGINATION_DISPLAY_LIMIT = 10;
const SIBLING_COUNT = 2;

const generatePageNumbers = (currentPage: number, totalPages: number): (number | string)[] => {
  if (totalPages <= PAGINATION_DISPLAY_LIMIT) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages: (number | string)[] = [];
  pages.push(1);
  const leftSiblingIndex = Math.max(currentPage - SIBLING_COUNT, 2);
  const rightSiblingIndex = Math.min(currentPage + SIBLING_COUNT, totalPages - 1);
  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1;
  if (shouldShowLeftDots) {
    pages.push('...');
  }
  for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
    pages.push(i);
  }
  if (shouldShowRightDots) {
    pages.push('...');
  }
  pages.push(totalPages);
  return pages;
};

function TourPackagePage() {
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [searchedDestination, setSearchedDestination] = useState<string>("");
  const [mergedAttractions, setMergedAttractions] = useState<AttractionType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [selectedRating, setSelectedRating] = useState<number[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number[]>([]);
  
  const [selectedDate, setSelectedDate] = useState<[string | null, string | null]>([null, null]);
  const [isSearchArea, setSearchArea] = useState(false);
  const [sortBy, setSortBy] = useState<string>("trending");
  const [totalTours, setTotalTours] = useState<number>(0);
  const [searchSource, setSearchSource] = useState<"searchArea" | "filterSearch" | null>(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState<boolean>(false);
  const ethPrice = 1765;

  const location = useLocation();
  const searchingData = location.state as { formattedData?: SearchAreaDataProps, footerDestination?: string } | string | null || null;

  const totalPages = totalTours > 0 ? Math.ceil(totalTours / TOURS_PER_PAGE) : 1;
  const pageNumbersToDisplay = generatePageNumbers(currentPage, totalPages);

  useEffect(() => {
    let initialDest: string | null = null;
    let initialSearchInput: string = "";
    let initialDate: [string | null, string | null] = [null, null];
    let cameFromSearchArea = false;

    if (typeof searchingData === 'string') {
      initialDest = searchingData;
      initialSearchInput = searchingData;
      setSearchSource("filterSearch");
      setSearchArea(false);
    }
    else if (searchingData?.formattedData) {
      initialDest = searchingData.formattedData.destinationName || null;
      initialDate = searchingData.formattedData.selectDate || [null, null];
      setSearchSource("searchArea");
      cameFromSearchArea = true;
      setSearchArea(true);
    }
    else if (searchingData?.footerDestination) {
        initialDest = searchingData.footerDestination;
        initialSearchInput = searchingData.footerDestination;
        setSearchSource("filterSearch");
        setSearchArea(false);
    }

    setSelectedDestination(initialDest);
    setSearchedDestination(initialSearchInput);
    setSelectedDate(initialDate);
    setCurrentPage(1);
    setInitialLoadComplete(false);

    if (cameFromSearchArea) {
        setSelectedRating([]);
        setSelectedPrice([]);
    } else {
       setSearchArea(false);
    }

  }, [searchingData]);

  function handleSortChange(value: string) {
    setSortBy(value);
    setCurrentPage(1);
  }

  function handleSidebarSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchedDestination(e.target.value);
  }

  function handleSidebarSearchSubmit() {
    setSearchSource("filterSearch");
    const trimmedData = searchedDestination.trim() || null;
    setSelectedDestination(trimmedData);
    setCurrentPage(1);
    setSearchArea(false);
    setSelectedDate([null, null]);
    setInitialLoadComplete(false);
  }

  function searchAreaData(values: SearchAreaDataProps) {
    setSearchSource("searchArea");
    setSearchArea(true);
    setSelectedDate(values.selectDate || [null, null]);

    const trimmedDest = values.destinationName.trim();
    setSelectedDestination(trimmedDest || null);
    setSearchedDestination("");

    setSelectedRating([]);
    setSelectedPrice([]);

    setCurrentPage(1);
    setInitialLoadComplete(false);
  }

  function handleSelectedPrice(value: number[]) {
    setSelectedPrice(value);
  }

  function handleDestinationData(data: string | null) {
    setSearchSource("filterSearch");
    setSelectedDestination(data);
    setSearchedDestination(data || "");
    setCurrentPage(1);
    setSearchArea(false);
    setSelectedDate([null, null]);
    setInitialLoadComplete(false);
  }

  function handleRatingData(value: number[]) {
    setSelectedRating(value);
  }

  function handlePageChange(value: number) {
    const newPage = currentPage + value;
    if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function goToPage(pageNumber: number) {
      if(pageNumber >= 1 && pageNumber <= totalPages && pageNumber !== currentPage) {
          setCurrentPage(pageNumber);
          window.scrollTo({ top: 0, behavior: 'smooth'});
      }
  }

  const resetSidebarFilters = useCallback(() => {
       if (selectedRating.length > 0 || selectedPrice.length > 0) {
            setSelectedRating([]);
            setSelectedPrice([]);
       }
  }, [selectedRating, selectedPrice]);

  const {
    data: filteredDestination,
    isLoading: isLoadingDestination,
    isFetching: isFetchingDestination,
    isSuccess: isSuccessDestination,
    isError: isErrorDestination
  } = useGetFilteredDestinationToursQuery(selectedDestination || "", {
    skip: !selectedDestination,
  });

  const destinationId = filteredDestination?.data?.products?.[0]?.id;
  
  const failedToFindDestinationId = initialLoadComplete && selectedDestination !== null && isSuccessDestination && !destinationId;

  const isDateFilterActive = selectedDate[0] !== null && selectedDate[1] !== null;

  const {
    data: searchedTours,
    isLoading: isLoadingSearched,
    isFetching: isFetchingSearched,
    isSuccess: isSuccessSearched,
    isError: isErrorSearched
  } = useGetSearchedToursQuery(
    { destinationId, selectedDate, currentPage, sortBy, limit: TOURS_PER_PAGE },
    { skip: !destinationId || !isSuccessDestination || !isDateFilterActive },
  );

  const {
    data: attractionData,
    isLoading: isLoadingAttraction,
    isFetching: isFetchingAttraction,
    isSuccess: isSuccessAttraction,
    isError: isErrorAttraction
  } = useGetAttractionQuery(
    { destinationId, currentPage, sortBy, limit: TOURS_PER_PAGE },
    { skip: !destinationId || !isSuccessDestination || isDateFilterActive },
  );

  const {
    data: trendingDestination,
    isLoading: isLoadingTrending,
    isFetching: isFetchingTrending,
    isSuccess: isSuccessTrending,
    isError: isErrorTrending
  } = useGetTrendingToursQuery(
    { currentPage, sortBy, limit: TOURS_PER_PAGE },
    { skip: !!selectedDestination || isDateFilterActive },
  );

  useEffect(() => {
    let activeData = null;
    let activeSuccess = false;
    let activeFetching = true;

    if (selectedDestination && destinationId && isDateFilterActive) {
         activeData = searchedTours;
         activeSuccess = isSuccessSearched;
         activeFetching = isFetchingSearched || isFetchingDestination;
    } else if (selectedDestination && destinationId && !isDateFilterActive) {
         activeData = attractionData;
         activeSuccess = isSuccessAttraction;
         activeFetching = isFetchingAttraction || isFetchingDestination;
    } else if (!selectedDestination && !isDateFilterActive) {
         activeData = trendingDestination;
         activeSuccess = isSuccessTrending;
         activeFetching = isFetchingTrending;
    } else {
         activeFetching = isFetchingDestination || isFetchingSearched || isFetchingAttraction || isFetchingTrending;
    }

    if (!activeFetching) {
         setInitialLoadComplete(true);
    }

    if (activeSuccess && activeData?.data?.products) {
         setMergedAttractions(activeData.data.products);
         setTotalTours(activeData.data.filterStats.filteredProductCount);
    } else if (!activeFetching && initialLoadComplete) { 
         setMergedAttractions([]);
         setTotalTours(0);
    }

  }, [
      selectedDestination, selectedDate, destinationId, isDateFilterActive,
      searchedTours, isSuccessSearched, isFetchingSearched,
      attractionData, isSuccessAttraction, isFetchingAttraction,
      trendingDestination, isSuccessTrending, isFetchingTrending,
      isSuccessDestination, isFetchingDestination, initialLoadComplete
    ]);

  let displayedAttractions = [...mergedAttractions];

  if (selectedRating.length > 0) {
    displayedAttractions = displayedAttractions.filter((item) => {
      const averageRating = item?.reviewsStats?.combinedNumericStats?.average;
      if (typeof averageRating !== 'number') return false;
      return selectedRating.some((selected) => {
        if (selected === 5) return averageRating == 5;
        return averageRating >= selected && averageRating < selected + 1;
      });
    });
  }

  if (selectedPrice?.length === 2 && ethPrice != undefined && ethPrice > 0) {
    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];
    if (minPrice <= maxPrice) {
        displayedAttractions = displayedAttractions.filter((item) => {
            const usdPrice = item?.representativePrice?.chargeAmount;
            if (typeof usdPrice !== 'number') return false;
            const itemEthPrice = usdPrice / ethPrice;
            return itemEthPrice >= minPrice && itemEthPrice <= maxPrice;
        });
    }
  }

   const isOverallLoading =
    (selectedDestination && (isLoadingDestination || isFetchingDestination)) ||
    (selectedDestination && destinationId && isDateFilterActive && (isLoadingSearched || isFetchingSearched)) ||
    (selectedDestination && destinationId && !isDateFilterActive && (isLoadingAttraction || isFetchingAttraction)) ||
    (!selectedDestination && !isDateFilterActive && (isLoadingTrending || isFetchingTrending));

  const hasError =
    initialLoadComplete && (
      (selectedDestination && !destinationId && isErrorDestination) ||
      (selectedDestination && destinationId && isDateFilterActive && isErrorSearched) ||
      (selectedDestination && destinationId && !isDateFilterActive && isErrorAttraction) ||
      (!selectedDestination && !isDateFilterActive && isErrorTrending)
    );

  const showShimmer = isOverallLoading || !initialLoadComplete;
  
  const showError = !isOverallLoading && hasError;

  const showNoResults = initialLoadComplete && 
                       !isOverallLoading && 
                       !hasError &&
                       (failedToFindDestinationId || displayedAttractions.length === 0);
                       
  const showResults = initialLoadComplete && 
                      !isOverallLoading && 
                      !hasError && 
                      !showNoResults && 
                      displayedAttractions.length > 0;

  const showPagination = !isOverallLoading && !hasError && totalPages > 1 && displayedAttractions.length > 0;
  
  const initialSearchValuesForForm = searchSource === "searchArea" && searchingData && typeof searchingData === 'object' && searchingData.formattedData ? {
     destinationName: searchingData.formattedData.destinationName || "",
     selectDate: [
       searchingData.formattedData.selectDate?.[0] ? new Date(searchingData.formattedData.selectDate[0]) : null,
       searchingData.formattedData.selectDate?.[1] ? new Date(searchingData.formattedData.selectDate[1]) : null
     ] as [Date | null, Date | null],
     activity: searchingData.formattedData.activity || "",
     "guest-numbers": searchingData.formattedData["guest-numbers"],
   } : {
     destinationName: "",
     selectDate: [null, null] as [Date | null, Date | null],
     activity: "",
     "guest-numbers": "",
   };

  return (
    <>
      <PageBanner
        headingText="Tours"
        normalText="Home /"
        coloredText="Tours"
        bannerImage={ProjectImages.TOURPAGE_BANNER}
      />
      <SearchArea
        searchAreaData={searchAreaData}
        initialSearchValues={initialSearchValuesForForm}
        isSearchArea={isSearchArea}
        onFocusResetSidebarFilters={resetSidebarFilters}
      />

      <div className={CLASSNAMES.FILTER_DISPLAY}>
        <div className={CLASSNAMES.FILTER_CONTAINER}>
          <div className="tour-filter-types">
              <div className="search-destination-wrapper">
                <h3>Search Destination</h3>
                <div className="search-input-with-icon">
                  <input
                    type="text"
                    value={searchedDestination}
                    onChange={handleSidebarSearchChange}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSidebarSearchSubmit(); }}
                    placeholder="Search Destination..."
                  />
                  <i className="fa fa-search search-icon search-icon-filter" onClick={handleSidebarSearchSubmit} />
                </div>
              </div>
          </div>
        
        { (showPagination ||  displayedAttractions.length > 0 || selectedPrice.length > 0) && <div className="tour-filter-types">
            <FilterByPrice
                handleSelectedPrice={handleSelectedPrice}
                currentPriceRange={selectedPrice}
            />
          </div>}


          <div className="tour-filter-types">
            <FilterByDestination
                handleDestinationData={handleDestinationData}
                currentDestination={selectedDestination}
            />
          </div>
          
          {(showPagination || displayedAttractions.length>0 || selectedRating.length > 0) && <div className="tour-filter-types">
            <FilterByReviews
                handleRatingData={handleRatingData}
                currentRatings={selectedRating}
            />
          </div>}

        </div>

        <div className={CLASSNAMES.TOURS_WRAPPER}>

         {(showPagination || displayedAttractions.length > 0) && <div className="sorting-container">
              <label htmlFor="tour-sort">Sort by: </label>
              <select
               id="tour-sort"
               value={sortBy}
               onChange={(e) => handleSortChange(e.target.value)}
               className="sort-select"
              >
                <option value="trending">Trending</option>
                <option value="attr_book_score">Most popular</option>
                <option value="lowest_price">Lowest Price</option>
              </select>
            </div>}

          <div className={CLASSNAMES.TOURS_CONTAINER}>
            {showShimmer ? (
              Array.from({ length: TOURS_PER_PAGE }).map((_, i) => <TourCardSkeleton key={`skeleton-${i}`} />)
            ) : showError ? (
              <div className="error-message" style={{textAlign: 'center', padding: '40px', gridColumn: '1 / -1'}}>
                  <p>Sorry, an error occurred while fetching tours. Please try again later.</p>
              </div>
            ) : showResults ? (
              displayedAttractions.map((item: AttractionType) => {
                const countryName = item?.ufiDetails?.url?.country?.toUpperCase() || "N/A";
                const cityName = item?.ufiDetails?.bCityName || "N/A";
                const tourName = item?.name || "Unnamed Tour";
                const tourImage = item?.primaryPhoto?.small;
                const tourRating = item?.reviewsStats?.combinedNumericStats?.average?.toFixed(1);
                const tourReview = item?.reviewsStats?.combinedNumericStats?.total.toString() || '0';

                const usdPrice = item?.representativePrice?.chargeAmount;
                const tourPrice = (ethPrice && typeof usdPrice === 'number' && ethPrice > 0) ? `${(usdPrice / ethPrice).toFixed(5)} ETH` : "N/A";
                const slugValue = item?.slug || item.id?.toString() || `tour-${Math.random()}`;
                const uniqueKey = `${item.destinationId || 'dest'}-${item.id || slugValue}-${currentPage}`;

                return (
                  <TourCard
                    key={uniqueKey}
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
              })
            ) : (
              <div className="no-tours-found" style={{textAlign: 'center', padding: '40px', gridColumn: '1 / -1'}}>
                <div className="not-foung-image"><img src={ProjectImages.NOT_FOUND} alt="Not Found"/></div>
                 <p>Sorry, No Tours Found Matching Your Criteria.</p>
                 {failedToFindDestinationId && <p>We couldn't find tours for the specified destination.</p>}
                 {!failedToFindDestinationId && mergedAttractions.length > 0 && (selectedRating.length > 0 || selectedPrice.length > 0) && <p>Try adjusting your filters.</p>}
                 {!failedToFindDestinationId && mergedAttractions.length === 0 && totalTours === 0 && <p>No tours available for this destination/date combination.</p>}
              </div>
            )}
          </div>
        </div>
      </div>

      {showPagination && (
         <div className="page-navigation-container">
             <div className="pages-navigation">
             <span
                 className={`page-number-container ${currentPage === 1 ? 'disabled' : ''}`}
                 onClick={() => handlePageChange(-1)}
                 style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                 aria-disabled={currentPage === 1}
                 role="button"
                 tabIndex={currentPage === 1 ? -1 : 0}
                 aria-label="Previous Page"
             >
                 <i className="fa-solid fa-chevron-left" />
             </span>

             {pageNumbersToDisplay.map((page, index) => {
                 if (typeof page === 'string') {
                     return (
                         <span key={`ellipsis-${index}`} className="page-number-container ellipsis" aria-hidden="true">
                             {page}
                         </span>
                     );
                 } else {
                     return (
                         <span
                             key={`page-${page}`}
                             className={`page-number-container ${currentPage === page ? 'colored-page-number' : ''}`}
                             onClick={() => goToPage(page)}
                             style={{ cursor: currentPage === page ? 'default' : 'pointer' }}
                             role="button"
                             tabIndex={0}
                             aria-current={currentPage === page ? 'page' : undefined}
                             aria-label={`Go to page ${page}`}
                         >
                             {page}
                         </span>
                     );
                 }
             })}

             <span
                 className={`page-number-container ${currentPage === totalPages ? 'disabled' : ''}`}
                 onClick={() => handlePageChange(1)}
                 style={{ cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                 aria-disabled={currentPage === totalPages}
                 role="button"
                 tabIndex={currentPage === totalPages ? -1 : 0}
                 aria-label="Next Page"
             >
                 <i className="fa-solid fa-chevron-right" />
             </span>
             </div>
         </div>
       )}
    </>
  );
}

export default TourPackagePage;


