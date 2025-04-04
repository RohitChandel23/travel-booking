import "./TourBookingDetail.css";
import { useState, useEffect } from "react";
import DateTimeComponent from "./Shared/DateTimeComponent";
import { db, collection, addDoc } from "../../../firebaseConfig";
import { toast } from 'react-toastify';

interface tourBookingDetailProps {
  tourPrice: string;
}

function TourBookingDetail({ tourPrice }: tourBookingDetailProps) {
  const [adultsCount, setAdults] = useState(0);
  const [kidsCount, setKidsCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedDateTime, setSelectedDateTime] = useState<
    [string | null, string | null]
  >([null, null]);

  function handleDecrement(peopleType: string): void {
    if (peopleType == "Adults" && adultsCount) setAdults((count) => count - 1);
    else if (peopleType == "Kids" && kidsCount)
      setKidsCount((count) => count - 1);
    else if (peopleType == "Children" && childrenCount)
      setChildrenCount((count) => count - 1);
  }

  function handleIncrement(peopleType: string): void {
    console.log(selectedDateTime);
    if (peopleType == "Adults") setAdults((count) => count + 1);
    else if (peopleType == "Kids") setKidsCount((count) => count + 1);
    else if (peopleType == "Children") setChildrenCount((count) => count + 1);
  }

  useEffect(() => {
    setTotalPrice(
      (childrenCount + kidsCount + adultsCount) * Number(tourPrice) || 0
    );
    console.log("total price :", totalPrice);
  }, [childrenCount, kidsCount, adultsCount]);

  const handleBooking = async () => {
    const bookingDetail = {
      //make it dynamic
      userName: "john",
      totalPrice: totalPrice,
      tickets: kidsCount + childrenCount + adultsCount,
    };
    if(!bookingDetail.userName || !bookingDetail.totalPrice || !bookingDetail.tickets){
      console.log(bookingDetail.tickets)
      toast.error("All fields are required")
      return;
    }


    try {
      const docRef = await addDoc(collection(db, "bookings"), bookingDetail);
      toast.success(`booked successfully ${docRef}`);
    } catch (error) {
      toast.error(`error in booking ${error}`);
    }
  };

  // this function will be send to the child component to get the data
  function getDateTime(DateTimeData: any) {
    setSelectedDateTime(DateTimeData);
    console.log("working..........", DateTimeData);
  } 

  return (
    <>
      <h3 className="tour-booking-price-title">
        ${tourPrice} <span>/ person</span>
      </h3>
      <div className="tour-booking-input-details">
        <div className="">
          <label className="book-now-minor-heading">Date</label>
          <DateTimeComponent sendDateTime={getDateTime} />{" "}
        </div>

        <span className="book-now-minor-heading">Ticket</span>
        <div className="booking-people-category">
          <label htmlFor="adult" className="ticket-label">
            Adults (18+ years)
          </label>
          <div className="booking-detail-btn-group">
            <button
              className="increment-decrement-btn"
              onClick={() => handleDecrement("Adults")}
            >
              -
            </button>
            <input
              className="increment-decrement-btn"
              type="text"
              value={adultsCount}
            />
            <button
              className="increment-decrement-btn"
              onClick={() => handleIncrement("Adults")}
            >
              +
            </button>
          </div>
        </div>

        <div className="booking-people-category">
          <label htmlFor="kids" className="ticket-label">
            Kids (12+ years)
          </label>
          <div className="booking-detail-btn-group">
            <button
              className="increment-decrement-btn"
              onClick={() => handleDecrement("Kids")}
            >
              -
            </button>
            <input
              className="increment-decrement-btn"
              type="text"
              value={kidsCount}
            />
            <button
              className="increment-decrement-btn"
              onClick={() => handleIncrement("Kids")}
            >
              +
            </button>
          </div>
        </div>

        <div className="booking-people-category">
          <label htmlFor="Children" className="ticket-label">
            Children (3+ years)
          </label>
          <div className="booking-detail-btn-group">
            <button
              className="increment-decrement-btn"
              onClick={() => handleDecrement("Children")}
            >
              -
            </button>
            <input
              className="increment-decrement-btn"
              type="text"
              value={childrenCount}
            />
            <button
              className="increment-decrement-btn"
              onClick={() => handleIncrement("Children")}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="booking-detail-total">
        <span className="ticket-label">Total</span>
        <span className="project-theme-color book-now-total-price">
          ${totalPrice}
        </span>
      </div>
      <br />
      <button className="book-now-button" onClick={handleBooking}>
        Book Now
      </button>
    </>
  );
}
export default TourBookingDetail;
