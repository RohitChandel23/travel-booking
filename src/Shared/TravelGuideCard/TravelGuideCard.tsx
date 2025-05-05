import './TravelGuideCard.css';
import { ProjectImages } from '../../assets/ProjectImages';

function TravelGuideCard(){
    return(
        <div className='travel-guide-card'>
            <img src={ProjectImages.SANTORINI} alt={ProjectImages.SANTORINI}/>
            <div className='blog-card-detail'>
                <p>Date Admin</p>
                <h6>title of the blog</h6>
            </div>
        </div>
    )
}
export default TravelGuideCard;