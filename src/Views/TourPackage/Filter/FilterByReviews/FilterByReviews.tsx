import ReviewCheckBox from "./Shared/ReviewCheckBox";
import './FilterReviews.css';

function FilterByReview(){

    return(
    <div className="filter-by-review-container">
    <h6>Reviews</h6>
    <ul>
    <ReviewCheckBox type="checkbox" id="checkbox-5" value='5' labelText="5 Stars"/>        
    <ReviewCheckBox type="checkbox" id="checkbox-4" value='4' labelText="4 Stars"/>
    <ReviewCheckBox type="checkbox" id="checkbox-3" value='3' labelText="3 Stars"/>
    <ReviewCheckBox type="checkbox" id="checkbox-2" value='2' labelText="2 Stars"/>
    <ReviewCheckBox type="checkbox" id="checkbox-1" value='1' labelText="1 Stars"/>
    </ul>
    </div>
    )
}
export default FilterByReview;