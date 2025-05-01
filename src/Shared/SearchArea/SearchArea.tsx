// import "./SearchArea.css";
// import "./Shared/constants";
// import FormElement from "../FormElement/FormElement";
// import { Formik, Form, FormikHelpers } from "formik";
// import * as Yup from "yup";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useLocation, useNavigate, Location } from "react-router-dom";
// import { ROUTES_CONFIG } from "../Constants";
// import { useState, useEffect } from "react";

// interface SearchAreaProps {
//   searchAreaData?: (data: SearchFormFormattedValues) => void;
//   initialSearchValues?: Partial<SearchFormValues>;
//   isSearchArea?: boolean;
// }

// interface SearchFormValues {
//   destinationName: string;
//   activity: string;
//   selectDate: [Date | null, Date | null];
//   "guest-numbers": string;
// }

// interface SearchFormFormattedValues {
//   destinationName: string;
//   activity: string;
//   selectDate: [string | null, string | null];
//   "guest-numbers": string;
// }


// function SearchArea({
//   searchAreaData = () => {},
//   initialSearchValues = {},
//   isSearchArea,
// }: SearchAreaProps) {
//   const navigate = useNavigate();
//   const data: Location = useLocation();
//   const [datePickerBlurred, setDatePickerBlurred] = useState(false);

//   function handleSearch(
//     values: SearchFormValues,
//     actions: FormikHelpers<SearchFormValues>
//   ) {
//     const trimmedDestinationName = values.destinationName.trim();
//     const trimmedActivity = values.activity.trim();
    
//     if (!trimmedDestinationName || !trimmedActivity) {
//       if (!trimmedDestinationName) {
//         actions.setFieldError("destinationName", "Destination cannot be empty");
//       }
//       if (!trimmedActivity) {
//         actions.setFieldError("activity", "Activity cannot be empty");
//       }
//       actions.setSubmitting(false);
//       return;
//     }
    
//     const [startDate, endDate] = values.selectDate;
//     const formatDate = (date: Date | null): string | null =>
//       date ? date.toISOString().split("T")[0] : null;

//     const formattedData: SearchFormFormattedValues = {
//       ...values,
//       destinationName: trimmedDestinationName, 
//       activity: trimmedActivity, 
//       selectDate: [formatDate(startDate), formatDate(endDate)],
//     };

//     if (
//       data.pathname === ROUTES_CONFIG.DESTINATION.path ||
//       data.pathname === ROUTES_CONFIG.HOMEPAGE.path
//     ) {
//       navigate(ROUTES_CONFIG.TOURS.path, {
//         state: {
//           formattedData,
//         },
//       });
//     } else {
//       searchAreaData?.(formattedData);
//     }
//     actions.setSubmitting(false);
//   }

//   const defaultInitialValues: SearchFormValues = {
//     destinationName: "",
//     activity: "",
//     selectDate: [null, null],
//     "guest-numbers": "",
//   };


//   const formInitialValues: SearchFormValues = {
//     ...defaultInitialValues,
//     ...initialSearchValues,
//     selectDate: initialSearchValues.selectDate
//       ? [
//           initialSearchValues.selectDate[0]
//             ? new Date(initialSearchValues.selectDate[0])
//             : null,
//           initialSearchValues.selectDate[1]
//             ? new Date(initialSearchValues.selectDate[1])
//             : null,
//         ]
//       : [null, null],
//   };

//   const handleDateClear = (setFieldValue: any) => {
//     setFieldValue("selectDate", [null, null]);
//   };

//   return (
//     <div className="search-area-container">
//       <Formik
//         initialValues={formInitialValues}
//         enableReinitialize={true}
//         validationSchema={Yup.object({
//           destinationName: Yup.string()
//             .trim() 
//             .required("Required")
//             .test(
//               'not-just-whitespace',
//               'Destination cannot be empty',
//               value => !!value.trim() 
//             ),
//           activity: Yup.string()
//             .trim() 
//             .required("Required")
//             .test(
//               'not-just-whitespace',
//               'Activity cannot be empty',
//               value => !!value.trim() 
//             ),
//           selectDate: Yup.array()
//             .of(Yup.date().nullable())
//             .test(
//               "both-dates",
//               "Required",
//               (value) => !!(value && value[0] && value[1])
//             ),
//           "guest-numbers": Yup.string().required("Required"),
//         })}
//         onSubmit={handleSearch}
//       >
//         {({ values, setFieldValue, resetForm, errors, touched, handleBlur }) => {
          
//           useEffect(() => {
//             if (isSearchArea === false) {
//               resetForm();
//             }
//           }, [isSearchArea, resetForm]);

//           return (
//             <Form className="search-area-form-class">
//               <FormElement
//                 labelText="Destination"
//                 labelClassName="cursive-text search-area-form-label"
//                 name="destinationName"
//                 type="text"
//                 placeholder="Where to go ?"
//                 fieldClassName="search-area-form-field"
//                 containerClass="single-Form-element-class"
//                 min=""
//                 max=""
//                 icon="fa-solid fa-map"
//               />

//               <FormElement
//                 labelText="Activity"
//                 labelClassName="cursive-text search-area-form-label"
//                 name="activity"
//                 type="text"
//                 placeholder="Activity"
//                 fieldClassName="search-area-form-field"
//                 containerClass="single-Form-element-class"
//                 min=""
//                 max=""
//                 icon="fa-solid fa-person-hiking"
//               />

//               <div className="single-Form-element-class">
//                 <label className="cursive-text search-area-form-label">When</label>
//                 <div className="input-with-icon">
//                   <i className="form-icon fa-solid fa-calendar-days"></i>

//                   <DatePicker
//                     selected={values.selectDate[0]}
//                     onChange={(dates: [Date | null, Date | null]) => {
//                       setFieldValue("selectDate", dates);
//                     }}
//                     onBlur={() => {
//                       setDatePickerBlurred(true);
//                       handleBlur("selectDate");
//                     }}
//                     startDate={values.selectDate[0]}
//                     endDate={values.selectDate[1]}
//                     selectsRange
//                     placeholderText="Check-in & Check-out"
//                     className="search-area-form-field has-icon"
//                     minDate={new Date()}
//                     maxDate={new Date(new Date().getFullYear() + 10, 11, 31)}
//                     onKeyDown={(e) => {
//                       if (e.key !== 'Backspace' && e.key !== 'Delete') {
//                         e.preventDefault();
//                       } else if ((e.key === 'Backspace' || e.key === 'Delete') && 
//                                 (values.selectDate[0] || values.selectDate[1])) {
//                         handleDateClear(setFieldValue);
//                       }
//                     }}
//                     showMonthDropdown
//                     showYearDropdown
//                     dropdownMode="select"
//                     yearDropdownItemNumber={10}
//                     scrollableYearDropdown

//                     dayClassName={(date) => {
//                       const [start, end] = values.selectDate;
//                       if (!start || !end) return ''; 
//                       if (date >= start && date <= end) return 'custom-highlight';
//                       return '';
//                     }}
//                   />
//                 </div>
//                 {(datePickerBlurred || touched.selectDate) && errors.selectDate && (
//                   <div className="form-error">{errors.selectDate}</div>
//                 )}
//               </div>

//               <FormElement
//                 labelText="Guests"
//                 labelClassName="cursive-text search-area-form-label"
//                 name="guest-numbers"
//                 type="number"
//                 placeholder="0"
//                 fieldClassName="search-area-form-field"
//                 containerClass="single-Form-element-class"
//                 min={1}
//                 max={10}
//                 icon="fa-solid fa-users"
//               />

//               <button
//                 type="submit"
//                 className="submit-search-query button-hovering-color"
//               >
//                 Search
//               </button>
//             </Form>
//           );
//         }}
//       </Formik>
//     </div>
//   );
// }

// export default SearchArea;







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
  searchAreaData?: (data: SearchFormFormattedValues) => void;
  initialSearchValues?: Partial<SearchFormValues>;
  isSearchArea?: boolean;
  onFocusResetSidebarFilters?: () => void; 
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
            .test(
              'not-just-whitespace',
              'Destination cannot be empty',
              value => !!value?.trim() 
            ),
          activity: Yup.string()
            .trim()
            .required("Required")
            .test(
              'not-just-whitespace',
              'Activity cannot be empty',
              value => !!value?.trim() 
            ),
          selectDate: Yup.array()
            .of(Yup.date().nullable())
            .test(
              "both-dates",
              "Required",
              (value) => !!(value && value[0] && value[1])
            ),
          "guest-numbers": Yup.string().required("Required"),
        })}
        onSubmit={handleSearch}
      >
        {({ values, setFieldValue, resetForm, errors, touched, handleBlur }) => {

          useEffect(() => {
            if (isSearchArea === false) {
              resetForm({values: defaultInitialValues}); 
            }
          }, [isSearchArea, resetForm]);

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
                <label className="cursive-text search-area-form-label">When</label>
                <div className="input-with-icon">
                  <i className="form-icon fa-solid fa-calendar-days"></i>

                  <DatePicker
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
                      if (e.key !== 'Backspace' && e.key !== 'Delete') {
                        e.preventDefault();
                      } else if ((e.key === 'Backspace' || e.key === 'Delete') &&
                                 (values.selectDate[0] || values.selectDate[1])) {
                        handleDateClear(setFieldValue);
                      }
                    }}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    yearDropdownItemNumber={10}
                    scrollableYearDropdown

                    dayClassName={(date) => {
                      const [start, end] = values.selectDate;
                      if (!start || !end) return '';
                      const normDate = new Date(date.setHours(0,0,0,0));
                      const normStart = new Date(start.setHours(0,0,0,0));
                      const normEnd = new Date(end.setHours(0,0,0,0));
                      if (normDate >= normStart && normDate <= normEnd) return 'custom-highlight';
                      return '';
                    }}
                  />
                </div>
                {(datePickerBlurred || touched.selectDate) && errors.selectDate && (
                  <div className="form-error">{errors.selectDate}</div>
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
                max={20}
                icon="fa-solid fa-users"
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