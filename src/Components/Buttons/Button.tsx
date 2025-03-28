import './Button.css';

interface buttonProps {
  name: string;
  handleClick: () => void;
}

function Button({ name, handleClick }: buttonProps) {
  return (
    <button className="btn" onClick={handleClick}>
      {' '}
      {name}
    </button>
  );
}
export default Button;

// const Button: React.FC<buttonProps> = ({name, handleClick})=>{
// return(
//     <button onClick={handleClick}> {name}</button>
// )
// }
// export default Button;
