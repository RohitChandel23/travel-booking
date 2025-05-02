import "./ShowingReview.css";
import { useGetTourReviewQuery } from "../../../../../../Services/Api/module/demoApi";
import { ProjectImages } from "../../../../../../assets/ProjectImages";

interface ShowingReviewProps {
  tourId: string;
}

function ShowingReview({ tourId }: ShowingReviewProps) {
  const { data, isLoading, isError } = useGetTourReviewQuery(tourId);
  const reviews = data?.data || [];
  const reviewer = reviews[0];

  if (isLoading) return <div>Loading reviews...</div>;
  if (isError) return <div>Error loading reviews</div>;
  if (!reviewer) return <p>No reviews yet.</p>;

  const reviewerName = reviewer?.user?.name || 'Anonymous User';
  const reviewerRating = reviewer?.numericRating || 0;
  const reviewerComment = reviewer?.content;
  const reviewerImage = reviewer?.user?.avatar;

  return (
    <div className="showing-review-container">
      <h5>Showing 1 review</h5>
      <div className="showing-one-review">
        <div className="showing-reviewer-image">
          {reviewerImage ? (
            <img className="reviewer-image" src={reviewerImage} alt="Reviewer" />
          ) : (
            <img className="reviewer-image" src={ProjectImages.BLANK_PROFILE} alt="Default" />
          )}
        </div>
        <div className="showing-review-text-info">
          <span className="review-date project-normal-font">March 20, 2022</span>
          <h6 className="reviewer-name project-heading-font">{reviewerName}</h6>
          <div className="reviewer-rating">
            <span className="rating-star-class">
              <i className="fa fa-star" /> {reviewerRating} <br />
            </span>
            <span className="tour-additional-info-text">5 reviews <br /></span>
          </div>
          <p className="review-description project-normal-font">{reviewerComment}</p>
        </div>
      </div>
    </div>
  );
}

export default ShowingReview;








// import "./ShowingReview.css";
// import { useGetTourReviewQuery } from "../../../../../../Services/Api/module/demoApi";
// import { ProjectImages } from "../../../../../../assets/ProjectImages";

// interface ShowingReviewProps {
//   tourId: string;
// }

// function ShowingReview({ tourId }: ShowingReviewProps) {
//   // console.log(tourId);
//   const { data } = useGetTourReviewQuery(tourId);
//   const reviewer = data?.data[0];

//   const reviewerName = reviewer?.user?.name || 'Anonymous User';
  
//   const reviewerRating = reviewer?.numericRating || 0;
//   // const reviewerRating = reviewer?.numericRating || '0';

//   const reviewerComment = reviewer?.content;
//   const reviewerImage = reviewer?.user?.avatar;

//   if(!reviewer)
//     return "";

//   return (
//     <div className="showing-review-container">
//       <h5>Showing 1 review</h5>
//       <div className="showing-one-review">
//         <div className="showing-reviewer-image">
//           {reviewerImage ? (
//             <img className="reviewer-image" src={reviewerImage} />
//           ) : (
//             <img className="reviewer-image" src={ProjectImages.BLANK_PROFILE} />
//           )}
//         </div>
//         <div className="showing-review-text-info">
//           <span className="review-date project-normal-font">
//             March 20, 2022
//           </span>
//           <h6 className="reviewer-name project-heading-font">{reviewerName}</h6>

//           <div className="reviewer-rating">
//             <span className="rating-star-class">
//               <i className="fa fa-star" /> {reviewerRating} <br />
//             </span>
//             <span className="tour-additional-info-text">
//               5 reviews <br />
//             </span>
//           </div>

//           <p className="review-description project-normal-font">
//             {reviewerComment}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default ShowingReview;





