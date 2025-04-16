import { Link, useNavigate } from "react-router-dom";
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

  // Handle logout
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
          <Link to={ROUTES_CONFIG.HOMEPAGE.path} className="link-class">
            <li>{ROUTES_CONFIG.HOMEPAGE.title}</li>
          </Link>
          <li>About</li>
          <Link to={ROUTES_CONFIG.TOURS.path} className="link-class">
            <li>Tours</li>
          </Link>
          <Link to={ROUTES_CONFIG.DESTINATION.path} className="link-class">
            <li>Destination</li>
          </Link>
          <Link to={ROUTES_CONFIG.BLOG.path} className="link-class">
            <li>Blog</li>
          </Link>
          <Link to={ROUTES_CONFIG.CONTACT.path} className="link-class">
            <li>{ROUTES_CONFIG.CONTACT.title}</li>
          </Link>
        </div>
      </div>
      <div className="right-header">
        {user ? (
          <button className="logout-btn" onClick={handleLogout}>
            <i className="fa-solid fa-sign-out-alt" /> Logout
          </button>
        ) : (
          <p>
            <Link to={ROUTES_CONFIG.LOGIN.path} className="link-class">
              <i className="fa-regular fa-user" /> {ROUTES_CONFIG.LOGIN.title}
            </Link>{" "}
            /{" "}
            <Link to={ROUTES_CONFIG.REGISTER.path} className="link-class">
              {ROUTES_CONFIG.REGISTER.title}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default Header;
