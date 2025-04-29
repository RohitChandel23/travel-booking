import { Navigate } from "react-router-dom";
import { ROUTES_CONFIG, WILDCARD_ROUTES } from "../Shared/Constants";
import { CustomRouter } from "./RootRoutes";
import Dashboard from "../Views/HomePage";
import TourDetail from "../Views/TourDetail";
import TourPackagePage from "../Views/TourPackage/TourPackage";
import DestinationPage from "../Views/DestinationPage/DestinationPage";
import DestinationDetail from "../Views/DestinationDetail";
import ContactPage from "../Views/Contact";
import BlogPage from "../Views/BlogPage/BlogPage";
import BlogDetailPage from "../Views/BlogDetailPage/BlogDetailPage";
import BookedTours from "../Views/BookedTours";
import FavoritesPage from "../Views/FavoritesPage";
import AboutPage from "../Views/AboutPage";

// eslint-disable-next-line import/prefer-default-export
export const PRIVATE_ROUTES: Array<CustomRouter> = [
  {
    path: ROUTES_CONFIG.HOMEPAGE.path,
    element: <Dashboard />,
    title: ROUTES_CONFIG.HOMEPAGE.title,
  },
  {
    path: ROUTES_CONFIG.ABOUT.path,
    element: <AboutPage />,
    title: ROUTES_CONFIG.ABOUT.title,
  },
  {
    path: "/wishlist",
    element: "Your wishlist here",
    title: "Dashboard",
  },

  {
    path: ROUTES_CONFIG.TOURS_DETAIL.path,
    title: ROUTES_CONFIG.TOURS_DETAIL.title,
    element: <TourDetail />,
  },
  {
    path: ROUTES_CONFIG.DESTINATION_DETAIL.path,
    title: ROUTES_CONFIG.DESTINATION_DETAIL.title,
    element: <DestinationDetail />,
  },

  {
    path: ROUTES_CONFIG.CONTACT.path,
    title: ROUTES_CONFIG.CONTACT.title,
    element: <ContactPage />,
  },

  {
    path: ROUTES_CONFIG.DESTINATION.path,
    title: ROUTES_CONFIG.DESTINATION.title,
    element: <DestinationPage />,
  },
  
  {
    path: ROUTES_CONFIG.TOURS.path,
    title:ROUTES_CONFIG.TOURS.title,
    element: <TourPackagePage/>
  },
  {
    path: ROUTES_CONFIG.BLOG.path,
    title:ROUTES_CONFIG.BLOG.title,
    element:<BlogPage/>
  },

  {
    path:ROUTES_CONFIG.BLOG_DETAIL.path,
    title:ROUTES_CONFIG.BLOG_DETAIL.title,
    element:<BlogDetailPage/>
  },
  {
    path:ROUTES_CONFIG.BOOKED_TOURS.path,
    title:ROUTES_CONFIG.BOOKED_TOURS.title,
    element:<BookedTours/>
  },
  {
    path: ROUTES_CONFIG.FAVORITES_TOURS.path,
    title: ROUTES_CONFIG.FAVORITES_TOURS.title,
    element:<FavoritesPage/>
  },

  {
    path: "*",
    element: <Navigate to={WILDCARD_ROUTES.PRIVATE} />,
    title: "Rendering wildcard",
  },
];
