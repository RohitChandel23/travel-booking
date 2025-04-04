import api from '../../api';

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAttraction: build.query({
      query: (id) =>
        `attraction/searchAttractions?id=${id}&sortBy=trending&page=1&currency_code=USD&languagecode=en-us`,
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
      query: (tourId) => 
        `attraction/getAttractionReviews?id=${tourId}&page=1`
    }),

    getTrendingTours:build.query({
      query:()=>
        `attraction/searchAttractions?id=eyJwaW5uZWRQcm9kdWN0IjoiUFJqa0FWUUt4V1hwIiwidWZpIjoyMDA1MDI2NH0%3D&sortBy=trending&page=1&currency_code=USD&languagecode=en-us`
    }),

    getFilteredDestinationTours: build.query({
      query:(selectedDestination)=>
        `attraction/searchLocation?query=${selectedDestination}&languagecode=en-us`
    })
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
} = userApi;
