import "./SearchArea.css";
import "./Shared/constants";
// import SearchAreaElement from './Shared/SearchAreaElement/SearchAreaElement';
// import Button from "../../../Components/Buttons/Button";
import FormElement from "../../../Shared/FormElement/FormElement";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { useState } from "react";

function SearchArea({searchAreaData}) {
  function handleSearch(values) {
    const [startDate, endDate] = values["selectDate"];
    const formatDate = (date)=>date?date.toISOString().split("T")[0]:null;

    const formattedData = {
      ...values,
      selectDate: [formatDate(startDate),formatDate(endDate)]
    };
    searchAreaData(formattedData);
  }

  return (
    <div className="search-area-container">
      <Formik
        initialValues={{
          destinationName: "",
          activity: "",
          selectDate: [null, null],
          "guest-numbers": ""
        }}
        validationSchema={Yup.object({
          destinationName: Yup.string().required("Required"),
          activity: Yup.string().required("Required"),
          selectDate: Yup.array()
            .of(Yup.date().nullable())
            .test("both-dates", "Please select both start-date and end-data", (value) => {
              return value && value[0] && value[1];
            }),
          "guest-numbers": Yup.string().required("Required")
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
            />

            <FormElement
              labelText="Activity"
              labelClassName="cursive-text search-area-form-label"
              name="activity"
              type="text"
              placeholder="Activity"
              fieldClassName="search-area-form-field"
              containerClass="single-Form-element-class"
            />

            {/* Date Range Picker */}
            <div className="single-Form-element-class">
              <label className="cursive-text search-area-form-label">When</label>
              <DatePicker
                selected={values["selectDate"][0]}
                onChange={(dates) => setFieldValue("selectDate", dates)}
                startDate={values["selectDate"][0]}
                endDate={values["selectDate"][1]}
                selectsRange
                placeholderText="Select check-in & check-out"
                className="search-area-form-field"
                minDate={new Date()}
              />
              {touched["selectDate"] && errors["selectDate"] && (
                <div className="error">{errors["selectDate"]}</div>
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

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SearchArea;
