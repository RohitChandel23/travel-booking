import "./SignIn.css";
import { useNavigate } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ToggleBtn from "../button/ToggleBtn/ToggleBtn";
import SocialBtn from "../button/SocialButtons/SocialBtn";
import { auth, googleProvider } from "../../../firebaseConfig";
import { ROUTES_CONFIG } from "../../../Shared/Constants";
import "react-toastify/dist/ReactToastify.css";
import AuthBannerImg from "../Shared/AuthBannerImg";
import { updateAuthTokenRedux } from "../../../Store/Common/index";
import { useDispatch } from "react-redux";

interface SignInFormValues {
  email: string;
  password: string;
}

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = async (values: SignInFormValues) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast.success("Login Successful");

      const user = auth?.currentUser;
      if (user) {
        console.log("user", user);

        const token = await user?.getIdToken();
        console.log(token);
        dispatch(updateAuthTokenRedux({ token }));
      }
      navigate(ROUTES_CONFIG.HOMEPAGE.path);
    } catch (e) {
      toast.error("Login Error Try again");
      console.log("error is: ", e);
    }
  };

  async function handleGoogleLogin() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("User Info after google login:", result.user); // Logged-in user info
      const token = result?.user?.accessToken;
      dispatch(updateAuthTokenRedux({ token }));
      navigate(ROUTES_CONFIG.HOMEPAGE.path);

      toast.success("Login Successful");
    } catch (error) {
      toast.error((error as Error).message || "Something went wrong");
    }
  }

  return (
    <>
      <AuthBannerImg />

      <div className="signIn-div">
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

        <div className="signIn-form">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string().required("Required"),

              password: Yup.string().required("Required"),
            })}
            onSubmit={handleSignIn}
          >
            <Form className="form-values">
              <label htmlFor="email">Email Address</label>
              <Field name="email" type="email" className="txt-box" />
              <ErrorMessage name="email" />

              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="txt-box" />
              <ErrorMessage name="password" />

              <button type="submit" className="submit-btn">
                Submit
              </button>
            </Form>
          </Formik>
        </div>

        <Link to="/reset-password">Forgot Your Password ? </Link>

        <div className="social-auth">
          <SocialBtn name="Google" handleClick={handleGoogleLogin} />
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
    </>
  );
}

export default SignIn;
