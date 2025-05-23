import api from "../../api";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAttraction: build.query({
      query: ({destinationId, currentPage, sortBy}) =>  
        `attraction/searchAttractions?id=${destinationId}&sortBy=${sortBy}&page=${currentPage}&currency_code=USD&languagecode=en-us`,
    }),
    getTrendingAttraction: build.query({
      query: ({destinationId, currentPage}) =>  
        `attraction/searchAttractions?id=${destinationId}&sortBy=trending&page=${currentPage}&currency_code=USD&languagecode=en-us`,
    }),
    getTourDetail: build.query({
      query: (slugValue) =>
        `attraction/getAttractionDetails?slug=${slugValue}&currency_code=USD`,
    }),

    getDateAndTime: build.query({
      query: ({ slugValue, date }) =>
        `attraction/getAvailability?slug=${slugValue}&date=${date}&currency_code=USD&languagecode=en-us`,
    }),

    getTourReview: build.query({
      query: ({tourId,page}) => `attraction/getAttractionReviews?id=${tourId}&page=${page}`,
    }),

    getTrendingTours: build.query({
      query: ({currentPage, sortBy}) =>    
        `attraction/searchAttractions?id=eyJwaW5uZWRQcm9kdWN0IjoiUFJqa0FWUUt4V1hwIiwidWZpIjoyMDA1MDI2NH0%3D&sortBy=${sortBy}&page=${currentPage}&currency_code=USD&languagecode=en-us`,
    }),

    getFilteredDestinationTours: build.query({
      query: (selectedDestination) =>
        `attraction/searchLocation?query=${selectedDestination}&languagecode=en-us`,
    }),

    getSearchedTours: build.query({
      query: ({destinationId, selectedDate, currentPage, sortBy}) =>   //pagination
        `attraction/searchAttractions?id=${destinationId}%3D%3D&startDate=${selectedDate[0]}&endDate=${selectedDate[1]}&sortBy=${sortBy}&page=${currentPage}&currency_code=USD&languagecode=en-us`,
    }),
  }),
  overrideExisting: false,
});

// We can use the Lazy Query as well for GET requests depends on our Requirements.
// For POST request we will use mutations.

export const {
  useGetAttractionQuery,
  useGetTourDetailQuery,
  useGetDateAndTimeQuery,
  useGetTourReviewQuery,
  useGetTrendingToursQuery,
  useGetFilteredDestinationToursQuery,
  useGetSearchedToursQuery,
  useGetTrendingAttractionQuery,
} = userApi;
 