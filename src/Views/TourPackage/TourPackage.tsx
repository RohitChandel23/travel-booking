import "./TourPackage.css"
import { useState, useEffect } from "react"
import { CLASSNAMES } from "./Shared/Constants"
import PageBanner from "../../Shared/PageBanner"
import SearchArea from "../../Shared/SearchArea"
import FilterByDestination from "./Filter/FilterByDestination"
import FilterByReviews from "./Filter/FilterByReviews/index"
import FilterByPrice from "./Filter/FilterByPrice/index"
import TourCardSkeleton from "../../Shared/TourCardSkeleton/TourCardSkeleton"
import TourCard from "../TourCard"
import {
  useGetTrendingToursQuery,
  useGetFilteredDestinationToursQuery,
  useGetAttractionQuery,
  useGetSearchedToursQuery,
} from "../../Services/Api/module/demoApi"
import { useLocation } from "react-router-dom"
import { ProjectImages } from "../../assets/ProjectImages"

interface AttractionType {
  id: string
  name: string
  slug: string
  destinationId: string
  ufiDetails: {
    url: {
      country: string
    }
    bCityName: string
  }
  primaryPhoto: {
    small: string
  }
  reviewsStats: {
    combinedNumericStats: {
      average: number
    }
    allReviewsCount: number
  }
  representativePrice: {
    chargeAmount: number
  }
}

interface SearchAreaDataProps {
  selectDate: any 
  destinationName: string
}

function TourPackagePage() {
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null)
  const [searchedDestination, setSearchedDestination] = useState<string>("") 
  const [mergedAttractions, setMergedAttractions] = useState<AttractionType[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedRating, setSelectedRating] = useState<number[]>([]) 
  const [selectedPrice, setSelectedPrice] = useState<number[]>([]) 
  const [selectedDate, setSelectedDate] = useState<any[]>([]) 
  const [isSearchArea, setSearchArea] = useState(false);
  const [sortBy, setSortBy] = useState<string>("trending")
  const ethPrice = 1765; 

  const location = useLocation()
  const searchingData = location.state as { formattedData?: SearchAreaDataProps } | string | null || null;

  useEffect(() => {
    let initialDest: string | null = null;
    let initialDate: any[] = [];

    if (typeof searchingData === 'string') {
        initialDest = searchingData;
    } else if (searchingData?.formattedData) {
        initialDest = searchingData.formattedData.destinationName || null;
        initialDate = searchingData.formattedData.selectDate || [];
    }
    setSelectedDestination(initialDest);
    setSelectedDate(initialDate);

  }, [searchingData]); 

  function handleSortChange(value: string) {
    setSortBy(value);
    setCurrentPage(1); 
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchedDestination(e.target.value)
    setSearchArea(false); 
  }

  function searchAreaData(values: SearchAreaDataProps) {
    setSearchArea(true) 
    setSelectedDate(values.selectDate || []);

    if(values.destinationName.trim() !== "")
    setSelectedDestination(values.destinationName || null);
    
    setSearchedDestination(""); 
    setCurrentPage(1); 
    setMergedAttractions([]); 
  }

  function handleSelectedPrice(value: number[]) {
    setSelectedPrice(value);
    setCurrentPage(1); 
  }

  function handleDestinationData(data: string | null) {
    setSelectedDestination(data || null) 
    setSearchedDestination(data || "") 
    setCurrentPage(1) 
    setSelectedDate([]) 
    setMergedAttractions([]) 
  }

  function handleRatingData(value: number[]) {
    setSelectedRating(value);
    setCurrentPage(1);
  }

   function handlePageChange(value: number) {
    const newPage = currentPage + value;
    if (newPage > 0) { 
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" }); 
    }
   }

  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "smooth" })
  // }, [currentPage])



  // if a destination is selected
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
  // checking id
  const failedToFindDestinationId = selectedDestination !== null && isSuccessDestination && !destinationId;


  // destinationId and selectedDate
  const {
    data: searchedTours,
    isLoading: isLoadingSearched,
    isFetching: isFetchingSearched,
    isSuccess: isSuccessSearched,
    isError: isErrorSearched
  } = useGetSearchedToursQuery(
    { destinationId, selectedDate, currentPage, sortBy },
    {
      skip: !destinationId || !isSuccessDestination || selectedDate.length !== 2,
    },
  );

  //destinationId, runs if no date range
  const {
    data: attractionData,
    isLoading: isLoadingAttraction,
    isFetching: isFetchingAttraction,
    isSuccess: isSuccessAttraction,
    isError: isErrorAttraction
  } = useGetAttractionQuery(
    { destinationId, currentPage, sortBy },
    {
      skip: !destinationId || !isSuccessDestination || selectedDate.length > 0,
    },
  );

  //trending tours if nonw
  const {
    data: trendingDestination,
    isLoading: isLoadingTrending,
    isFetching: isFetchingTrending,
    isSuccess: isSuccessTrending,
    isError: isErrorTrending
  } = useGetTrendingToursQuery(
    { currentPage, sortBy },
    {
      skip: !!selectedDestination || selectedDate.length === 2,
    },
  );


  useEffect(() => {
    if (selectedDestination && destinationId && selectedDate.length === 2 && isSuccessSearched && searchedTours?.data?.products) {
      setMergedAttractions(searchedTours.data.products);
      return;
    }
    if (selectedDestination && destinationId && selectedDate.length === 0 && isSuccessAttraction && attractionData?.data?.products) {
      setMergedAttractions(attractionData.data.products);
      return;
    }
    if (!selectedDestination && selectedDate.length !== 2 && isSuccessTrending && trendingDestination?.data?.products) {
      setMergedAttractions(trendingDestination.data.products);
      return;
    }
     if(!isFetchingDestination && !isFetchingAttraction && !isFetchingSearched && !isFetchingTrending){
        setMergedAttractions([]);
     }

  }, [
      selectedDestination, selectedDate, destinationId, 
      searchedTours, isSuccessSearched, isFetchingSearched, 
      attractionData, isSuccessAttraction, isFetchingAttraction, 
      trendingDestination, isSuccessTrending, isFetchingTrending, 
      isSuccessDestination, isFetchingDestination 
    ]);

  let displayedAttractions = [...mergedAttractions];

  
  //rating filter
  // if (selectedRating.length > 0) {
  //   selectedRating.sort((a, b) => a - b); 
  //   const minRating = selectedRating[0];
  //   const maxRating = selectedRating[selectedRating.length - 1];
  //   displayedAttractions = displayedAttractions.filter(
  //     (item) =>
  //       item?.reviewsStats?.combinedNumericStats?.average >= minRating &&
  //       item?.reviewsStats?.combinedNumericStats?.average <= maxRating,
  //   );
  // }



  if (selectedRating.length > 0) {
    displayedAttractions = displayedAttractions.filter((item) => {
      const averageRating = item?.reviewsStats?.combinedNumericStats?.average;
      if (typeof averageRating !== 'number') return false;
  
      return selectedRating.some((selected) => {
        if (selected === 5) {
          return averageRating === 5;
        }
        return averageRating >= selected && averageRating < selected + 1;
      });
    });
  }

  



  //price filter
  if (selectedPrice?.length === 2 && ethPrice != undefined) { 
    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];
    displayedAttractions = displayedAttractions.filter(
      (item) => {
        const usdPrice = item?.representativePrice?.chargeAmount;
        if (typeof usdPrice !== 'number') return false; 
        const itemEthPrice = usdPrice / ethPrice;
        return itemEthPrice >= minPrice && itemEthPrice <= maxPrice;
      }
    );
  }


   const isOverallLoading =
    (selectedDestination && (isLoadingDestination || isFetchingDestination)) ||
    (selectedDestination && destinationId && selectedDate.length === 2 && (isLoadingSearched || isFetchingSearched)) ||
    (selectedDestination && destinationId && selectedDate.length === 0 && (isLoadingAttraction || isFetchingAttraction)) ||
    (!selectedDestination && selectedDate.length !== 2 && (isLoadingTrending || isFetchingTrending));

  // error
  const hasError =
     (selectedDestination && isErrorDestination) ||
     (selectedDestination && destinationId && selectedDate.length === 2 && isErrorSearched) ||
     (selectedDestination && destinationId && selectedDate.length === 0 && isErrorAttraction) ||
     (!selectedDestination && selectedDate.length !== 2 && isErrorTrending);

  const showShimmer = isOverallLoading;
  const showError = !isOverallLoading && hasError;
  const showNoResults = !isOverallLoading && !hasError && (failedToFindDestinationId || displayedAttractions.length === 0);
  const showResults = !isOverallLoading && !hasError && !showNoResults && displayedAttractions.length > 0;

 // inital search values
 const initialSearchValues = {
    destinationName: (typeof searchingData === 'object' && searchingData?.formattedData?.destinationName) || (typeof searchingData === 'string' ? searchingData : "") || "",
    selectDate: (typeof searchingData === 'object' && searchingData?.formattedData?.selectDate) || null,
 };

  return (
    <>
      <PageBanner
        headingText="Tour Package"
        normalText="Home /"
        coloredText="Tour Package"
        bannerImage={ProjectImages.TOURPAGE_BANNER}
      />
      <SearchArea
        searchAreaData={searchAreaData}
        initialSearchValues={initialSearchValues}
        isSearchArea={isSearchArea} 
      />

      <div className={CLASSNAMES.FILTER_DISPLAY}>
        <div className={CLASSNAMES.FILTER_CONTAINER}>
          <div className="tour-filter-types">
             <div className="search-destination-wrapper">
               <h3>Search</h3>
               <div className="search-input-with-icon">
                 <input
                   type="text"
                   value={searchedDestination}
                   onChange={handleChange} 
                   placeholder="Search Destination..."
                 />
                 <i className="fa fa-search search-icon" onClick={() => handleDestinationData(searchedDestination)} />
               </div>
             </div>
          </div>

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

        <div className={CLASSNAMES.TOURS_WRAPPER}>
          <div className="sorting-container">
            <label htmlFor="tour-sort">Sort by: </label>
            <select
              id="tour-sort"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="sort-select"
            >
              <option value="trending">Trending</option>
              <option value="lowest_price">Lowest Price</option>
            </select>
          </div>

          <div className={CLASSNAMES.TOURS_CONTAINER}>
            {showShimmer ? (
              Array.from({ length: 9 }).map((_, i) => <TourCardSkeleton key={`skeleton-${i}`} />)
            ) : showError ? (
               <div className="error-message" style={{textAlign: 'center', padding: '40px', gridColumn: '1 / -1'}}>
                   <p>Sorry, an error occurred while fetching tours.</p>
               </div>
            ): showResults ? (
              displayedAttractions.map((item: AttractionType) => {
                const countryName = item?.ufiDetails?.url?.country?.toUpperCase() || "N/A"
                const cityName = item?.ufiDetails?.bCityName || "N/A"
                const tourName = item?.name || "N/A"
                const tourImage = item?.primaryPhoto?.small 
                const tourRating = item?.reviewsStats?.combinedNumericStats?.average?.toString() || "N/A"
                const tourReview = item?.reviewsStats?.allReviewsCount?.toString() || "0"
                const usdPrice = item?.representativePrice?.chargeAmount
                const tourPrice = (ethPrice && typeof usdPrice === 'number') ? `${(usdPrice / ethPrice).toFixed(5)} ETH` : "N/A"
                const slugValue = item?.slug || item.id?.toString() || `tour-${Math.random()}` 
                const uniqueKey = `${item.destinationId || 'dest'}-${slugValue}`;

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
                )
              })
            ) : (
              <div className="no-tours-found">
                <p>No tours found</p>
                {failedToFindDestinationId && <p>(No destination found)</p>}
              </div>
            )}
          </div>
        </div>
      </div> 

       {showResults && displayedAttractions.length > 0 && ( 
            <div className="page-navigation-container">
                <div className="pages-navigation">
                <span
                    className={`page-number-container ${currentPage === 1 ? 'disabled' : ''}`} 
                    onClick={() => {
                         if(currentPage > 1) handlePageChange(-1); 
                    }}
                    style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }} 
                >
                    <i className="fa-solid fa-chevron-left" />
                </span>{" "}
                <span
                    className="page-number-container colored-page-number"
                >
                    {currentPage}
                </span>
                <span
                    className="page-number-container" 
                    onClick={() => {
                         handlePageChange(1);
                    }}
                    style={{ cursor: 'pointer' }} 
                >
                    <i className="fa-solid fa-chevron-right" />
                </span>{" "}
                </div>
            </div>
       )}
    </>
  )
}

export default TourPackagePage;

