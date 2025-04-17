import './FeatureBox.css';

interface FeatureBoxProps {
  image: string;
  title: string;
  textContent:string;
}

function FeatureBox({image, title, textContent}:FeatureBoxProps) { 
  return (
    <div className="feature-box">
      <img src={image}/>
      <h6>{title}</h6>
      <p>{textContent}</p>
    </div>
  );
}
export default FeatureBox;
