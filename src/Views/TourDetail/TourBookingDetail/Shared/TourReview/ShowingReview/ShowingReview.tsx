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