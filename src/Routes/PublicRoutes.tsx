import { Navigate } from 'react-router-dom';
import { ROUTES_CONFIG, WILDCARD_ROUTES } from '../Shared/Constants';
import Dashboard from '../Views/HomePage/index';
import { CustomRouter } from './RootRoutes';
import { default as Login } from '../Views/Auth/SignIn/SignIn';
import { default as Register } from '../Views/Auth/SignUp/index';
import ForgotPassword from '../Views/Auth/forgot-password';
import TourDetail from '../Views/TourDetail';
import ContactPage from '../Views/Contact/Contact';
import Tour from '../Views/TourPackage/index';
import DestinationPageBanner from '../Views/DestinationPage/DestinationPage';
import DestinationDetail from '../Views/DestinationDetail';
import BlogPage from '../Views/BlogPage/BlogPage';
import BlogDetailPage from '../Views/BlogDetailPage/BlogDetailPage';
import AboutPage from '../Views/AboutPage';

// eslint-disable-next-line import/prefer-default-export
export const PUBLIC_ROUTES: Array<CustomRouter> = [
  {
    path: ROUTES_CONFIG.HOMEPAGE.path,
    element: <Dashboard />,
    title: ROUTES_CONFIG.HOMEPAGE.title,
  },

  {
    path: `${ROUTES_CONFIG.LOGIN.path}`,
    title: ROUTES_CONFIG.LOGIN.title,
    element: <Login />,
  },

  {
    path: ROUTES_CONFIG.REGISTER.path,
    title: ROUTES_CONFIG.REGISTER.title,
    element: <Register />,
  },

  {
    path: ROUTES_CONFIG.RESET_PASSWORD.path,
    title: ROUTES_CONFIG.RESET_PASSWORD.title,
    element: <ForgotPassword />,
  },
  {
    path: ROUTES_CONFIG.ABOUT.path,
    title: ROUTES_CONFIG.ABOUT.title,
    element: <AboutPage />,
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
    element: <DestinationPageBanner />,
  },
  
  {
    path: ROUTES_CONFIG.TOURS.path,
    title:ROUTES_CONFIG.TOURS.title,
    element: <Tour/>
  },
  {
    path: ROUTES_CONFIG.BLOG.path,
    title:ROUTES_CONFIG.BLOG.title,
    element:<BlogPage/>
  },

  {
    path:ROUTES_CONFIG.BLOG_DETAIL.path,
    title:ROUTES_CONFIG.BLOG_DETAIL.path,
    element:<BlogDetailPage/>
  },

  {
    path: '*',
    element: <Navigate to={WILDCARD_ROUTES.PUBLIC} />,
    title: 'Rendering wildcard',
  },
];
