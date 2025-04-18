import { NavLink, useNavigate } from "react-router-dom";
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
import { Link } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Close menu on outside click
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
                <Link to="/profile" className="dropdown-item">Profile</Link>
                <Link to="/booked-tours" className="dropdown-item">Booked Tours</Link>
                <Link to="/favourite-tours" className="dropdown-item">Favourite Tours</Link>
              </div>
            )}
            <button className="logout-btn" onClick={handleLogout}>
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
    </div>
  );
}

export default Header;
