import { useParams } from "react-router-dom";
import "./TourDetail.css";
import { useGetTourDetailQuery } from "../../Services/Api/module/demoApi";
import MapComponent from "../../Shared/MapComponent";
import TourBookingDetail from "./TourBookingDetail";
import TourReview from "./TourBookingDetail/Shared/TourReview";
import CalendarComponent from "./TourBookingDetail/Shared/CalendarComponent/index";
import IncludeExclude from "./TourBookingDetail/Shared/IncludeExclude";
import { useEffect, useState } from "react";
import SharePopup from "../../Shared/SharePopup/SharePopup";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";

function TourDetail() {
  const ethPrice = 1765;
  const [showShareOptions, setShowShareOptions] = useState(false);

  const { slugId } = useParams<{ slugId: string | undefined }>();
  const slugValue = slugId ?? "";
  const { data } = useGetTourDetailQuery(slugValue);
  const tourData = data?.data;
  const tourName = tourData?.name;
  const tourCity: string = tourData?.ufiDetails?.bCityName;
  const tourCountry = tourData?.ufiDetails?.url?.country;

  const tourRating = tourData?.reviewsStats?.combinedNumericStats?.average;
  const tourReviewCount = tourData?.reviewsStats?.combinedNumericStats?.total;

  const usdPrice = tourData?.representativePrice?.chargeAmount || "N/A";
  const tourPrice = ethPrice ? (usdPrice / ethPrice).toFixed(5) : null;

  const tourDescription = tourData?.description;
  const tourAllImages = tourData?.photos;
  const tourImageItem = tourAllImages?.find((item: any) => item?.isPrimary);
  const tourImage = tourImageItem?.medium || tourImageItem?.small;
  const tourId = tourData?.id;
  const includedItems = tourData?.whatsIncluded;
  const includedClassName = "fa-solid fa-check";
  const excludedItems = tourData?.notIncluded;
  const excludedClassName = "fa-solid fa-xmark";

  const includedItemsObj = { includedItems, includedClassName };
  const excludedItemsObj = { excludedItems, excludedClassName };
  const includedExcludedObj = { includedItemsObj, excludedItemsObj };
  const [selectedCalendarDate, setSelectedCalendarDate] = useState("");

  const [firebaseRating, setFirebaseRating] = useState<number>(0);
  const [firebaseReviewCount, setFirebaseReviewCount] = useState<number>(0);

  const totalCombinedReviews = (tourReviewCount ?? 0) + firebaseReviewCount;
  const totalRatingSum =
  (tourRating ?? 0) * (tourReviewCount ?? 0) +
  firebaseRating * firebaseReviewCount;
  const finalCombinedAverage =
  totalCombinedReviews > 0 ? totalRatingSum / totalCombinedReviews : 0;



  function handleCalendarSelectedDate(date: string) {
    setSelectedCalendarDate(date);
  }

  useEffect(() => {
    if (!slugId) return;
  
    const unsubscribe = onSnapshot(
      collection(db, "tour-review"),
      (snapshot) => {
        const relevantDocs = snapshot.docs.filter(
          (doc) => doc.data().slugId === slugId
        );
  
        const total = relevantDocs.length;
  
        const ratings = relevantDocs
          .map((doc) => doc.data().averageRating)
          .filter((rating) => typeof rating === "number");
  
        const avg =
          ratings.length > 0
            ? ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length
            : 0;
  
        setFirebaseReviewCount(total);
        setFirebaseRating(avg);
      },
      (err) => console.error("Firestore fetch error:", err)
    );
  
    return () => unsubscribe();
  }, [slugId]);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="tour-detail-section">
      <div className="tour-detail-container">
        <div className="tour-detail-image-container">
          {tourImage ? (
            <img className="tour-image" src={tourImage} alt={tourImage} />
          ) : (
            <p></p>
          )}
        </div>

        {/* <div className="tour-detail-video-gallery-div">
            <button className="video-gallery-btn">
              Video <i className="fa-solid fa-video" />
            </button>
            <button className="video-gallery-btn">
              Gallery <i className="fa-regular fa-image" />
            </button>
          </div> */}

        <div className="tour-detail-location-share">
          <div className="tour-detail-location">
            <p className="project-normal-font">
              {" "}
              <i className="fa-solid fa-location-dot" /> {tourCity},{" "}
              {tourCountry?.toUpperCase()} {"  "}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(tourCity)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="project-theme-color"
              >
                view on map
              </a>
            </p>
          </div>
          <div className="tour-detail-share">
            <div className="share-button-wrapper">
              <button
                onClick={() => setShowShareOptions(true)}
                className="share-button btn-as-container"
                aria-label="Share"
              >
                <i className="fa-solid fa-share-nodes share-icon" />
              </button>

              {showShareOptions && (
                <SharePopup
                  url={window.location.href}
                  onClose={() => setShowShareOptions(false)}
                />
              )}
            </div>

            {/* <i className="fa-regular fa-heart" /> */}
          </div>
        </div>
        <h3 className="tour-title-name project-heading-font">{tourName}</h3>

        <div className="tour-features-container">
          <div className="tour-feature">
            <span className="tour-feature-heading">From</span>
            <span className="tour-feature-value project-theme-color project-normal-font">
              {tourPrice !== "NaN" ? `${tourPrice} ETH` : "Loading..."}
            </span>
          </div>

          <div className="tour-feature">
            <span className="tour-feature-heading">Duration</span>
            <span className="tour-feature-value project-normal-font">
              1 day
            </span>
          </div>

          <div className="tour-feature">
            <span className="tour-feature-heading">Max People</span>
            <span className="tour-feature-value project-normal-font">20</span>
          </div>

          <div className="tour-feature">
            <span className="tour-feature-heading">Min Age</span>
            <span className="tour-feature-value project-normal-font">3</span>
          </div>

          <div className="tour-feature">
            <span className="tour-feature-heading">Tour Type</span>
            <span className="tour-feature-value project-normal-font">
              Adventure
            </span>
          </div>

          <div className="tour-feature">
            <span className="tour-feature-heading">Reviews</span>

            {tourRating ? (
              <span className="tour-feature-value project-normal-font">
                <i className="fa-solid fa-star project-theme-color" />{" "}
                {finalCombinedAverage.toFixed(1)}{" "}
                <span className="project-normal-font">
                  ({totalCombinedReviews} reviews){" "}
                </span>
              </span>
            ) : (
              <b>N/A</b>
            )}
          </div>
        </div>

        <div className="tour-detail-overview">
          <h5 className="detail-page-minor-title">Overview</h5>
          <p className="project-normal-font"> {tourDescription} </p>
        </div>

        <div className="include-exclude-container">
          <h5 className="detail-page-minor-title">Included / Exclude</h5>
          <IncludeExclude itemsObj={includedExcludedObj} />
        </div>

        <div className="calendar-section">
          <h5 className="detail-page-minor-title">Calendar & Prices</h5>
          <CalendarComponent
            tourPrice={tourPrice}
            handleCalendarSelectedDate={handleCalendarSelectedDate}
          />{" "}
        </div>

        <div className="tour-location-map">
          <MapComponent
            cityName={tourCity}
            mapHeadingText="Map"
            zoomLevel={7}
          />
        </div>

        <div className="tour-detail-review">
          {tourRating ? (
            <h5 className="project-heading-font">Average Reviews</h5>
          ) : (
            ""
          )}
          {/* <TourReview tourRating={tourRating} tourId={tourId} /> */}
          <TourReview
            tourRating={finalCombinedAverage.toFixed(1)}
            tourId={tourId}
            slugValue={slugValue}
          />
        </div>
      </div>

      <div className="tour-booking-detail">
        {" "}
        <TourBookingDetail
          tourPrice={String(tourPrice)}
          selectedCalendarDate={selectedCalendarDate}
          tourName={tourName}
          slugValue={slugValue}
        />
      </div>
    </section>
  );
}

export default TourDetail;
