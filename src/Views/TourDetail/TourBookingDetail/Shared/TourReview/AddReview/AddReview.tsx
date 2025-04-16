import "./AddReview.css";
import StarRating from "./Shared/StarRating/StarRating";
import AddingComment from "../../../../../../Shared/AddingComment/AddingComment";

function AddReview(){   
    return(
        <div className="add-review-container">
                <h5>Add a review</h5>

                <div className="review-rating-container">
                    <StarRating />
                    <StarRating />
                    <StarRating />
                    <StarRating />
                    <StarRating />
            </div>
            
            <div className="adding-tour-review">
            <AddingComment/>
            </div>

            </div>
    )
}
export default AddReview;