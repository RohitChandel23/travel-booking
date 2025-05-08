import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./AddingComment.css";
import { db } from "../../firebaseConfig";
import { addDoc, collection, serverTimestamp, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

interface AddingCommentProps {
  readonly ratings?: { [key: string]: number };
  readonly onReset?: () => void;
  readonly collectionType: string;
  readonly onReviewSubmit?: () => void;
}

interface FormValues {
  userName: string;
  emailAddress: string;
  textContent: string;
}

function AddingComment({
  ratings,
  onReset,
  collectionType,
  onReviewSubmit,
}: AddingCommentProps) {
  const { slugId: routeSlugIdParam } = useParams<{ slugId?: string }>();

  const calculateAverageRating = (
    ratingsObj: { [key: string]: number } | undefined
  ): number => {
    if (!ratingsObj) return 0;

    const ratingValues = Object.values(ratingsObj);
    const validRatings = ratingValues.filter((rating) => rating > 0);
    if (validRatings.length === 0) return 0;

    const sum = validRatings.reduce((acc, curr) => acc + curr, 0);
    return sum / validRatings.length;
  };

  async function handleSubmission(
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) {
    type FirestoreDataType =
      | {
          name: string;
          email: string;
          slugId: string | null;
          textContent: string;
          createdAt: any;
          averageRating: number;
          individualRatings: { [key: string]: number } | undefined;
          blogId?: never;
          timestamp?: never;
        }
      | {
          name: string;
          email: string;
          textContent: string;
          timestamp: any;
          blogId: string | null;
          slugId?: never;
          createdAt?: never;
          averageRating?: never;
          individualRatings?: never;
        };

    let data: FirestoreDataType;

    const isReviewType = collectionType === 'tour-review';

    if (isReviewType) {
      const allRatingsProvided =
        ratings &&
        Object.keys(ratings).length === 5 &&
        Object.values(ratings).every((rating) => rating > 0);

      if (!allRatingsProvided) {
        toast.error("Please rate all categories before submitting your response.");
        return;
      }

      const averageRating = calculateAverageRating(ratings);
      data = {
        name: values.userName,
        email: values.emailAddress,
        slugId: routeSlugIdParam ?? null,
        textContent: values.textContent,
        createdAt: serverTimestamp(),
        averageRating,
        individualRatings: ratings,
      };
    } else {
      data = {
        name: values.userName,
        email: values.emailAddress,
        textContent: values.textContent,
        timestamp: Timestamp.fromDate(new Date()),
        blogId: window.location.pathname.split('/').pop() ?? null,
      };
    }

    console.log("Data being submitted:", data);

    try {
      await addDoc(collection(db, collectionType), data);
      toast.success("Submitted successfully!");
      console.log("Submitted data:", data);
      resetForm();
      if (onReset) {
        onReset();
      }
      if (isReviewType && onReviewSubmit) {
        onReviewSubmit();
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(`Error: ${error.message || "An unexpected error occurred."}`);
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
          userName: Yup.string()
          .required("Required")
          .trim("Can't be just empty spaces")
          .matches(
            /^[A-Za-z\s]+$/,
            "Name can't contain speical characters"
          ),
          emailAddress: Yup.string()
          .email("Invalid email address")
          .required("Required")
          .matches(/^[a-zA-Z0-9.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Invalid email address"),

          textContent: Yup.string()
            .required("Required")
            .trim("Can't be just empty spaces")
            .min(1, "Can't be just empty spaces")
            .matches(/^(?=.*[a-zA-Z0-9]).{1,500}$/, "Invalid"),

        })}
        onSubmit={handleSubmission}
        enableReinitialize
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="name-email-container">
              <div>
                <Field
                  name="userName"
                  type="text"
                  placeholder="Your name"
                  className="name-email-field"
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                placeholder="Write something"
                className="comment-field"
                rows={5}
                disabled={isSubmitting}
              />
              {errors.textContent && touched.textContent ? (
                <div className="error">{errors.textContent}</div>
              ) : null}
            </div>

            <br />
            <button type="submit" className="button-hovering-color" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddingComment;