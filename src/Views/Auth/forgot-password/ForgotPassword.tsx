import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import './forgotPassword.css';


interface emailValue {
  email: string;
}

function ForgotPassword() {
  async function handleResetPassword(values: emailValue) {
    try {
      await sendPasswordResetEmail(auth, values.email);
      toast.success('Password reset email sent successfully');
    } catch (err) {
      toast.error('An error occurred while sending the email');
    }
  }  

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h3>Reset Your Password</h3>
        <p>Enter your email to receive a password reset link</p>

        <Formik
          initialValues={{ email: '' }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
          })}
          onSubmit={handleResetPassword}
        >
          <Form className="forgot-password-form">
            <div className="form-group">
              <Field 
                type="email" 
                name="email" 
                placeholder="Email address" 
                className="form-input"
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <button type="submit" className="submit-button button-hovering-color">Send Reset Link</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default ForgotPassword;

