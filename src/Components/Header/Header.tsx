import { NavLink, useNavigate, Link } from "react-router-dom";
import "./header.css";
import { ProjectImages } from "../../assets/ProjectImages";
import { ROUTES_CONFIG } from "../../Shared/Constants";
import { useEffect, useState, useRef } from "react";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateAuthTokenRedux } from "../../Store/Common";
import { User } from "firebase/auth";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(updateAuthTokenRedux({ token: null }));
      toast.success("Logged out successfully!");
      navigate(ROUTES_CONFIG.HOMEPAGE.path);
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  const getUserInitial = () => {
    if (user?.displayName) {
      return user.displayName.charAt(0).toUpperCase();
    } else if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "?";
  };

  const openLogoutPopup = () => {
    setShowLogoutPopup(true);
  };

  const closeLogoutPopup = () => {
    setShowLogoutPopup(false);
  };

  const handleMenuLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <div className="header-section">
      <div className="left-header">
        <div className="header-logo">
          <Link to={ROUTES_CONFIG.HOMEPAGE.path}>
            <img src={ProjectImages.TRISOG_HEADER_LOGO} alt="project-logo" />
          </Link>
        </div>

        <div className="header-items">
          <NavLink
            to={ROUTES_CONFIG.HOMEPAGE.path}
            className={({ isActive }) => `link-class ${isActive ? "active-link" : ""}`}
          >
            <li>{ROUTES_CONFIG.HOMEPAGE.title}</li>
          </NavLink>
          <NavLink
            to={ROUTES_CONFIG.ABOUT.path}
            className={({ isActive }) => `link-class ${isActive ? "active-link" : ""}`}
          >
            <li>{ROUTES_CONFIG.ABOUT.title}</li>
          </NavLink>


          <NavLink
            to={ROUTES_CONFIG.TOURS.path}
            className={({ isActive }) => `link-class ${isActive ? "active-link" : ""}`}
          >
            <li>Tours</li>
          </NavLink>
          <NavLink
            to={ROUTES_CONFIG.DESTINATION.path}
            className={({ isActive }) => `link-class ${isActive ? "active-link" : ""}`}
          >
            <li>Destination</li>
          </NavLink>
          <NavLink
            to={ROUTES_CONFIG.BLOG.path}
            className={({ isActive }) => `link-class ${isActive ? "active-link" : ""}`}
          >
            <li>Blog</li>
          </NavLink>
          <NavLink
            to={ROUTES_CONFIG.CONTACT.path}
            className={({ isActive }) => `link-class ${isActive ? "active-link" : ""}`}
          >
            <li>{ROUTES_CONFIG.CONTACT.title}</li>
          </NavLink>
        </div>
      </div>

      <div className="right-header">
        {user ? (
          <div className="user-info" ref={dropdownRef}>
            <div className="user-initial" onClick={() => setMenuOpen((prev) => !prev)}>
              {getUserInitial()}
            </div>
            {menuOpen && (
              <div className="user-dropdown">
                <Link to="/profile" className="dropdown-item" onClick={handleMenuLinkClick}>Profile</Link>
                <Link to={ROUTES_CONFIG.BOOKED_TOURS.path} className="dropdown-item" onClick={handleMenuLinkClick}>Booked Tours</Link>
                <Link to={ROUTES_CONFIG.FAVORITES_TOURS.path} className="dropdown-item" onClick={handleMenuLinkClick}>Favourite Tours</Link>
              </div>
            )}
            <button className="logout-btn" onClick={openLogoutPopup}>
              <i className="fa-solid fa-sign-out-alt" /> Logout
            </button>
          </div>
        ) : (
          <div className="auth-links">
            <NavLink
              to={ROUTES_CONFIG.LOGIN.path}
              className={({ isActive }) => `auth-link ${isActive ? "active-link" : ""}`}
            >
              <i className="fa-regular fa-user" /> {ROUTES_CONFIG.LOGIN.title}
            </NavLink>
            <span className="divider">/</span>
            <NavLink
              to={ROUTES_CONFIG.REGISTER.path}
              className={({ isActive }) => `auth-link ${isActive ? "active-link" : ""}`}
            >
              {ROUTES_CONFIG.REGISTER.title}
            </NavLink>
          </div>
        )}
      </div>

      {showLogoutPopup && (
        <div className="logout-popup-wrapper" onClick={closeLogoutPopup}>
          <div className="logout-popup" onClick={(e) => e.stopPropagation()}>
            <h3>Are you sure you want to log out?</h3>
            <div className="popup-actions">
              <button className="confirm-btn" onClick={handleLogout}>Logout</button>
              <button className="cancel-btn" onClick={closeLogoutPopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
