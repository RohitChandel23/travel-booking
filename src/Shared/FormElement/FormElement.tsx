import { Field, ErrorMessage } from "formik";

interface FormElementProps {
  labelText: string;
  labelClassName: string;
  name: string;
  type: string;
  placeholder: string;
  fieldClassName: string;
  containerClass: string;
  min:number;
}

function FormElement({
  labelText,
  labelClassName,
  name,
  type,
  placeholder,
  fieldClassName,
  containerClass,
  min
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
        />
        <ErrorMessage name={name} />
      </span>
    </>
  );
}
export default FormElement;
