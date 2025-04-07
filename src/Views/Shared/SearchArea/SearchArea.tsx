import "./SearchArea.css";
import "./Shared/constants";
// import SearchAreaElement from './Shared/SearchAreaElement/SearchAreaElement';
// import Button from "../../../Components/Buttons/Button";
import FormElement from "../../../Shared/FormElement/FormElement";
import { Formik, Form } from "formik";
import * as Yup from "yup";

function SearchArea() {
  
  // function handleClick() {
  //   console.log("start search......");
  // }

  function handleSearch(values){
    console.log(values);
  }

  return (
    <div className="search-area-container">
        <Formik
          initialValues={{  
            "destination-name":"",
            activity: "",
            "select-date":"",
            "guest-numbers":""
          }}
          validationSchema={Yup.object({
            "destination-name":Yup.string().required("Required"),
            activity: Yup.string().required("Required"),
            "select-date": Yup.string().required("Required"),
            "guest-numbers":Yup.string().required("Required")
          })}
          onSubmit={ handleSearch }
        >
          <Form className="search-area-form-class">
            <FormElement
              labelText="Destination"
              labelClassName="cursive-text search-area-form-label"
              name="destination-name"
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

            <FormElement
              labelText="When"
              labelClassName="cursive-text search-area-form-label search-area-form-label"
              name="select-date"
              type="date"
              placeholder={new Date().toISOString().split("T")[0]}
              fieldClassName="search-area-form-field"
              containerClass="single-Form-element-class"
            />

            <FormElement
              labelText="Guests"
              labelClassName="cursive-text search-area-form-label"
              name="guest-numbers"
              type="number"
              placeholder="0"
              fieldClassName="search-area-form-field"
              containerClass="single-Form-element-class"
            />
            <button type="submit">Submit</button>
            {/* <Button name="Search" handleClick={handleClick}/> */}
          </Form>
        </Formik>
      </div>
  );
}


export default SearchArea;
