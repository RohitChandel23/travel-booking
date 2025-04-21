  import "./SearchArea.css";
import "./Shared/constants";
import FormElement from "../FormElement/FormElement";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate, Location } from "react-router-dom";
import { ROUTES_CONFIG } from "../Constants";

interface SearchAreaProps {
  searchAreaData?: (data: SearchFormFormattedValues) => void;
  initialSearchValues?: Partial<SearchFormValues>;
}

interface SearchFormValues {
  destinationName: string;
  activity: string;
  selectDate: [Date | null, Date | null];
  "guest-numbers": string;
}

interface SearchFormFormattedValues {
  destinationName: string;
  activity: string;
  selectDate: [string | null, string | null];
  "guest-numbers": string;
}

function SearchArea({
  searchAreaData = () => {},
  initialSearchValues = {},
}: SearchAreaProps) {
  const navigate = useNavigate();
  const data: Location = useLocation();

  function handleSearch(
    values: SearchFormValues,
    actions: FormikHelpers<SearchFormValues>
  ) {
    const [startDate, endDate] = values.selectDate;
    const formatDate = (date: Date | null): string | null =>
      date ? date.toISOString().split("T")[0] : null;

    const formattedData: SearchFormFormattedValues = {
      ...values,
      selectDate: [formatDate(startDate), formatDate(endDate)],
    };

    if (data.pathname ==="/destination"|| data.pathname === "/") {
      navigate(ROUTES_CONFIG.TOURS.path, {
        state: {
          formattedData,
        },
      });
    } else {
      searchAreaData?.(formattedData);
    }
    actions.setSubmitting(false);
  }

  const defaultInitialValues: SearchFormValues = {
    destinationName: "",
    activity: "",
    selectDate: [null, null],
    "guest-numbers": "",
  };

  const formInitialValues: SearchFormValues = {
    ...defaultInitialValues,
    ...initialSearchValues,
    selectDate: initialSearchValues.selectDate
      ? [
          initialSearchValues.selectDate[0]
            ? new Date(initialSearchValues.selectDate[0])
            : null,
          initialSearchValues.selectDate[1]
            ? new Date(initialSearchValues.selectDate[1])
            : null,
        ]
      : [null, null],
  };

  return (
    <div className="search-area-container">
      <Formik
        initialValues={formInitialValues}
        validationSchema={Yup.object({
          destinationName: Yup.string().required("Required"),
          activity: Yup.string().required("Required"),
          selectDate: Yup.array()
            .of(Yup.date().nullable())
            .test(
              "both-dates",
              "Please select both start-date and end-date",
              (value) => !!(value && value[0] && value[1])
            ),
          "guest-numbers": Yup.string().required("Required"),
        })}
        onSubmit={handleSearch}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form className="search-area-form-class">
            <FormElement
              labelText="Destination"
              labelClassName="cursive-text search-area-form-label"
              name="destinationName"
              type="text"
              placeholder="Where to go ?"
              fieldClassName="search-area-form-field"
              containerClass="single-Form-element-class"
              min=""
            />

            <FormElement
              labelText="Activity"
              labelClassName="cursive-text search-area-form-label"
              name="activity"
              type="text"
              placeholder="Activity"
              fieldClassName="search-area-form-field"
              containerClass="single-Form-element-class"
              min=""
            />

            <div className="single-Form-element-class">
              <label className="cursive-text search-area-form-label">When</label>
              <DatePicker
                selected={values.selectDate[0]}
                onChange={(dates: [Date | null, Date | null]) =>
                  setFieldValue("selectDate", dates)
                }
                startDate={values.selectDate[0]}
                endDate={values.selectDate[1]}
                selectsRange
                placeholderText="Select check-in & check-out"
                className="search-area-form-field"
                minDate={new Date()}
                onKeyDown={(e) => e.preventDefault()} 

              />
              {touched.selectDate && errors.selectDate && (
                <div>{errors.selectDate}</div>
              )}
            </div>

            <FormElement
              labelText="Guests"
              labelClassName="cursive-text search-area-form-label"
              name="guest-numbers"
              type="number"
              placeholder="0"
              fieldClassName="search-area-form-field"
              containerClass="single-Form-element-class"
              min={1}
            />

            <button type="submit" className="submit-search-query button-hovering-color">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SearchArea;
