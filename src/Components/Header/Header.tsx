import { Link } from 'react-router-dom';
import './header.css';
import { ProjectImages } from '../../assets/ProjectImages';
import { ROUTES_CONFIG } from '../../Shared/Constants';

function Header() {
  return (
    <div className="header-section">
      <div className="left-header">
        <div className="header-logo">
          <img src={ProjectImages.TRISOG_HEADER_LOGO} alt='project-logo'/>
        </div>
        <div className="header-items">
          <Link to={ROUTES_CONFIG.HOMEPAGE.path} className="link-class">
            <li>{ROUTES_CONFIG.HOMEPAGE.title}</li>
          </Link>
          <li>About</li>
          <Link to={ROUTES_CONFIG.TOURS.path} className='link-class'>
          <li>Tours</li>
          </Link>
          <li>Destination</li>
          <li>Blog</li>
          <li>Pages</li>
          <Link to={ROUTES_CONFIG.CONTACT.path} className="link-class">
            <li>{ROUTES_CONFIG.CONTACT.title}</li>
          </Link>
        </div>
      </div>
      <div className="right-header">
        <i className="fa-solid fa-magnifying-glass" />
        <p>
          <Link to={ROUTES_CONFIG.LOGIN.path} className="link-class">
            {' '}
            <i className="fa-regular fa-user" /> {ROUTES_CONFIG.LOGIN.title}
          </Link>{' '}
          /{' '}
          <Link to={ROUTES_CONFIG.REGISTER.path} className="link-class">
            {ROUTES_CONFIG.REGISTER.title}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Header;
