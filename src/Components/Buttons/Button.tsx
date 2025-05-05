import './Button.css';

interface ButtonProps {
  readonly name: string;
  readonly handleClick: () => void;
}

function Button({ name, handleClick }: ButtonProps) {
  return (
    <button className="btn button-hovering-color" onClick={handleClick}>
      {' '}
      {name}
    </button>
  );
}
export default Button;


