import './SocialBtn.css';

function SocialBtn({ name, handleClick }: { readonly name: string; readonly handleClick: any }) {
  return (
    <button className="social-btn" onClick={handleClick}>
      {name}
    </button>
  );
}
export default SocialBtn;
