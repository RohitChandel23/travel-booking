import './SocialBtn.css';

function SocialBtn({ name, handleClick }: { name: string; handleClick: any }) {
  return (
    <button className="social-btn" onClick={handleClick}>
      {name}
    </button>
  );
}
export default SocialBtn;
