import FormElement from "../FormElement/FormElement";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./AddingComment.css";
import { db } from "../../firebaseConfig";
import { addDoc, collection } from "../../firebaseConfig";
import { toast } from "react-toastify";

function AddingComment() {
  async function handleSubmission(values: any) {
    console.log("submssion......", values.userName);

    const data = {
      name: values.userName,
      email: values.emailAddress,
      textContent: values.textContent,
    };

    try {
      await addDoc(collection(db, "Comment"), data);
      toast.success("Submitted successfully! ");
      values.userName=""
      values.emailAddress=""
      values.textContent=""
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
          emailAddress: Yup.string().required("Required"),
          textContent: Yup.string().required("Required"),
        })}
        onSubmit={handleSubmission}
      >
        <Form>
          <div className="name-email-container">
            <div>
              <FormElement
                labelText=""
                labelClassName=""
                name="userName"
                type="text"
                placeholder="Your name"
                fieldClassName="name-email-field"
                containerClass=""
                min={1}
                max=""
              />
            </div>

            <div>
              <FormElement
                labelText=""
                labelClassName=""
                name="emailAddress"
                type="email"
                placeholder="Email address"
                fieldClassName="name-email-field"
                containerClass=""
                min={1}
                max=""
              />
            </div>
          </div>

          <FormElement
            labelText=""
            labelClassName=""
            name="textContent"
            type="textArea"
            placeholder="Write Something"
            fieldClassName="comment-field"
            containerClass=""
            min={1}
            max=""
          />
          <br />
          <button type="submit" className="button-hovering-color">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}
export default AddingComment;
