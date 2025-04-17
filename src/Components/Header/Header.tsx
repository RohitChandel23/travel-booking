import { NavLink, useNavigate } from "react-router-dom";
import "./header.css";
import { ProjectImages } from "../../assets/ProjectImages";
import { ROUTES_CONFIG } from "../../Shared/Constants";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
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

  return (
    <div className="header-section">
      <div className="left-header">
        <div className="header-logo">
          <img src={ProjectImages.TRISOG_HEADER_LOGO} alt="project-logo" />
        </div>
        <div className="header-items">
          <NavLink to={ROUTES_CONFIG.HOMEPAGE.path} className={({ isActive }) => `link-class ${isActive ? "active-link" : ""}`}>
            <li>{ROUTES_CONFIG.HOMEPAGE.title}</li>
          </NavLink>
          <li>About</li>
          <NavLink to={ROUTES_CONFIG.TOURS.path} className={({ isActive }) => `link-class ${isActive ? "active-link" : ""}`}>
            <li>Tours</li>
          </NavLink>
          <NavLink to={ROUTES_CONFIG.DESTINATION.path} className={({ isActive }) => `link-class ${isActive ? "active-link" : ""}`}>
            <li>Destination</li>
          </NavLink>
          <NavLink to={ROUTES_CONFIG.BLOG.path} className={({ isActive }) => `link-class ${isActive ? "active-link" : ""}`}>
            <li>Blog</li>
          </NavLink>
          <NavLink to={ROUTES_CONFIG.CONTACT.path} className={({ isActive }) => `link-class ${isActive ? "active-link" : ""}`}>
            <li>{ROUTES_CONFIG.CONTACT.title}</li>
          </NavLink>
        </div>
      </div>

      <div className="right-header">
        {user ? (
          <button className="logout-btn" onClick={handleLogout}>
            <i className="fa-solid fa-sign-out-alt" /> Logout
          </button>
        ) : (
          <div className="auth-links">
            <NavLink to={ROUTES_CONFIG.LOGIN.path} className={({ isActive }) => `auth-link ${isActive ? "active-link" : ""}`}>
              <i className="fa-regular fa-user" /> {ROUTES_CONFIG.LOGIN.title}
            </NavLink>
            <span className="divider">/</span>
            <NavLink to={ROUTES_CONFIG.REGISTER.path} className={({ isActive }) => `auth-link ${isActive ? "active-link" : ""}`}>
              {ROUTES_CONFIG.REGISTER.title}
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
