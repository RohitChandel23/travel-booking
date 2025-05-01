import "./TourBookingDetail.css";
import { useState, useEffect } from "react";
import DateTimeComponent from "./Shared/DateTimeComponent";
import { db, collection, addDoc } from "../../../firebaseConfig";
import { serverTimestamp } from "firebase/firestore"; 
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";
import ConnectWalletButton from "./Shared/BookNow/ConnectWalletButton";

import { useAppKitAccount } from "@reown/appkit/react";

interface tourBookingDetailProps {
  tourPrice: string;
  selectedCalendarDate: string;
  tourName:string;
  slugValue:string ;
}

function TourBookingDetail({
  tourPrice,
  selectedCalendarDate,
  tourName,
  slugValue
}: tourBookingDetailProps) {
  const [adultsCount, setAdults] = useState(0);
  const [kidsCount, setKidsCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedDateTime, setSelectedDateTime] = useState<
    [string | null, string | null]
  >([null, null]);

  
  const {isConnected } = useAppKitAccount();
  // console.log("working...........", isConnected);
  
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },[selectedCalendarDate]);

  function handleDecrement(peopleType: string): void {
    if (peopleType == "Adults" && adultsCount) setAdults((count) => count - 1);
    else if (peopleType == "Kids" && kidsCount)
      setKidsCount((count) => count - 1);
    else if (peopleType == "Children" && childrenCount)
      setChildrenCount((count) => count - 1);
  }

  function handleIncrement(peopleType: string): void {
    // console.log(selectedDateTime);
    if (peopleType == "Adults") setAdults((count) => count + 1);
    else if (peopleType == "Kids") setKidsCount((count) => count + 1);
    else if (peopleType == "Children") setChildrenCount((count) => count + 1);
  }

  useEffect(() => {
      const total = (childrenCount + kidsCount + adultsCount) * Number(tourPrice || 0) || 0;
      setTotalPrice(total);
  
  }, [childrenCount, kidsCount, adultsCount, tourPrice]);


  const handleBooking = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    const totalTickets = adultsCount + kidsCount + childrenCount;
  
    if (!user) {
      toast.error("Please login to book");
      return;
    }
  
    if (!selectedDateTime[0] || !selectedDateTime[1]) {
      toast.error("Please select both Date and Time");
      return;
    }
  
    if (totalTickets < 1) {
      toast.error("At least one ticket must be selected");
      return;
    }
  
    const bookingDetail = {
      userId: user.uid,
      tourName,
      slugValue,
      totalPrice,
      tickets: totalTickets,
      date: selectedDateTime[0],
      time: selectedDateTime[1],
      createdAt: serverTimestamp(),
      tourBookedAt: new Date().toISOString(), 
 
    };
    console.log(bookingDetail);
  
    try {
      const docRef = await addDoc(collection(db, 'bookings'), bookingDetail);
      toast.success('Booked successfully!');
      //here the booking is sucessfull and 
      //here reset the ticket count,


      setAdults(0);
      setKidsCount(0);
      setChildrenCount(0);


      //ending
      
      console.log("Booked...", bookingDetail);
      console.log(docRef);
    } catch (error) {
      toast.error(`Error in booking: ${error}`);
    }
  };
  
  function getDateTime(DateTimeData: any) {
    setSelectedDateTime(DateTimeData);
  }

  return (
    <>
      <h3 className="tour-booking-price-title">
        {tourPrice!="NaN"?`${tourPrice} ETH`:'Loading... '} <span>/ person</span>
      </h3>
      <div className="tour-booking-input-details">
        <div className="">
          <label className="book-now-minor-heading">Date</label>
          <DateTimeComponent
            sendDateTime={getDateTime}
            selectedCalendarDate={selectedCalendarDate}
          />{" "}
        </div>

        <span className="book-now-minor-heading ticket-heading">Ticket</span>
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
          {totalPrice.toFixed(5)} ETH
        </span>
      </div>
      <br />


      {/* <div className="wallet-btn">
        <span><ConnectWalletButton onSuccess={handleBooking} totalEthPrice = {totalPrice}
        makePayment={Boolean(selectedDateTime[0] && selectedDateTime[1] && (kidsCount || adultsCount || childrenCount) )}
        /></span>   
        <span><appkit-button/></span>
      </div> */}


      <div className="wallet-btn">
        { isConnected ? <span><ConnectWalletButton onSuccess={handleBooking} totalEthPrice = {totalPrice}
        makePayment={Boolean(selectedDateTime[0] && selectedDateTime[1] && (kidsCount || adultsCount || childrenCount) ) }
        /></span>:   
        <span><appkit-button/></span> }
      </div>

    </>
  );
}
export default TourBookingDetail;
