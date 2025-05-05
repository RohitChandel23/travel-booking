import { useState, useEffect, useCallback } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../../../../firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';

import "./TourReview.css";
import AddReview from "./AddReview";
import ReviewItem from "./ReviewItem";
import ShowingReview from "./ShowingReview";

interface TourReviewProps {
  readonly tourRating: string | number;
  readonly tourId: string;
  readonly slugValue: string;
}

function TourReview({ tourRating, tourId, slugValue }: TourReviewProps) {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [canAddReview, setCanAddReview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewSubmitted, setReviewSubmitted] = useState(false); 

  const rating = typeof tourRating === 'number' ? tourRating.toString() : tourRating || 'N/A';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  function generateRatingCategory(ratingValue: number): string {
    if (ratingValue >= 4) return "Excellent";
    if (ratingValue < 3) return "Bad";
    return "Good";
  }

  useEffect(() => {
    const checkBookingStatus = async () => {
      if (authLoading || !user) {
        setIsLoading(false);
        setCanAddReview(false);
        return;
      }

      setCanAddReview(false);
      setIsLoading(true);

      const currentUserId = user.uid;

      if (!currentUserId || !tourId || !slugValue) {
        setIsLoading(false);
        return;
      }

      try {
        const bookingsRef = collection(db, 'bookings');
        const q = query(
          bookingsRef,
          where('userId', '==', currentUserId),
          where('slugValue', '==', slugValue)
        );

        const querySnapshot = await getDocs(q);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let foundPastBooking = false;

        querySnapshot.forEach((doc) => {
          if (foundPastBooking) return;

          const bookingData = doc.data();
          if (bookingData.date && typeof bookingData.date === 'string') {
            try {
              const bookingDate = new Date(bookingData.date);
              const eligibilityDate = new Date(bookingDate);
              eligibilityDate.setDate(eligibilityDate.getDate() + 1);
              eligibilityDate.setHours(0, 0, 0, 0);

              if (eligibilityDate <= today) {
                foundPastBooking = true;
              }
            } catch (parseError) {
              console.error("Error parsing booking date:", bookingData.date, parseError);
            }
          }
        });

        setCanAddReview(foundPastBooking);

      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkBookingStatus();

  }, [user, authLoading, tourId, slugValue]);

  const handleReviewSubmit = useCallback(() => {
    setReviewSubmitted((prev) => !prev); 
  }, []);

  const ratingNumber = typeof tourRating === 'number' ? tourRating : parseFloat(rating);
  const ratingCategory = !isNaN(ratingNumber) ? generateRatingCategory(ratingNumber) : "N/A";

  return (
    <div className="tour-review-section">
      {tourRating ? (
        <div className="average-review-section">
          <div className="total-average-reviews">
            <h2 className="project-heading-font">{rating}</h2>
            <p>
              <i className="fa-solid fa-star" />
              {ratingCategory}
            </p>
          </div>
          <div className="review-item">
            <ReviewItem tourRating={rating} tourRatingName="Service" />
            <ReviewItem tourRating={rating} tourRatingName="Location" />
            <ReviewItem tourRating={rating} tourRatingName="Price" />
          </div>
          <div className="review-item">
            <ReviewItem tourRating={rating} tourRatingName="Food" />
            <ReviewItem tourRating={rating} tourRatingName="Amenities" />
            <ReviewItem tourRating={rating} tourRatingName="Quality" />
          </div>
        </div>
      ) : ""}

      {isLoading && (
          <p>Checking eligibility to review...</p>
      )}

      {!isLoading && user && canAddReview && (
          <AddReview onReviewSubmit={handleReviewSubmit} /> 
      )}

      <ShowingReview tourId={tourId} reviewSubmitted={reviewSubmitted} /> 
    </div>
  );
}

export default TourReview;