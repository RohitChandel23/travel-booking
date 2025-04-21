// import { ProjectImages } from "../../assets/ProjectImages";
// import HomepageDestination from "./Shared/HomepageDestination/HomepageDestination";
// import WhyUsComponent from "../WhyUsComponent/index";
// import SearchArea from "../../Shared/SearchArea";
// import Testimonial from "../../Shared/Testimonial";
// import "./HomePage.css";
// import TourSlider from "../../Shared/TourSlider";
// import { useEffect } from "react";
// import TourCategoryCard from "./Shared/TourCategoryCard/TourCategoryCard";

// export default function Dashboard() {
//   const TourCategoryData = [
//     { categoryIcon: ProjectImages.ADVENTURE, tourType: "Adventure", numberOfTours: 10, startingPrice: 250, },
//     {
//       categoryIcon: ProjectImages.HIKING_TOURS,
//       tourType: "Beaches",
//       numberOfTours: 15,
//       startingPrice: 200,
//     },
//     {
//       categoryIcon: ProjectImages.FOOD_TOURS,
//       tourType: "Boat Tours",
//       numberOfTours: 10,
//       startingPrice: 250,
//     },
//     {
//       categoryIcon: ProjectImages.BOAT_TOURS,
//       tourType: "City Tours",
//       numberOfTours: 20,
//       startingPrice: 200,
//     },
//     {
//       categoryIcon: ProjectImages.BEACHES,
//       tourType: "Food",
//       numberOfTours: 25,
//       startingPrice: 350,
//     },
//     {
//       categoryIcon: ProjectImages.CITY_TOURS,
//       tourType: "Hiking",
//       numberOfTours: 20,
//       startingPrice: 300,
//     },
//   ];

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div>
//       <div className="homepage-banner">
//         <img src={ProjectImages.HomePageBanner} alt="home-page-banner" />
//         <div className="banner-text-container">
//           <div className="banner-text-content">
//             <h3 className="kaushan-text">Save 15% off in Worldwide</h3>
//             <h1 className="">Travel & Adventures</h1>
//             <p className="project-normal-font">
//               Find awesome hotel, tour, car and activities in London
//             </p>
//           </div>
//         </div>
//       </div>

//       <SearchArea searchAreaData={() => { }} />

//       <div className="tour-container">
//         <div className="section-headers">
//           <h4 className="kaushan-text cursive-normal">Tours</h4>
//           <h2 className="section-heading">Most Popular Tours</h2>
//         </div>
//         <div className="tour-content-container">
//           <div className="tour-content">
//             <TourSlider />
//           </div>
//         </div>
//       </div>

//       <HomepageDestination />

//       {/* why us section */}
//       <WhyUsComponent />

//       <div className="browse-by-category-wrapper">
//         <h4 className="cursive-text">Browse By Category</h4>
//         <h2>Pick a Tour Type</h2>
//         <div className="browse-by-category">
//           {TourCategoryData.map((value) => (
//             <TourCategoryCard
//               categoryIcon={value.categoryIcon}
//               tourType={value.tourType}
//               numberOfTours={value.numberOfTours}
//               startingPrice={value.startingPrice}
//             />
//           ))}
//         </div>
//       </div>

//       <div className="testimonial-section">
//         <Testimonial />
//       </div>
//     </div>
//   );
// }





import { ProjectImages } from "../../assets/ProjectImages";
import HomepageDestination from "./Shared/HomepageDestination/HomepageDestination";
import WhyUsComponent from "../WhyUsComponent/index";
import SearchArea from "../../Shared/SearchArea";
import Testimonial from "../../Shared/Testimonial";
import "./HomePage.css";
import TourSlider from "../../Shared/TourSlider";
import { useEffect } from "react";
import TourCategoryCard from "./Shared/TourCategoryCard/TourCategoryCard";

export default function Dashboard() {
  const TourCategoryData = [
    { categoryIcon: ProjectImages.ADVENTURE, tourType: "Adventure", numberOfTours: 10, startingPrice: 250, },
    {
      categoryIcon: ProjectImages.HIKING_TOURS,
      tourType: "Beaches",
      numberOfTours: 15,
      startingPrice: 200,
    },
    {
      categoryIcon: ProjectImages.FOOD_TOURS,
      tourType: "Boat Tours",
      numberOfTours: 10,
      startingPrice: 250,
    },
    {
      categoryIcon: ProjectImages.BOAT_TOURS,
      tourType: "City Tours",
      numberOfTours: 20,
      startingPrice: 200,
    },
    {
      categoryIcon: ProjectImages.BEACHES,
      tourType: "Food",
      numberOfTours: 25,
      startingPrice: 350,
    },
    {
      categoryIcon: ProjectImages.CITY_TOURS,
      tourType: "Hiking",
      numberOfTours: 20,
      startingPrice: 300,
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="homepage-banner">
        <img src={ProjectImages.HomePageBanner} alt="home-page-banner" />
        <div className="banner-text-container">
          <div className="banner-text-content">
            <h3 className="kaushan-text">Save 15% off in Worldwide</h3>
            <h1 className="">Travel & Adventures</h1>
            <p className="project-normal-font">
              Find awesome hotel, tour, car and activities in London
            </p>
          </div>
        </div>
      </div>

      <SearchArea searchAreaData={() => { }} />

      <div className="tour-container">
        <div className="section-headers">
          <h4 className="kaushan-text cursive-normal">Tours</h4>
          <h2 className="section-heading">Most Popular Tours</h2>
        </div>
        <div className="tour-content-container">
          <div className="tour-content">
            <TourSlider />
          </div>
        </div>
      </div>

      <HomepageDestination />

      {/* why us section */}
      <WhyUsComponent />

      <div className="browse-by-category-wrapper">
        <h4 className="cursive-text">Browse By Category</h4>
        <h2>Pick a Tour Type</h2>
        <div className="browse-by-category">
          {TourCategoryData.map((value) => (
            <TourCategoryCard
              categoryIcon={value.categoryIcon}
              tourType={value.tourType}
              numberOfTours={value.numberOfTours}
              startingPrice={value.startingPrice}
            />
          ))}
        </div>
      </div>

      <div className="testimonial-section">
        <Testimonial />
      </div>

      <div className="travel-guide-wrapper">

      </div>

    </div>
  );
}
