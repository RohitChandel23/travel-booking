import { Navigate } from 'react-router-dom';
import { ROUTES_CONFIG, WILDCARD_ROUTES } from '../Shared/Constants';
import Dashboard from '../Views/HomePage/index';
import { CustomRouter } from './RootRoutes';
import { default as Login } from '../Views/Auth/SignIn/SignIn';
import { default as Register } from '../Views/Auth/SignUp/index';
import ForgotPassword from '../Views/Auth/forgot-password';
import ContactPage from '../Views/Contact/Contact';
import AboutPage from '../Views/AboutPage';
import EmailVerification from '../Views/Auth/EmailVerification/EmailVerification';

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
    path: ROUTES_CONFIG.CONTACT.path,
    title: ROUTES_CONFIG.CONTACT.title,
    element: <ContactPage />,
  },
  {
    path:ROUTES_CONFIG.EMAIL_VERIFICATION.path,
    title: ROUTES_CONFIG.EMAIL_VERIFICATION.title,
    element:<EmailVerification/>
  },

  {
    path: '*',
    element: <Navigate to={WILDCARD_ROUTES.PUBLIC} />,
    title: 'Rendering wildcard',
  },
];
