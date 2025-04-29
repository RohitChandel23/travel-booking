import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig'; 
import './forgotPassword.css';
import { useState } from 'react';

interface emailValue {
  email: string;
}

function ForgotPassword() {
  const [isClick, setIsClick] = useState<boolean>(false);

  async function handleResetPassword(values: emailValue) {
    setIsClick(true);
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', values.email));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        toast.error('No account found with this email address');
        return;
      }
      
      await sendPasswordResetEmail(auth, values.email);
      toast.success('Password reset email sent successfully');
    } catch (err) {
      console.error('Error:', err);
      toast.error('User does not exist');
    }
    finally{
      setIsClick(false);
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
            email: Yup.string().email('Invalid email address')
            .required('Required'),
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

            <button type="submit" disabled={isClick} className="submit-button button-hovering-color">Send Reset Link</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default ForgotPassword;