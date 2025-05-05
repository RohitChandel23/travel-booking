// import "./ShowingReview.css";
// import { useState, useEffect } from "react";
// import { useGetTourReviewQuery } from "../../../../../../Services/Api/module/demoApi";
// import { ProjectImages } from "../../../../../../assets/ProjectImages";
// import { useParams } from "react-router-dom";
// import { db } from "../../../../../../firebaseConfig";
// import { collection, getDocs, query, where } from "firebase/firestore";

// interface ShowingReviewProps {
//     tourId: string;
// }

// interface FirebaseComment {
//     name?: string;
//     textContent?: string;
//     createdAt?: { toDate: () => Date } | Date;
// }

// function ShowingReview({ tourId }: ShowingReviewProps) {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [apiReviews, setApiReviews] = useState<any[]>([]);
//     const [firebaseComments, setFirebaseComments] = useState<FirebaseComment[]>([]);
//     const [showLoadMore, setShowLoadMore] = useState(true);
//     const [loadingApi, setLoadingApi] = useState(false);
//     const [errorApi, setErrorApi] = useState<Error | null>(null);
//     const [loadingFirebase, setLoadingFirebase] = useState(true);
//     const [errorFirebase, setErrorFirebase] = useState<Error | null>(null);

//     const { data: apiData, isLoading: isApiLoading, isError: isApiError } = useGetTourReviewQuery({
//         tourId,
//         page: currentPage
//     });

//     const { slugId } = useParams();

//     useEffect(() => {
//         const fetchFirebaseComments = async () => {
//             setLoadingFirebase(true);
//             try {
//                 if (slugId) {
//                     const commentsRef = collection(db, "tour-review");
//                     const q = query(commentsRef, where("slugId", "==", slugId));
//                     const querySnapshot = await getDocs(q);
//                     const comments: FirebaseComment[] = querySnapshot.docs.map(doc => ({
//                         ...doc.data() as FirebaseComment,
//                         createdAt: doc.data()?.createdAt
//                             ? (doc.data().createdAt as { toDate: () => Date }).toDate()
//                             : new Date(),
//                     }));
//                     setFirebaseComments(comments);
//                 }
//             } catch (error: any) {
//                 setErrorFirebase(error);
//                 console.error("Error fetching Firebase comments:", error);
//             } finally {
//                 setLoadingFirebase(false);
//             }
//         };

//         fetchFirebaseComments();
//     }, [slugId]);

//     useEffect(() => {
//         if (apiData?.data) {
//             setApiReviews(prev => [...prev, ...apiData.data]);
//             if (apiData.data.length === 0) {
//                 setShowLoadMore(false);
//             } else {
//                 setShowLoadMore(true);
//             }
//         }
//     }, [apiData]);

//     const handleLoadMore = () => {
//         if (!isApiLoading) {
//             setCurrentPage(prev => prev + 1);
//         }
//     };

//     const allReviews = [
//         ...firebaseComments
//             .slice()
//             .sort((a, b) =>
//                 (b.createdAt instanceof Date ? b.createdAt.getTime() : 0) -
//                 (a.createdAt instanceof Date ? a.createdAt.getTime() : 0)
//             ),
//         ...apiReviews
//     ];

//     if ((isApiLoading && currentPage === 1) || loadingFirebase) {
//         return <div className="reviews-loading">Loading reviews...</div>;
//     }

//     if ((isApiError && currentPage === 1) || errorFirebase) {
//         return <div className="reviews-error">Error loading reviews</div>;
//     }

//     if (allReviews.length === 0 && !isApiLoading && !loadingFirebase) {
//         return <div className="no-reviews">No reviews yet.</div>;
//     }

//     return (
//         <div className="showing-review-container">
//             <div className="showing-review-header">
//                 Showing {allReviews.length} review{allReviews.length !== 1 ? 's' : ''}
//             </div>

//             <div className="reviews-scroll-area">
//                 {allReviews.map((review, index) => {
//                     const reviewerName = review?.name || review?.user?.name || 'Anonymous User';
//                     const reviewerComment = review?.textContent || review?.content;
//                     const reviewCreatedAt = review?.createdAt instanceof Date
//                         ? review.createdAt
//                         : review?.createdAt?.toDate
//                             ? review.createdAt.toDate()
//                             : new Date();

//                     return (
//                         <div key={index} className="showing-one-review">
//                             <div className="showing-reviewer-image">
//                                 <img src={ProjectImages.BLANK_PROFILE} alt={reviewerName} className="reviewer-image" />
//                             </div>

//                             <div className="showing-review-text-info">
//                                 <div className="review-date">
//                                     {reviewCreatedAt ? new Date(reviewCreatedAt).toLocaleDateString('en-US', {
//                                         year: 'numeric',
//                                         month: 'long',
//                                         day: 'numeric'
//                                     }) : ''}
//                                 </div>

//                                 <h4 className="reviewer-name">{reviewerName}</h4>
//                                 <p className="review-description">{reviewerComment}</p>
//                             </div>
//                         </div>
//                     );
//                 })}

//                 {showLoadMore && (
//                     <div className="load-more-container">
//                         <button
//                             onClick={handleLoadMore}
//                             className="load-more-button"
//                             disabled={isApiLoading}
//                         >
//                             {isApiLoading ? "Loading..." : "Load More Reviews"}
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default ShowingReview;







// import "./ShowingReview.css";
// import { useState, useEffect, useCallback } from "react";
// import { useGetTourReviewQuery } from "../../../../../../Services/Api/module/demoApi";
// import { ProjectImages } from "../../../../../../assets/ProjectImages";
// import { useParams } from "react-router-dom";
// import { db } from "../../../../../../firebaseConfig";
// import { collection, getDocs, query, where } from "firebase/firestore";

// interface ShowingReviewProps {
//     tourId: string;
//     reviewSubmitted: boolean; 
// }

// interface FirebaseComment {
//     name?: string;
//     textContent?: string;
//     createdAt?: { toDate: () => Date } | Date;
// }

// function ShowingReview({ tourId, reviewSubmitted }: ShowingReviewProps) {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [apiReviews, setApiReviews] = useState<any[]>([]);
//     const [firebaseComments, setFirebaseComments] = useState<FirebaseComment[]>([]);
//     const [showLoadMore, setShowLoadMore] = useState(true);
//     const [loadingApi, setLoadingApi] = useState(false);
//     const [errorApi, setErrorApi] = useState<Error | null>(null);
//     const [loadingFirebase, setLoadingFirebase] = useState(true);
//     const [errorFirebase, setErrorFirebase] = useState<Error | null>(null);

//     const { data: apiData, isLoading: isApiLoading, isError: isApiError, refetch: refetchApiReviews } = useGetTourReviewQuery({
//         tourId,
//         page: currentPage
//     });

//     const { slugId } = useParams();

//     const fetchFirebaseComments = useCallback(async () => {
//         setLoadingFirebase(true);
//         try {
//             if (slugId) {
//                 const commentsRef = collection(db, "tour-review");
//                 const q = query(commentsRef, where("slugId", "==", slugId));
//                 const querySnapshot = await getDocs(q);
//                 const comments: FirebaseComment[] = querySnapshot.docs.map(doc => ({
//                     ...doc.data() as FirebaseComment,
//                     createdAt: doc.data()?.createdAt
//                         ? (doc.data().createdAt as { toDate: () => Date }).toDate()
//                         : new Date(),
//                 }));
//                 setFirebaseComments(comments);
//             }
//         } catch (error: any) {
//             setErrorFirebase(error);
//             console.error("Error fetching Firebase comments:", error);
//         } finally {
//             setLoadingFirebase(false);
//         }
//     }, [slugId]);

//     useEffect(() => {
//         fetchFirebaseComments();
//     }, [slugId, reviewSubmitted]); 

//     useEffect(() => {
//         if (apiData?.data) {
//             setApiReviews(prev => [...prev, ...apiData.data]);
//             if (apiData.data.length === 0) {
//                 setShowLoadMore(false);
//             } else {
//                 setShowLoadMore(true);
//             }
//         }
//     }, [apiData]);

//     const handleLoadMore = () => {
//         if (!isApiLoading) {
//             setCurrentPage(prev => prev + 1);
//         }
//     };

//     const allReviews = [
//         ...firebaseComments
//             .slice()
//             .sort((a, b) =>
//                 (b.createdAt instanceof Date ? b.createdAt.getTime() : 0) -
//                 (a.createdAt instanceof Date ? a.createdAt.getTime() : 0)
//             ),
//         ...apiReviews
//     ];

//     if ((isApiLoading && currentPage === 1) || loadingFirebase) {
//         return <div className="reviews-loading">Loading reviews...</div>;
//     }

//     if ((isApiError && currentPage === 1) || errorFirebase) {
//         return <div className="reviews-error">Error loading reviews</div>;
//     }

//     if (allReviews.length === 0 && !isApiLoading && !loadingFirebase) {
//         return <div className="no-reviews">No reviews yet.</div>;
//     }

//     return (
//         <div className="showing-review-container">
//             <div className="showing-review-header">
//                 Showing {allReviews.length} review{allReviews.length !== 1 ? 's' : ''}
//             </div>

//             <div className="reviews-scroll-area">
//                 {allReviews.map((review, index) => {
//                     const reviewerName =  review?.user?.name || 'Anonymous User';
//                     const reviewerComment =  review?.content;
//                     const reviewCreatedAt = review?.epochms ? new Date(review.epochms) : null; 

//                     return (
//                         <div key={index} className="showing-one-review">
//                             <div className="showing-reviewer-image">
//                                 <img src={ProjectImages.BLANK_PROFILE} alt={reviewerName} className="reviewer-image" />
//                             </div>

//                             <div className="showing-review-text-info">
//                                 <div className="review-date">
//                                     {reviewCreatedAt ? new Date(reviewCreatedAt).toLocaleDateString('en-US', {
//                                         year: 'numeric',
//                                         month: 'long',
//                                         day: 'numeric'
//                                     }) : ''}
//                                 </div>

//                                 <h4 className="reviewer-name">{reviewerName}</h4>
//                                 <p className="review-description">{reviewerComment}</p>
//                             </div>
//                         </div>
//                     );
//                 })}

//                 {showLoadMore && (
//                     <div className="load-more-container">
//                         <button
//                             onClick={handleLoadMore}
//                             className="load-more-button"
//                             disabled={isApiLoading}
//                         >
//                             {isApiLoading ? "Loading..." : "Load More Reviews"}
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default ShowingReview;







// import "./ShowingReview.css";
// import { useState, useEffect, useCallback } from "react";
// import { useGetTourReviewQuery } from "../../../../../../Services/Api/module/demoApi";
// import { ProjectImages } from "../../../../../../assets/ProjectImages";
// import { useParams } from "react-router-dom";
// import { db } from "../../../../../../firebaseConfig";
// import { collection, getDocs, query, where } from "firebase/firestore";

// // Define interfaces for type safety
// interface FirebaseComment {
//   name?: string;
//   textContent?: string;
//   createdAt?: { toDate: () => Date } | Date;
// }

// interface ApiReview {
//   user?: { name?: string };
//   content?: string;
//   epochMs?: number;
// }

// interface UnifiedReview {
//   name: string;
//   content: string;
//   createdAt: Date;
// }

// interface ShowingReviewProps {
//   tourId: string;
//   reviewSubmitted: boolean;
// }

// function ShowingReview({ tourId, reviewSubmitted }: ShowingReviewProps) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [apiReviews, setApiReviews] = useState<ApiReview[]>([]);
//   const [firebaseComments, setFirebaseComments] = useState<FirebaseComment[]>([]);
//   const [showLoadMore, setShowLoadMore] = useState(true);
//   const [loadingFirebase, setLoadingFirebase] = useState(true);
//   const [errorFirebase, setErrorFirebase] = useState<Error | null>(null);

//   const { data: apiData, isLoading: isApiLoading, isError: isApiError } = useGetTourReviewQuery({
//     tourId,
//     page: currentPage,
//   });

//   const { slugId } = useParams<{ slugId: string }>();

//   // Fetch Firebase comments
//   const fetchFirebaseComments = useCallback(async () => {
//     setLoadingFirebase(true);
//     try {
//       if (slugId) {
//         const commentsRef = collection(db, "tour-review");
//         const q = query(commentsRef, where("slugId", "==", slugId));
//         const querySnapshot = await getDocs(q);
//         const comments: FirebaseComment[] = querySnapshot.docs.map((doc) => {
//           const data = doc.data();
//           return {
//             ...data,
//             createdAt: data.createdAt
//               ? (data.createdAt as { toDate: () => Date }).toDate?.() || new Date()
//               : new Date(),
//           } as FirebaseComment;
//         });
//         setFirebaseComments(comments);
//       }
//     } catch (error: any) {
//       setErrorFirebase(error);
//       console.error("Error fetching Firebase comments:", error);
//     } finally {
//       setLoadingFirebase(false);
//     }
//   }, [slugId]);

//   // Fetch Firebase comments when slugId or reviewSubmitted changes
//   useEffect(() => {
//     fetchFirebaseComments();
//   }, [fetchFirebaseComments, reviewSubmitted]);

//   // Update API reviews when new data is fetched
//   useEffect(() => {
//     if (apiData?.data) {
//       setApiReviews((prev) => [...prev, ...apiData.data]);
//       setShowLoadMore(apiData.data.length > 0);
//     }
//   }, [apiData]);

//   const handleLoadMore = () => {
//     if (!isApiLoading) {
//       setCurrentPage((prev) => prev + 1);
//     }
//   };

//   // Combine and sort reviews from Firebase and API
//   const allReviews: UnifiedReview[] = [
//     ...firebaseComments.map((comment) => ({
//       name: comment.name || "Anonymous User",
//       content: comment.textContent || "",
//       createdAt: comment.createdAt instanceof Date ? comment.createdAt : new Date(),
//     })),
//     ...apiReviews.map((review) => ({
//       name: review.user?.name || "Anonymous User",
//       content: review.content || "",
//       createdAt: review.epochMs ? new Date(review.epochMs) : new Date(),
//     })),
//   ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

//   // Handle loading state
//   if ((isApiLoading && currentPage === 1) || loadingFirebase) {
//     return <div className="reviews-loading">Loading reviews...</div>;
//   }

//   // Handle error state
//   if ((isApiError && currentPage === 1) || errorFirebase) {
//     return <div className="reviews-error">Error loading reviews</div>;
//   }

//   // Handle no reviews
//   if (allReviews.length === 0) {
//     return <div className="no-reviews">No reviews yet.</div>;
//   }

//   return (
//     <div className="showing-review-container">
//       <div className="showing-review-header">
//         Showing {allReviews.length} review{allReviews.length !== 1 ? "s" : ""}
//       </div>

//       <div className="reviews-scroll-area">
//         {allReviews.map((review, index) => (
//           <div key={index} className="showing-one-review">
//             <div className="showing-reviewer-image">
//               <img
//                 src={ProjectImages.BLANK_PROFILE}
//                 alt={review.name}
//                 className="reviewer-image"
//               />
//             </div>

//             <div className="showing-review-text-info">
//               <div className="review-date">
//                 {review.createdAt.toLocaleDateString("en-US", {
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                 })}
//               </div>

//               <h4 className="reviewer-name">{review.name}</h4>
//               <p className="review-description">{review.content}</p>
//             </div>
//           </div>
//         ))}

//         {showLoadMore && (
//           <div className="load-more-container">
//             <button
//               onClick={handleLoadMore}
//               className="load-more-button"
//               disabled={isApiLoading}
//             >
//               {isApiLoading ? "Loading..." : "Load More Reviews"}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ShowingReview;






import "./ShowingReview.css";
import { useState, useEffect, useCallback } from "react";
import { useGetTourReviewQuery } from "../../../../../../Services/Api/module/demoApi";
import { ProjectImages } from "../../../../../../assets/ProjectImages";
import { useParams } from "react-router-dom";
import { db } from "../../../../../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

interface FirebaseComment {
  name?: string;
  textContent?: string;
  createdAt?: { toDate: () => Date } | Date;
  averageRating?: number;
}

interface ApiReview {
  user?: { name?: string };
  content?: string;
  epochMs?: number;
  numericRating?: number;
}

interface UnifiedReview {
  name: string;
  content: string;
  createdAt: Date;
  rating: number;
}

interface ShowingReviewProps {
  tourId: string;
  reviewSubmitted: boolean;
}

function ShowingReview({ tourId, reviewSubmitted }: ShowingReviewProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [apiReviews, setApiReviews] = useState<ApiReview[]>([]);
  const [firebaseComments, setFirebaseComments] = useState<FirebaseComment[]>([]);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [loadingFirebase, setLoadingFirebase] = useState(true);
  const [errorFirebase, setErrorFirebase] = useState<Error | null>(null);
  const [averageRating, setAverageRating] = useState<number | null>(null);

  const { data: apiData, isLoading: isApiLoading, isError: isApiError } = useGetTourReviewQuery({
    tourId,
    page: currentPage,
  });

  const { slugId } = useParams<{ slugId: string }>();

  const fetchFirebaseComments = useCallback(async () => {
    setLoadingFirebase(true);
    try {
      if (slugId) {
        const commentsRef = collection(db, "tour-review");
        const q = query(commentsRef, where("slugId", "==", slugId));
        const querySnapshot = await getDocs(q);
        const comments: FirebaseComment[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data,
            createdAt: data.createdAt
              ? (data.createdAt as { toDate: () => Date }).toDate?.() || new Date()
              : new Date(),
            averageRating: data.averageRating || 0,
          } as FirebaseComment;
        });
        setFirebaseComments(comments);
      }
    } catch (error: any) {
      setErrorFirebase(error);
      console.error("Error fetching Firebase comments:", error);
    } finally {
      setLoadingFirebase(false);
    }
  }, [slugId]);

  useEffect(() => {
    fetchFirebaseComments();
  }, [fetchFirebaseComments, reviewSubmitted]);

  useEffect(() => {
    if (apiData?.data) {
      setApiReviews((prev) => [...prev, ...apiData.data]);
      setShowLoadMore(apiData.data.length > 0);
    }
  }, [apiData]);

  useEffect(() => {
    const allRatings = [
      ...firebaseComments.map((comment) => comment.averageRating || 0),
      ...apiReviews.map((review) => review.numericRating || 0),
    ];

    if (allRatings.length > 0) {
      const avg = allRatings.reduce((sum, rating) => sum + rating, 0) / allRatings.length;
      setAverageRating(Number(avg.toFixed(1)));
    } else {
      setAverageRating(null);
    }
    console.log("Average rating:", averageRating);
  }, [firebaseComments, apiReviews]);

  const handleLoadMore = () => {
    if (!isApiLoading) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const allReviews: UnifiedReview[] = [
    ...firebaseComments.map((comment) => ({
      name: comment.name || "Anonymous User",
      content: comment.textContent || "",
      createdAt: comment.createdAt instanceof Date ? comment.createdAt : new Date(),
      rating: comment.averageRating || 0,
    })),
    ...apiReviews.map((review) => ({
      name: review.user?.name || "Anonymous User",
      content: review.content || "",
      createdAt: review.epochMs ? new Date(review.epochMs) : new Date(),
      rating: review.numericRating || 0,
    })),
  ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  if ((isApiLoading && currentPage === 1) || loadingFirebase) {
    return <div className="reviews-loading">Loading reviews...</div>;
  }

  if ((isApiError && currentPage === 1) || errorFirebase) {
    return <div className="reviews-error">Error loading reviews</div>;
  }

  if (allReviews.length === 0) {
    return <div className="no-reviews">No reviews yet.</div>;
  }

  return (
    <div className="showing-review-container">
      <div className="showing-review-header">
        Showing review{allReviews.length !== 1 ? "s" : ""}
        {/* {averageRating !== null && (
          <span className="average-rating">
            {" "}
            (Average: {averageRating} <i className="fa-solid fa-star star-icon"></i>)
          </span>
        )} */}
      </div>

      <div className="reviews-scroll-area">
        {allReviews.map((review, index) => (
          <div key={index} className="showing-one-review">
            <div className="showing-reviewer-image">
              <img
                src={ProjectImages.BLANK_PROFILE}
                alt={review.name}
                className="reviewer-image"
              />
            </div>

            <div className="showing-review-text-info">
              <div className="review-date">
                {review.createdAt.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>

              <h4 className="reviewer-name">{review.name}</h4>
              {review.rating > 0 && (
                <div className="review-rating">
                  {review.rating} <i className="fa-solid fa-star star-icon"></i>
                </div>
              )}
              <p className="review-description">{review.content}</p>
            </div>
          </div>
        ))}

        {showLoadMore && (
          <div className="load-more-container">
            <button
              onClick={handleLoadMore}
              className="load-more-button"
              disabled={isApiLoading}
            >
              {isApiLoading ? "Loading..." : "Load More Reviews"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowingReview;