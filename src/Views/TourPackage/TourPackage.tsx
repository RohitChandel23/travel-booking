import "./TourPackage.css";
import { useState, useEffect } from "react";
import { CLASSNAMES } from "./Shared/Constants";
import PageBanner from "../Shared/PageBanner";
import SearchArea from "../Shared/SearchArea";
import FilterByDestination from "./Filter/FilterByDestination";
import FilterByReviews from "./Filter/FilterByReviews/index";
import FilterByPrice from "./Filter/FilterByPrice/index";
import TourCard from "../TourCard";
import {
  useGetTrendingToursQuery,
  useGetFilteredDestinationToursQuery,
  useGetAttractionQuery,
  useGetSearchedToursQuery
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

function TourPackagePage() {
  const [selectedDestination, setSelectedDestination] = useState<string[]>([]);
  const [currentDestinationIndex, setCurrentDestinationIndex] = useState(0);
  let [mergedAttractions, setMergedAttractions] = useState<AttractionType[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedRating, setSelectedRating] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [selectedDate, setSelectedDate] = useState([]);


//handle dates
function searchAreaData(values){
    setSelectedDate(values.selectDate);
    setSelectedDestination([values.destinationName]);
    // console.log("yo got the dsetination is :",selectedDestination, " or date is ", selectedDate);
  }

//managing selected Price
  function handleSelectedPrice(value){
    setSelectedPrice(value);
  }

  function handleDestinationData(data: string[]) {
    setCurrentDestinationIndex(0);
    setMergedAttractions([]);
    setSelectedDestination(data || []);
  }



  
  //filtered destination id
  console.log("destination to search",selectedDestination.length)

  const { data: filteredDestination } = useGetFilteredDestinationToursQuery(
    selectedDestination[currentDestinationIndex] || "",
    {
      skip:
        !selectedDestination.length ||
        currentDestinationIndex >= selectedDestination.length,
    }
  );
  //getting destinatin id
  const destinationId = filteredDestination?.data?.products?.[0]?.id;
  console.log("destination id is", destinationId);

  //fetching data for destination with date and the destination id
  const { data: searchedTours } = useGetSearchedToursQuery({destinationId, selectedDate},
    {
      skip: destinationId || selectedDate.length > 0,
    }
  )
  console.log("tours data",searchedTours)

  //fetching data for the destination specific
  const { data: attractionData } = useGetAttractionQuery(
    destinationId || undefined,
    {
      skip: !destinationId || selectedDate.length >0,
    }
  );

    //trending tour data
    const { data: trendingDestination } = useGetTrendingToursQuery("", {
      skip: selectedDestination.length > 0 || selectedDate.length >0,
    });

  useEffect(() => {
    setCurrentPage(1);
    if (selectedDestination.length === 0) {
      // Show trending destinations when nothing is selected
      const trendingAttractions = trendingDestination?.data?.products || [];
      setMergedAttractions(trendingAttractions);
      return;
    }

    if (attractionData?.data?.products) {
      setMergedAttractions((prev) => {
        const newAttractions = [...prev];
        const currentAttractions = attractionData.data.products.map(
          (attraction: AttractionType) => ({
            ...attraction,
            destinationId: selectedDestination[currentDestinationIndex],
          })
        );

        currentAttractions.forEach((attraction: AttractionType) => {
          if (
            !newAttractions.some((existing) => existing.id === attraction.id)
          ) {
            newAttractions.push(attraction);
          }
        });

        if (currentDestinationIndex < selectedDestination.length - 1) {
          setCurrentDestinationIndex((prev) => prev + 1);
        }

        // return newAttractions.slice(currentPage * 9 - 9, currentPage * 9);
        return newAttractions;
      });
    }
  }, [
    selectedDestination,
    currentDestinationIndex,
    attractionData,
    trendingDestination,
  ]);

  //getting selected rating input
  function handleRatingData(value) {
    setSelectedRating(value);
  }

  //fitlering based on rating mergedAttraction
  if (selectedRating.length > 0) {
    selectedRating.sort((a, b) => a - b);

    const minRating = selectedRating[0];
    const maxRating = selectedRating[selectedRating.length - 1];
    mergedAttractions = mergedAttractions?.filter(
      (item) =>
        item?.reviewsStats?.combinedNumericStats?.average >= minRating &&
        item?.reviewsStats?.combinedNumericStats?.average <= maxRating
    );
  }

  //filtering based on price
  if(selectedPrice?.length > 0){
    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];
    
    console.log("Prices are: ",minPrice, maxPrice);

      mergedAttractions = mergedAttractions?.filter((item)=>
       Math.ceil(item?.representativePrice?.chargeAmount) <= maxPrice && 
     Math.ceil(item?.representativePrice?.chargeAmount) >= minPrice
)
  }

  const totalPages = Math.ceil(
    mergedAttractions ? mergedAttractions.length / 9 : 0
  );
  //direct switching between pages
  function handlePage(value: any) {
    setCurrentPage(value);
  }
  function handlePageChange(value: any) {
    if (value > 0 && currentPage != totalPages)
      setCurrentPage((prev) => prev + 1);
    else if (value < 0 && currentPage != 1) setCurrentPage((prev) => prev - 1);
  }

  return (
    <>
      <PageBanner
        headingText="Tour Package"
        normalText="Home /"
        coloredText="Tour Package"
      />
      <SearchArea searchAreaData={searchAreaData} />

      <div className={CLASSNAMES.FILTER_DISPLAY}>
        <div className={CLASSNAMES.FILTER_CONTAINER}>

          <div className="tour-filter-types">
            <FilterByPrice handleSelectedPrice={handleSelectedPrice}/>
          </div>

          <div className="tour-filter-types">
            <FilterByDestination handleDestinationData={handleDestinationData}/>
          </div>

          <div className="tour-filter-types">
            <FilterByReviews handleRatingData={handleRatingData} />
          </div>
        </div>

        <div className={CLASSNAMES.TOURS_CONTAINER}>
          {mergedAttractions
            .slice(currentPage * 9 - 9, currentPage * 9)
            .map((item: AttractionType) => {
              const countryName =
                item?.ufiDetails?.url?.country?.toUpperCase() || "N/A";
              const cityName = item?.ufiDetails?.bCityName || "N/A";
              const tourName = item?.name || "N/A";
              const tourImage = item?.primaryPhoto?.small || "";
              const tourRating =
                item?.reviewsStats?.combinedNumericStats?.average?.toString() ||
                "N/A";
              const tourReview =
                item?.reviewsStats?.allReviewsCount?.toString() || "0";
              const tourPrice = Math.ceil(
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
          {[...Array(totalPages)].map((_, i) => (
            <span
              key={i + 1}
              className={
                currentPage == i + 1
                  ? "page-number-container colored-page-number"
                  : "page-number-container"
              }
              onClick={() => handlePage(i + 1)}
            >
              {i + 1}
            </span>
          ))}
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
