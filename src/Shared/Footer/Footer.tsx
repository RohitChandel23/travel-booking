import "./footer.css";
import { ProjectImages } from "../../assets/ProjectImages";
import { Link } from "react-router-dom";
import { ROUTES_CONFIG } from "../../Shared/Constants";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { toast } from "react-toastify";

function Footer() {
  const [email, setEmail] = useState<string>("");
  const destinationColOne = ["Las Vegas", "New York", "Hawaii", "Paris"];
  const destinationColTwo = ["Barcelona", "Milan", "Tokyo", "Milan"];

  async function handleSubmission(e: React.FormEvent) {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address");
      return;
    }
    try {
      await addDoc(collection(db, "newsletter"), {
        email: email,
      });
      toast.success("Signed up successfully for newsletter");
      setEmail("");
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  }

  return (
    <div className="footer-container">
      <div className="footer-section">
        <div className="left-footer">
          <Link to={ROUTES_CONFIG.HOMEPAGE.path}>
            <img src={ProjectImages.TRISOG_LOGO} alt="trisog-logo" />
          </Link>
          <li className="footer-cursive">Need any help?</li>
          <h6>Call Us: (888)12345678</h6>
          <p>
            Chandigarh, India <br />
            example@trisog.com
          </p>
        </div>

        <div className="mid-footer">
          <div className="company">
            <ul>
              <li className="footer-cursive">Company</li>
              <Link to={ROUTES_CONFIG.ABOUT.path} className="link-class">
                <li>About us</li>
              </Link>
              <Link to={ROUTES_CONFIG.CONTACT.path} className="link-class">
                <li>Contact us</li>
              </Link>
              <li>Travel Guide</li>
              <li>Data Policy</li>
            </ul>
          </div>

          <div className="top-destination">
            <ul>
              <li className="footer-cursive">Top Destination</li>
              {destinationColOne.map((destinationName) => (
                <Link
                  to={ROUTES_CONFIG.TOURS.path}
                  state={destinationName}
                  className="link-class"
                >
                  <li key={destinationName}>{destinationName}</li>{" "}
                </Link>
              ))}
            </ul>
          </div>

          <div className="top-destination">
            <ul>
              <li className="footer-cursive">
                <br />
              </li>
              {destinationColTwo.map((destinationName) => (
                <Link
                  to={ROUTES_CONFIG.TOURS.path}
                  state={destinationName}
                  className="link-class"
                >
                  {" "}
                  <li key={destinationName}>{destinationName}</li>{" "}
                </Link>
              ))}
            </ul>
          </div>
        </div>

        <div className="right-footer">
          <li className="footer-cursive">Sign up Newsletter</li>
          <form onSubmit={handleSubmission}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <button type="submit" className="button-hovering-color">
              Submit
            </button>
          </form>
          <br />
          <p>© 2025 Trisog All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
