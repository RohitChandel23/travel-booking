import "./TourPackage.css";
import { useState, useEffect, useCallback } from "react";
import { CLASSNAMES } from "./Shared/Constants";
import PageBanner from "../../Shared/PageBanner";
import SearchArea from "../../Shared/SearchArea";
import FilterByDestination from "./Filter/FilterByDestination";
import FilterByReviews from "./Filter/FilterByReviews/index";
import FilterByPrice from "./Filter/FilterByPrice/index";
import TourCardSkeleton from "../../Shared/TourCardSkeleton/TourCardSkeleton";
import TourCard from "../../Shared/TourCard/index";

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
  readonly selectDate: [string | null, string | null];
  readonly destinationName: string;
  readonly activity: string;
  readonly "guest-numbers": string;
}

const TOURS_PER_PAGE = 21;
const PAGINATION_DISPLAY_LIMIT = 10;
const SIBLING_COUNT = 2;
const ETH_PRICE = 1765;

const generatePageNumbers = (
  currentPage: number,
  totalPages: number
): (number | string)[] => {
  if (totalPages <= PAGINATION_DISPLAY_LIMIT) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages: (number | string)[] = [];
  pages.push(1);
  const leftSiblingIndex = Math.max(currentPage - SIBLING_COUNT, 2);
  const rightSiblingIndex = Math.min(
    currentPage + SIBLING_COUNT,
    totalPages - 1
  );
  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1;
  if (shouldShowLeftDots) {
    pages.push("...");
  }
  for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
    pages.push(i);
  }
  if (shouldShowRightDots) {
    pages.push("...");
  }
  pages.push(totalPages);
  return pages;
};

function TourPackagePage() {
  const [selectedDestination, setSelectedDestination] = useState<string | null>(
    null
  );
  const [searchedDestination, setSearchedDestination] = useState<string>("");
  const [mergedAttractions, setMergedAttractions] = useState<AttractionType[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedRating, setSelectedRating] = useState<number[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number[]>([]);
  const [selectedDate, setSelectedDate] = useState<[string | null, string | null]>([null, null]);
  const [isSearchArea, setIsSearchArea] = useState(false);
  const [sortBy, setSortBy] = useState<string>("trending");
  const [totalTours, setTotalTours] = useState<number>(0);
  const [searchSource, setSearchSource] = useState<"searchArea" | "filterSearch" | null>(null);
  const [initialLoadComplete, setInitialLoadComplete] = useState<boolean>(false);
  const [currentSearchValues, setCurrentSearchValues] = useState<any>(null);
  const [searchFormKey, setSearchFormKey] = useState<number>(0);

  const location = useLocation();
  const searchingData = (location.state as { formattedData?: SearchAreaDataProps; footerDestination?: string } | string | null) || null;

  useEffect(() => {
    let initialDest: string | null = null;
    let initialSearchInput: string = "";
    let initialDate: [string | null, string | null] = [null, null];
    let cameFromSearchArea = false;
    let source: "searchArea" | "filterSearch" | null = null;
    let formData = null;

    if (typeof searchingData === "string") {
      initialDest = searchingData;
      initialSearchInput = searchingData;
      source = "filterSearch";
    } else if (searchingData?.formattedData) {
      initialDest = searchingData.formattedData.destinationName || null;
      initialDate = searchingData.formattedData.selectDate || [null, null];
      source = "searchArea";
      cameFromSearchArea = true;
      formData = searchingData.formattedData;
    } else if (searchingData?.footerDestination) {
      initialDest = searchingData.footerDestination;
      initialSearchInput = searchingData.footerDestination;
      source = "filterSearch";
    }

    setSearchSource(source);
    console.log("searchSource", searchSource);
    setSelectedDestination(initialDest);
    setSearchedDestination(initialSearchInput);
    setSelectedDate(initialDate);
    setCurrentPage(1);
    setInitialLoadComplete(false);

    if (cameFromSearchArea && formData) {
      setCurrentSearchValues({
        destinationName: formData.destinationName || "",
        activity: formData.activity || "",
        selectDate: [
          formData.selectDate?.[0] ? new Date(formData.selectDate[0]) : null,
          formData.selectDate?.[1] ? new Date(formData.selectDate[1]) : null,
        ],
        "guest-numbers": formData["guest-numbers"] || "",
      });
    } else {
      setCurrentSearchValues(null);
    }

    if (cameFromSearchArea) {
      setSelectedRating([]);
      setSelectedPrice([]);
    }
    setIsSearchArea(cameFromSearchArea);
    setSearchFormKey(prev => prev + 1);
  }, [searchingData]);

  const {
    data: filteredDestination,
    isLoading: isLoadingDestination,
    isFetching: isFetchingDestination,
    isSuccess: isSuccessDestination,
    isError: isErrorDestination,
  } = useGetFilteredDestinationToursQuery(selectedDestination ?? "", {
    skip: !selectedDestination,
  });

  const destinationId = filteredDestination?.data?.products?.[0]?.id;

  const isDateFilterActive = selectedDate[1] !== null;

  const {
    data: searchedTours,
    isLoading: isLoadingSearched,
    isFetching: isFetchingSearched,
    isSuccess: isSuccessSearched,
    isError: isErrorSearched,
  } = useGetSearchedToursQuery(
    { destinationId, selectedDate, currentPage, sortBy, limit: TOURS_PER_PAGE },
    { skip: !destinationId || !isSuccessDestination || !isDateFilterActive }
  );

  const {
    data: attractionData,
    isLoading: isLoadingAttraction,
    isFetching: isFetchingAttraction,
    isSuccess: isSuccessAttraction,
    isError: isErrorAttraction,
  } = useGetAttractionQuery(
    { destinationId, currentPage, sortBy, limit: TOURS_PER_PAGE },
    { skip: !destinationId || !isSuccessDestination || isDateFilterActive }
  );

  const {
    data: trendingDestination,
    isLoading: isLoadingTrending,
    isFetching: isFetchingTrending,
    isSuccess: isSuccessTrending,
    // isError: isErrorTrending,
  } = useGetTrendingToursQuery(
    { currentPage, sortBy, limit: TOURS_PER_PAGE },
    { skip: !!selectedDestination || isDateFilterActive }
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
      setTotalTours(activeData.data.filterStats?.filteredProductCount || 0);
    } else if (initialLoadComplete && !activeFetching) {
      setMergedAttractions([]);
      setTotalTours(0);
    }
  }, [
    selectedDestination,
    selectedDate,
    destinationId,
    isDateFilterActive,
    searchedTours,
    isSuccessSearched,
    isFetchingSearched,
    attractionData,
    isSuccessAttraction,
    isFetchingAttraction,
    trendingDestination,
    isSuccessTrending,
    isFetchingTrending,
    isSuccessDestination,
    isFetchingDestination,
    initialLoadComplete,
  ]);

  const totalPages = Math.max(1, Math.ceil(totalTours / TOURS_PER_PAGE));
  const pageNumbersToDisplay = generatePageNumbers(currentPage, totalPages);

  const displayedAttractions = [...mergedAttractions].filter(item => {
    let passesRatingFilter = true;
    let passesPriceFilter = true;

    if (selectedRating.length > 0) {
      const averageRating = item?.reviewsStats?.combinedNumericStats?.average;
      if (typeof averageRating === "number") {
        passesRatingFilter = selectedRating.some(selected => {
          if (selected === 5) return averageRating === 5;
          return averageRating >= selected && averageRating < selected + 1;
        });
      } else {
        passesRatingFilter = false;
      }
    }

    if (selectedPrice?.length === 2) {
      const [minPrice, maxPrice] = selectedPrice;
      const usdPrice = item?.representativePrice?.chargeAmount;
      if (typeof usdPrice === "number" && ETH_PRICE > 0) {
        const itemEthPrice = usdPrice / ETH_PRICE;
        passesPriceFilter = itemEthPrice >= minPrice && itemEthPrice <= maxPrice;
      } else {
        passesPriceFilter = false;
      }
    }

    return passesRatingFilter && passesPriceFilter;
  });

  const shimmerCardId = Array.from({ length: 21 }, (_, i) => i + 1);

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
    setIsSearchArea(false);
    setSelectedDate([null, null]);
    setInitialLoadComplete(false);
    setCurrentSearchValues(null);
    setSearchFormKey(prev => prev + 1);
  }

  function searchAreaData(values: SearchAreaDataProps) {
    setSearchSource("searchArea");
    setIsSearchArea(true);
    setSelectedDate(values.selectDate || [null, null]);
    setSelectedDestination(values.destinationName.trim() || null);
    setSearchedDestination("");
    setSelectedRating([]);
    setSelectedPrice([]);
    setCurrentPage(1);
    setInitialLoadComplete(false);
    setCurrentSearchValues({
      destinationName: values.destinationName || "",
      activity: values.activity || "",
      selectDate: [
        values.selectDate?.[0] ? new Date(values.selectDate[0]) : null,
        values.selectDate?.[1] ? new Date(values.selectDate[1]) : null,
      ],
      "guest-numbers": values["guest-numbers"] || "",
    });
    setSearchFormKey(prev => prev + 1);
  }

  function handleDestinationData(data: string | null) {
    setSearchSource("filterSearch");
    setSelectedDestination(data);
    setSearchedDestination(data ?? "");
    setCurrentPage(1);
    setIsSearchArea(false);
    setSelectedDate([null, null]);
    setInitialLoadComplete(false);
    setCurrentSearchValues(null);
    setSearchFormKey(prev => prev + 1);
  }

  function handleRatingData(value: number[]) {
    setSelectedRating(value);
  }

  function handleSelectedPrice(value: number[]) {
    setSelectedPrice(value);
  }

  function handlePageChange(value: number) {
    const newPage = currentPage + value;
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= totalPages && pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const resetSidebarFilters = useCallback(() => {
    if (selectedRating.length > 0 || selectedPrice.length > 0) {
      setSelectedRating([]);
      setSelectedPrice([]);
    }
  }, [selectedRating, selectedPrice]);

  const isOverallLoading =
    (isLoadingDestination || isFetchingDestination) ||
    (isLoadingSearched || isFetchingSearched) ||
    (isLoadingAttraction || isFetchingAttraction) ||
    (isLoadingTrending || isFetchingTrending) ||
    !initialLoadComplete;

  const hasError =
    initialLoadComplete &&
    ((selectedDestination && !destinationId && isErrorDestination) ||
      (destinationId && isDateFilterActive && isErrorSearched) ||
      (destinationId && !isDateFilterActive && isErrorAttraction))
      // (!selectedDestination && !isDateFilterActive && isErrorTrending));

  const failedToFindDestinationId =
    initialLoadComplete &&
    selectedDestination !== null &&
    isSuccessDestination &&
    !destinationId;

  const showShimmer = isOverallLoading;
  const showError = !isOverallLoading && hasError;
  const showNoResults =
    // initialLoadComplete &&
    !isOverallLoading &&
    !hasError &&
    (failedToFindDestinationId || displayedAttractions.length === 0);
  const showResults =
    initialLoadComplete &&
    !isOverallLoading &&
    !hasError &&
    !showNoResults &&
    displayedAttractions.length > 0;
  const showPagination =
    !isOverallLoading &&
    !hasError &&
    totalPages > 1 &&
    displayedAttractions.length > 0;

  let content;
  if (showShimmer) {
    content = shimmerCardId.map(item => <TourCardSkeleton key={item} />);
  } else if (showError) {
    content = (
      <div className="error-message" style={{ textAlign: "center", padding: "40px", gridColumn: "1 / -1" }}>
        <p>Sorry, an error occurred while fetching tours. Please try again later.</p>
      </div>
    );
  } else if (showResults) {
    content = displayedAttractions.map((item: AttractionType) => {
      const countryName = item?.ufiDetails?.url?.country?.toUpperCase() || "N/A";
      const cityName = item?.ufiDetails?.bCityName || "N/A";
      const tourName = item?.name || "Unnamed Tour";
      const tourImage = item?.primaryPhoto?.small;
      const tourRating = item?.reviewsStats?.combinedNumericStats?.average?.toFixed(1);
      const tourReview = item?.reviewsStats?.combinedNumericStats?.total.toString() || "0";
      const usdPrice = item?.representativePrice?.chargeAmount;
      const tourPrice = ETH_PRICE > 0 && typeof usdPrice === "number"
        ? `${(usdPrice / ETH_PRICE).toFixed(5)} ETH`
        : "N/A";
      const slugValue = item?.slug || item.id?.toString();
      const uniqueKey = `${item.destinationId || "dest"}-${item.id || slugValue}-${currentPage}`;

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
          tourDuration="1 day"
          slugValue={slugValue}
        />
      );
    });
  } else if (showNoResults) {
    content = (
      <div className="no-tours-found" style={{ textAlign: "center", padding: "40px", gridColumn: "1 / -1" }}>
        <div className="not-foung-image">
          <img src={ProjectImages.NOT_FOUND} alt="Not Found" />
        </div>
        <p>Sorry, No Tours Found Matching Your Criteria.</p>
        {failedToFindDestinationId && <p>We couldn't find tours for the specified destination.</p>}
        {mergedAttractions.length > 0 && (selectedRating.length > 0 || selectedPrice.length > 0) && (
          <p>Try adjusting your filters.</p>
        )}
        {!failedToFindDestinationId && mergedAttractions.length === 0 && totalTours === 0 && (
          <p>No tours available for this destination.</p>
        )}
      </div>
    );
  }

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
  initialSearchValues={currentSearchValues || undefined}
  isSearchArea={isSearchArea}
  onFocusResetSidebarFilters={resetSidebarFilters}
  formKey={searchFormKey}
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSidebarSearchSubmit();
                  }}
                  placeholder="Search Destination..."
                />
                <button
                  onClick={handleSidebarSearchSubmit}
                  className="side-bar-search-button"
                  aria-label="Search"
                >
                  <i className="fa fa-search search-icon search-icon-filter" />
                </button>
              </div>
            </div>
          </div>

          {(showPagination || displayedAttractions.length > 0 || selectedPrice.length > 0) && (
            <div className="tour-filter-types">
              <FilterByPrice
                handleSelectedPrice={handleSelectedPrice}
                currentPriceRange={selectedPrice}
              />
            </div>
          )}

          <div className="tour-filter-types">
            <FilterByDestination
              handleDestinationData={handleDestinationData}
              currentDestination={selectedDestination}
            />
          </div>

          {(showPagination || displayedAttractions.length > 0 || selectedRating.length > 0) && (
            <div className="tour-filter-types">
              <FilterByReviews
                handleRatingData={handleRatingData}
                currentRatings={selectedRating}
              />
            </div>
          )}
        </div>

        <div className={CLASSNAMES.TOURS_WRAPPER}>
          {(showPagination || displayedAttractions.length > 0) && (
            <div className="sorting-container">
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
            </div>
          )}

          <div className={CLASSNAMES.TOURS_CONTAINER}>{content}</div>
        </div>
      </div>

      {showPagination && (
        <div className="page-navigation-container">
          <div className="pages-navigation">
            <button
              className={`page-number-container ${currentPage === 1 ? "disabled" : ""}`}
              onClick={() => handlePageChange(-1)}
              style={{ cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
              disabled={currentPage === 1}
              aria-label="Previous Page"
            >
              <i className="fa-solid fa-chevron-left" />
            </button>

            {pageNumbersToDisplay.map((page) => {
              if (typeof page === "string") {
                return (
                  <span
                    key={page}
                    className="page-number-container ellipsis"
                    aria-hidden="true"
                  >
                    {page}
                  </span>
                );
              }
              return (
                <button
                  key={`page-${page}`}
                  className={`page-number-container ${currentPage === page ? "colored-page-number" : ""}`}
                  onClick={() => goToPage(page)}
                  onKeyDown={(e) => {
                    if ((e.key === "Enter" || e.key === " ") && currentPage !== page) {
                      e.preventDefault();
                      goToPage(page);
                    }
                  }}
                  style={{ cursor: currentPage === page ? "default" : "pointer" }}
                  aria-current={currentPage === page ? "page" : undefined}
                  aria-label={`Go to page ${page}`}
                >
                  {page}
                </button>
              );
            })}

            <button
              className={`page-number-container ${currentPage === totalPages ? "disabled" : ""}`}
              onClick={() => currentPage !== totalPages && handlePageChange(1)}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && currentPage !== totalPages) {
                  handlePageChange(1);
                }
              }}
              style={{ cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}
              disabled={currentPage === totalPages}
              aria-label="Next Page"
            >
              <i className="fa-solid fa-chevron-right" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default TourPackagePage;
