import "./Signup.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import ToggleBtn from "../button/ToggleBtn/ToggleBtn";
import SocialBtn from "../button/SocialButtons/SocialBtn";
import AuthBannerImg from "../Shared/AuthBannerImg";
import { ROUTES_CONFIG } from "../../../Shared/Constants";
import { auth, db, googleProvider } from "../../../firebaseConfig";

interface SignUpFormValues {
  email: string;
  phoneNumber: string;
  password: string;
  "confirm-password": string;
}

function Signup() {
  const navigate = useNavigate();

  const handleSignup = async (values: SignUpFormValues) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const { user } = userCredential;

      // email verification
      await sendEmailVerification(user);

      await setDoc(doc(db, "users", user.uid), {
        email: values.email,
        phoneNumber: values.phoneNumber,
      });

      // Sign out to prevent auto-login
      await signOut(auth);

      toast.success("Signed up successfully! Please verify your email.");

      // Navigate to login page
      navigate(ROUTES_CONFIG.LOGIN.path);
    } catch (error: any) {
      const errorMessage =
        error.code === "auth/email-already-in-use"
          ? "Email already in use."
          : error.message || "Signup failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { user } = result;

      // Check if user already exists in Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // If new user save to Firestore
        await setDoc(userRef, {
          email: user.email,
          name: user.displayName,
          createdAt: new Date(),
        });
      }

      // Google account verification
      if (!user.emailVerified) {
        await sendEmailVerification(user);
        await signOut(auth);
        toast.success("Google signup successful! Please verify your email.");
        navigate(ROUTES_CONFIG.LOGIN.path);
      } else {
        toast.success("Google signup successful!");
        navigate(ROUTES_CONFIG.HOMEPAGE.path);
      }
    } catch (error: any) {
      toast.error(error.message || "Google signup failed.");
    }
  };

  return (
    <>
      <AuthBannerImg />
      <div className="signup-div">
        <div className="form-container">
          <div className="auth-buttons">
            <ToggleBtn
              name="Sign Up"
              handleClick={() => navigate(`${ROUTES_CONFIG.REGISTER.path}`)}
            />
            <ToggleBtn
              name="Sign In"
              handleClick={() => navigate(`${ROUTES_CONFIG.LOGIN.path}`)}
            />
          </div>

          <div className="signup-form">
            <Formik
              initialValues={{
                email: "",
                phoneNumber: "",
                password: "",
                "confirm-password": "",
              }}
              validationSchema={Yup.object({
                email: Yup.string().required("Required"),
                phoneNumber: Yup.string()
                  .required("Required")
                  .matches(
                    /^[0-9]{10}$/,
                    "Phone number must be exactly 10 digits"
                  ),
                password: Yup.string()
                  .required("Required")
                  .min(8, "Password must be at least 8 characters")
                  .matches(/[A-Z]/, "Must contain at least one uppercase")
                  .matches(/[a-z]/, "Must contain at least one lowercase")
                  .matches(
                    /[!@#$%^&*()<>?:"{}]/,
                    "Must contain at least one special character"
                  )
                  .matches(/[0-9]/, "Must contain at least one number"),
                "confirm-password": Yup.string()
                  .required("Required")
                  .oneOf([Yup.ref("password")], "Passwords must match"),
              })}
              onSubmit={handleSignup}
            >
              <Form className="form-values">
                <div className="input-group">
                  <label htmlFor="email">Email Address</label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="txt-box"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <Field
                    name="phoneNumber"
                    type="text"
                    placeholder="Enter your phone number"
                    className="txt-box"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    className="txt-box"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="confirm-password">Confirm Password</label>
                  <Field
                    name="confirm-password"
                    type="password"
                    placeholder="Confirm your password"
                    className="txt-box"
                  />
                  <ErrorMessage
                    name="confirm-password"
                    component="div"
                    className="error"
                  />
                </div>

                <button type="submit" className="submit-btn">
                  Submit
                </button>
              </Form>
            </Formik>
          </div>

          <div className="social-auth">
            <SocialBtn name="Google" handleClick={handleGoogleSignUp} />
            <SocialBtn
              name="Facebook"
              handleClick={() => console.log("Facebook")}
            />
            <SocialBtn
              name="Twitter"
              handleClick={() => console.log("Twitter")}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
