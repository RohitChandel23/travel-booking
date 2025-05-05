import { Field, ErrorMessage } from "formik";
import "./FormElement.css";

interface FormElementProps {
  readonly labelText: string;
  readonly labelClassName: string;
  readonly name: string;
  readonly type: string;
  readonly placeholder: string;
  readonly fieldClassName: string;
  readonly containerClass: string;
  readonly min: number | string;
  readonly max: number | string;
  readonly icon?: string; 
  readonly value?:any;
  readonly maxLength?:number;

  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onWheel?: (e: React.WheelEvent<HTMLInputElement>) => void;

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
  max,
  icon,
  maxLength,
  onKeyDown,
  onWheel
}: FormElementProps) {

  return (
    <span className={containerClass}>
      <label htmlFor={name} className={labelClassName}>
        {labelText}
      </label>
      <div className="input-with-icon">
        {icon && <i className={`form-icon ${icon}`}></i>}
        <Field
          name={name}
          type={type}
          placeholder={placeholder}
          className={`${fieldClassName} ${icon ? "has-icon" : ""}`}
          min={min}
          max={max}
          maxLength={maxLength}

          onKeyDown={onKeyDown} 
          onWheel={onWheel} 


        />
      </div>
      <ErrorMessage name={name} className="form-error" component="div" />
    </span>
  );
}

export default FormElement;