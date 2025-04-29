// import FormElement from "../FormElement/FormElement";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import "./AddingComment.css";
// import { db } from "../../firebaseConfig";
// import { addDoc, collection } from "firebase/firestore";
// import { toast } from "react-toastify";

// interface AddingCommentProps {
//   ratings?: { [key: string]: number }; 
//   onReset?: () => void; 
// }

// function AddingComment({ ratings, onReset }: AddingCommentProps) {
//   async function handleSubmission(values: any, { resetForm }: any) {
//     const data = {
//       name: values.userName,
//       email: values.emailAddress,
//       textContent: values.textContent,
//       ...(ratings && { ratings }), 
//     };

//     try {
//       await addDoc(collection(db, "Comment"), data);
//       toast.success("Submitted successfully!");
//       console.log(data);
//       resetForm(); 
//       if (onReset) {
//         onReset(); 
//       }
//     } catch (error) {
//       toast.error(`Error: ${error}`);
//     }
//   }

//   return (
//     <div className="adding-comment-wrapper">
//       <Formik
//         initialValues={{
//           userName: "",
//           emailAddress: "",
//           textContent: "",
//         }}
//         validationSchema={Yup.object({
//           userName: Yup.string().required("Required"),
//           emailAddress: Yup.string().email("Invalid email").required("Required"),
//           textContent: Yup.string().required("Required"),
//         })}
//         onSubmit={handleSubmission}
//       >
//         <Form>
//           <div className="name-email-container">
//             <div>
//               <FormElement
//                 labelText=""
//                 labelClassName=""
//                 name="userName"
//                 type="text"
//                 placeholder="Your name"
//                 fieldClassName="name-email-field"
//                 containerClass=""
//                 min={1}
//                 max=""
//               />
//             </div>

//             <div>
//               <FormElement
//                 labelText=""
//                 labelClassName=""
//                 name="emailAddress"
//                 type="email"
//                 placeholder="Email address"
//                 fieldClassName="name-email-field"
//                 containerClass=""
//                 min={1}
//                 max=""
//               />
//             </div>
//           </div>

//           <FormElement
//             labelText=""
//             labelClassName=""
//             name="textContent"
//             type="textArea"
//             placeholder="Write Something"
//             fieldClassName="comment-field"
//             containerClass=""
//             min={1}
//             max=""
//           />
//           <br />
//           <button type="submit" className="button-hovering-color">
//             Submit
//           </button>
//         </Form>
//       </Formik>
//     </div>
//   );
// }

// export default AddingComment;





import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./AddingComment.css";
import { db } from "../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

interface AddingCommentProps {
  ratings?: { [key: string]: number }; 
  onReset?: () => void; 
  collectionType:string;

}

interface FormValues {
  userName: string;
  emailAddress: string;
  textContent: string;
}

function AddingComment({ ratings, onReset, collectionType }: AddingCommentProps) {
  async function handleSubmission(values: FormValues, { resetForm }: { resetForm: () => void }) {
    const data = {
      name: values.userName,
      email: values.emailAddress,
      textContent: values.textContent,
      ...(ratings && { ratings }), 
    };

    try {
      await addDoc(collection(db, collectionType), data);
      toast.success("Submitted successfully!");
      console.log(data);
      resetForm(); 
      if (onReset) {
        onReset(); 
      }
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  }

  return (
    <div className="adding-comment-wrapper">
      <Formik
        initialValues={{
          userName: "",
          emailAddress: "",
          textContent: "",
        }}
        validationSchema={Yup.object({
          userName: Yup.string().required("Required"),
          emailAddress: Yup.string().email("Invalid email").required("Required"),
          textContent: Yup.string().required("Required"),
        })}
        onSubmit={handleSubmission}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="name-email-container">
              <div>
                <Field
                  name="userName"
                  type="text"
                  placeholder="Your name"
                  className="name-email-field"
                />
                {errors.userName && touched.userName ? (
                  <div className="error">{errors.userName}</div>
                ) : null}
              </div>

              <div>
                <Field
                  name="emailAddress"
                  type="email"
                  placeholder="Email address"
                  className="name-email-field"
                />
                {errors.emailAddress && touched.emailAddress ? (
                  <div className="error">{errors.emailAddress}</div>
                ) : null}
              </div>
            </div>

            <div>
              <Field
                as="textarea"
                name="textContent"
                placeholder="Write Something"
                className="comment-field"
                rows={5}
              />
              {errors.textContent && touched.textContent ? (
                <div className="error">{errors.textContent}</div>
              ) : null}
            </div>
            
            <br />
            <button type="submit" className="button-hovering-color">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddingComment;