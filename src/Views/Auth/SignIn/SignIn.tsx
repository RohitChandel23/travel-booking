import './SignIn.css';
import { useNavigate } from 'react-router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ToggleBtn from '../button/ToggleBtn/ToggleBtn';
import SocialBtn from '../button/SocialButtons/SocialBtn';
import { auth, googleProvider } from '../../../firebaseConfig';
import { ROUTES_CONFIG } from '../../../Shared/Constants';
import 'react-toastify/dist/ReactToastify.css';
import AuthBannerImg from '../Shared/AuthBannerImg';
import { updateAuthTokenRedux } from '../../../Store/Common/index';
import { useDispatch } from 'react-redux';

// import { useLocation } from 'react-router-dom';

interface SignInFormValues {
  email: string;
  password: string;
}

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleSignIn = async (values: SignInFormValues) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const { user } = userCredential;

      if (!user.emailVerified) {
        await auth.signOut();
        toast.error('Please verify your email first.');
        return;
      }

      const token = await user.getIdToken();
      dispatch(updateAuthTokenRedux({ token }));
      toast.success('Login successful!');
      navigate(ROUTES_CONFIG.HOMEPAGE.path);

    } catch (error: any) {
      let errorMessage = 'An error occurred. Please try again.';
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = 'Invalid email or password.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many attempts. Please try again later.';
          break;
        default:
          errorMessage = error.message || errorMessage;
      }
      toast.error(errorMessage);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { user } = result;

      // Google accounts verification
      if (!user.emailVerified) {
        await auth.signOut();
        toast.error('Please verify your email first.');
        return;
      }

      const token = await user.getIdToken();
      dispatch(updateAuthTokenRedux({ token }));
      toast.success('Login successful!');
      navigate(ROUTES_CONFIG.HOMEPAGE.path);

    } catch (error: any) {
      toast.error(error.message || 'Google login failed.');
    }
  };

  return (
    <>
      <AuthBannerImg />
      <div className='signIn-wrapper'>
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
              email: '',
              password: '',
            }}
            validationSchema={Yup.object({
              email: Yup.string().email('Invalid email').required('Required'),
              password: Yup.string().required('Required'),
            })}
            onSubmit={handleSignIn}
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
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="txt-box"
                />
                <ErrorMessage name="password" component="div" className="error" />
              </div>

              <button type="submit" className="submit-btn">
                Submit
              </button>
            </Form>
          </Formik>
        </div>

            <div className='forgot-text'>
        <Link to="/reset-password">Forgot Your Password?</Link>
        </div>
        <div className="social-auth">
          <SocialBtn name="Google" handleClick={handleGoogleLogin} />
          <SocialBtn name="Facebook" handleClick={() => console.log('Facebook')} />
          <SocialBtn name="Twitter" handleClick={() => console.log('Twitter')} />
        </div>
      </div>
      </div>
    </>
  );
}

export default SignIn;