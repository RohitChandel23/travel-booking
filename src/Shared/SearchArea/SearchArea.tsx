import "./SearchArea.css";
import "./Shared/constants";
import FormElement from "../FormElement/FormElement";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate, Location } from "react-router-dom";
import { ROUTES_CONFIG } from "../Constants";
import { useState, useEffect, useCallback } from "react";

interface SearchAreaProps {
  readonly searchAreaData?: (data: SearchFormFormattedValues) => void;
  readonly initialSearchValues?: Partial<SearchFormValues>;
  readonly isSearchArea?: boolean;
  readonly onFocusResetSidebarFilters?: () => void;
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
  isSearchArea,
  onFocusResetSidebarFilters,
}: SearchAreaProps) {
  const navigate = useNavigate();
  const data: Location = useLocation();
  const [datePickerBlurred, setDatePickerBlurred] = useState(false);
  const [shouldResetForm, setShouldResetForm] = useState(false);

  useEffect(() => {
    if (isSearchArea === false) {
      setShouldResetForm(true);
    }
  }, [isSearchArea]);

  const handleSearch = (
    values: SearchFormValues,
    actions: FormikHelpers<SearchFormValues>
  ) => {
    const trimmedDestinationName = values.destinationName.trim();
    const trimmedActivity = values.activity.trim();

    if (!trimmedDestinationName || !trimmedActivity) {
      if (!trimmedDestinationName) {
        actions.setFieldError("destinationName", "Destination cannot be empty");
      }
      if (!trimmedActivity) {
        actions.setFieldError("activity", "Activity cannot be empty");
      }
      actions.setSubmitting(false);
      return;
    }

    const [startDate, endDate] = values.selectDate;
    const formatDate = (date: Date | null): string | null =>
      date ? date.toISOString().split("T")[0] : null;

    const formattedData: SearchFormFormattedValues = {
      ...values,
      destinationName: trimmedDestinationName,
      activity: trimmedActivity,
      selectDate: [formatDate(startDate), formatDate(endDate)],
    };

    if (
      data.pathname === ROUTES_CONFIG.DESTINATION.path ||
      data.pathname === ROUTES_CONFIG.HOMEPAGE.path
    ) {
      navigate(ROUTES_CONFIG.TOURS.path, {
        state: {
          formattedData,
        },
      });
    } else {
      searchAreaData?.(formattedData);
    }
    actions.setSubmitting(false);
  };

  const handleGuestKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;

    if (
      [
        "Backspace",
        "Delete",
        "Tab",
        "Escape",
        "Enter",
        "ArrowLeft",
        "ArrowRight",
      ].includes(e.key)
    ) {
      return;
    }

    if (
      input.value.length >= 2 &&
      e.key !== "Backspace" &&
      e.key !== "Delete"
    ) {
      e.preventDefault();
    }

    if (!/\d/.test(e.key)) {
      e.preventDefault();
    }
  };

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

  const handleDateClear = (setFieldValue: any) => {
    setFieldValue("selectDate", [null, null]);
  };

  const handleFocus = useCallback(() => {
    if (onFocusResetSidebarFilters) {
      onFocusResetSidebarFilters();
    }
  }, [onFocusResetSidebarFilters]);

  return (
    <div className="search-area-container">
      <Formik
        initialValues={formInitialValues}
        enableReinitialize={true}
        validationSchema={Yup.object({
          destinationName: Yup.string()
            .trim()
            .required("Required")
            .matches(
              /^[A-Za-z0-9\s]+$/,
              "Destination cannot contain special characters"
            )
            .test(
              "not-just-whitespace",
              "Destination cannot be empty",
              (value) => !!value?.trim()
            ),
          activity: Yup.string()
            .trim()
            .required("Required")
            .matches(
              /^[A-Za-z0-9\s]+$/,
              "Activity cannot contain special characters"
            )
            .test(
              "not-just-whitespace",
              "Activity cannot be empty",
              (value) => !!value?.trim()
            ),
          selectDate: Yup.array()
            .of(Yup.date().nullable())
            .test(
              "both-dates",
              "Required",
              (value) => !!(value?.[0] && value?.[1])
            ),
          "guest-numbers": Yup.number()
            .required("Required")
            .min(1, "Must be at least 1 guest")
            .max(20, "Cannot exceed 20 guests")
            .integer("Must be a whole number"),
        })}
        onSubmit={handleSearch}
      >
        {({
          values,
          setFieldValue,
          resetForm,
          errors,
          touched,
          handleBlur,
        }) => {
          if (shouldResetForm) {
            resetForm({ values: defaultInitialValues });
            setShouldResetForm(false);
          }

          return (
            <Form className="search-area-form-class" onFocus={handleFocus}>
              <FormElement
                labelText="Destination"
                labelClassName="cursive-text search-area-form-label"
                name="destinationName"
                type="text"
                placeholder="Where to go ?"
                fieldClassName="search-area-form-field"
                containerClass="single-Form-element-class"
                min=""
                max=""
                icon="fa-solid fa-map"
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
                max=""
                icon="fa-solid fa-person-hiking"
              />

              <div className="single-Form-element-class">
                <label htmlFor="datePickerInput" className="cursive-text search-area-form-label">
                  When
                </label>
                <div className="input-with-icon">
                  <i className="form-icon fa-solid fa-calendar-days" aria-hidden="true"></i>
                  <DatePicker
                    id="datePickerInput"
                    selected={values.selectDate[0]}
                    onChange={(dates: [Date | null, Date | null]) => {
                      setFieldValue("selectDate", dates);
                    }}
                    onBlur={() => {
                      setDatePickerBlurred(true);
                      handleBlur("selectDate");
                    }}
                    startDate={values.selectDate[0]}
                    endDate={values.selectDate[1]}
                    selectsRange
                    placeholderText="Check-in & Check-out"
                    className="search-area-form-field has-icon"
                    minDate={new Date()}
                    maxDate={new Date(new Date().getFullYear() + 10, 11, 31)}
                    onKeyDown={(e) => {
                      if (e.key !== "Backspace" && e.key !== "Delete") {
                        e.preventDefault();
                      } else if (
                        (e.key === "Backspace" || e.key === "Delete") &&
                        (values.selectDate[0] || values.selectDate[1])
                      ) {
                        handleDateClear(setFieldValue);
                      }
                    }}
                    showMonthDropdown
                    dropdownMode="select"
                    aria-label="Select check-in and check-out dates"
                  />
                </div>
                {(datePickerBlurred || touched.selectDate) && errors.selectDate && (
                  <div className="form-error" role="alert">
                    {errors.selectDate}
                  </div>
                )}
              </div>

              <FormElement
                labelText="Guests"
                labelClassName="cursive-text search-area-form-label"
                name="guest-numbers"
                type="number"
                placeholder="0"
                fieldClassName="search-area-form-field guest-field"
                containerClass="single-Form-element-class"
                min={1}
                max={20}
                maxLength={2}
                icon="fa-solid fa-users"
                onKeyDown={handleGuestKeyDown}
                onWheel={(e) => e.currentTarget.blur()}
              />

              <button
                type="submit"
                className="submit-search-query button-hovering-color"
              >
                Search
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default SearchArea;