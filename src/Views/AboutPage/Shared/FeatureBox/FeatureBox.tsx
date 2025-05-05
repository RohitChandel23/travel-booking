import './FeatureBox.css';

interface FeatureBoxProps {
  readonly image: string;
  readonly title: string;
  readonly textContent:string;
}

function FeatureBox({image, title, textContent}:FeatureBoxProps) { 
  return (
    <div className="feature-box">
      <img src={image} alt='feature icon'/>
      <h6>{title}</h6>
      <p>{textContent}</p>
    </div>
  );
}
export default FeatureBox;
