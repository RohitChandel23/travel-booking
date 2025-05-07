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
import { updateAuthTokenRedux } from '../../../Store/Common/index';
import { useDispatch } from 'react-redux';
import PageBanner from '../../../Shared/PageBanner';
import { ProjectImages } from '../../../assets/ProjectImages';
import {useState} from 'react';

interface SignInFormValues {
  email: string;
  password: string;
}

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  
  const handleSignIn = async (values: SignInFormValues) => {
    setIsSubmitting(true);
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

    } catch{
      let errorMessage = 'Invalid email or username'
      toast.error(errorMessage);
      }
  
    finally{
    setIsSubmitting(false);
  }

  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { user } = result;


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
    finally{
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageBanner
              headingText="Authentication"
              normalText="Home /"
              coloredText="login-in"
              bannerImage={ProjectImages.AUTH_BANNER}
            />

      <div className='signIn-wrapper'>
      <div className="signIn-div">
        <div className="auth-buttons">
          <ToggleBtn
            name="Sign Up"
            handleClick={() => navigate(`${ROUTES_CONFIG.REGISTER.path}`)}
          />
          <ToggleBtn
            name="Log In"
            handleClick={() => navigate(`${ROUTES_CONFIG.LOGIN.path}`)}
          />
        </div>

        <div className="signIn-form signIn-form-shadow">
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

              <button type="submit" className="submit-btn button-hovering-color" disabled={isSubmitting}>
                Sign In
              </button>
            </Form>
          </Formik>
        </div>

            <div className='forgot-text'>
        <Link to="/reset-password">Forgot Your Password?</Link>
        </div>

        <div className="social-auth">
          <button onClick={handleGoogleLogin} disabled={isSubmitting}>Google</button>
          <SocialBtn name="Facebook" handleClick={() => console.log('Facebook')}/>
          <SocialBtn name="Twitter" handleClick={() => console.log('Twitter')}/>
        </div>
      </div>
      </div>
    </>
  );
}

export default SignIn;