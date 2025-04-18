const STRING: string = 'Test';
export { STRING };

const ROUTES = {
  HOMEPAGE: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ABOUT: '/about',
  RESET_PASSWORD: '/reset-password',
  TOURS: '/tours',
  CONTACT: '/contact',
  TOURS_DETAIL: '/tours-detail/:slugId',
  DESTINATION:'/destination',
  DESTINATION_DETAIL:'/destination-detail/:countryName',
  BLOG:'/blog',
  BLOG_DETAIL:'/blog/:id',
};

const WILDCARD_ROUTES = {
  PUBLIC: ROUTES.HOMEPAGE,
  PRIVATE: ROUTES.LOGIN,
};

const ROUTES_CONFIG = {
  HOMEPAGE: {
    path: ROUTES.HOMEPAGE,
    title: 'Home',
  },
  LOGIN: {
    path: ROUTES.LOGIN,
    title: 'Login',
  },
  REGISTER: {
    path: ROUTES.REGISTER,
    title: 'Register',
  },
  LOGOUT: {
    path: ROUTES.LOGIN,
    title: 'Logout',
  },
  DESTINATION:{
    path: ROUTES.DESTINATION,
    title: 'Destination',
  },
  ABOUT: {
    path: ROUTES.ABOUT,
    title: 'About',
  },
  RESET_PASSWORD: {
    path: ROUTES.RESET_PASSWORD,
    title: 'Reset Password',
  },
  TOURS: {
    path: ROUTES.TOURS,
    title: 'Tours',
  },
  TOURS_DETAIL: {
    path: ROUTES.TOURS_DETAIL,
    title: 'Tours Detail',
  },
  DESTINATION_DETAIL:{
    path:ROUTES.DESTINATION_DETAIL,
    title:'Destination Detail',
  },
  BLOG:{
    path:ROUTES.BLOG,
    title:'Blog',
  },
  CONTACT: {
    path: ROUTES.CONTACT,
    title: 'Contact',
  },
  BLOG_DETAIL:{
    path:ROUTES.BLOG_DETAIL,
    title:'Blog Detail',
  }
};

export { ROUTES, WILDCARD_ROUTES, ROUTES_CONFIG };
