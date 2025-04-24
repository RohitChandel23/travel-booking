import { Field, ErrorMessage } from "formik";

interface FormElementProps {
  labelText: string;
  labelClassName: string;
  name: string;
  type: string;
  placeholder: string;
  fieldClassName: string;
  containerClass: string;
  min:number | string;
  max: number | string;
}

function FormElement({
  labelText,
  labelClassName,
  name,
  type,
  placeholder,
  fieldClassName,
  containerClass,
  min,
  max
}: FormElementProps) {
  return (
    <>
      <span className={containerClass}>
        <label htmlFor={name} className={labelClassName}>
          {labelText}
        </label>{" "}   
        <Field
          name={name}
          type={type}
          placeholder={placeholder}
          className={fieldClassName}
          min={min}
          max={max}
        />
        <ErrorMessage name={name} className="form-error" component="div"/>
      </span>
    </>
  );
}
export default FormElement;
