import { Field, ErrorMessage } from "formik";

interface FormElementProps {
  labelText: string;
  labelClassName: string;
  name: string;
  type: string;
  placeholder: string;
  fieldClassName: string;
  containerClass: string;
}

function FormElement({
  labelText,
  labelClassName,
  name,
  type,
  placeholder,
  fieldClassName,
  containerClass,
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
        />
        <ErrorMessage name={name} />
      </span>
    </>
  );
}
export default FormElement;
