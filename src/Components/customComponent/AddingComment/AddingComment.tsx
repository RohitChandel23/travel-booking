import FormElement from "../../../Shared/FormElement/FormElement";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./AddingComment.css";

function AddingComment() {      //button name
  function handleSubmission(values) {
    console.log("submssion......", values);
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
          />
          <br />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}
export default AddingComment;
