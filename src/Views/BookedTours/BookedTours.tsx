import "./BookedTours.css";
import { useEffect, useState } from "react";
import { db, auth } from '../../firebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
// import { orderBy } from "firebase/firestore"; 
import { ROUTES_CONFIG } from "../../Shared/Constants";
import { Link } from "react-router-dom";


interface Booking {
  id: string;
  tourName: string;
  slugValue: string;
  tickets: number;
  date: string;
  time: string;
  totalEthPrice: number;
  tourBookedAt:string;
}

function BookedTours() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // const q = query(
          //   collection(db, "bookings"),
          //   where("userId", "==", currentUser.uid)
          // );
          const q = query(
            collection(db, "bookings"),
            where("userId", "==", currentUser.uid)          );
          
          const querySnapshot = await getDocs(q);
          const bookingsData: Booking[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Booking, "id">), 
          }));

          
          console.log("...yooyoy...",bookingsData);
          setBookings(bookingsData);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setBookings([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p className="loading-text">Loading bookings...</p>;

  return (
    <div className="booked-tours-container">
      <h2 className="page-title">My Booked Tours</h2>
      {bookings.length === 0 ? (
        <p className="no-bookings-msg">You haven’t booked any tours yet.</p>
      ) : (
        <div className="bookings-table">
          <div className="table-header">
            <div className="table-cell tour-name-cell">Tour Name</div>
            <div className="table-cell">Tickets</div>
            <div className="table-cell">Date</div>
            <div className="table-cell">Time</div>
            <div className="table-cell">Price</div>
          </div>
          {bookings.map((booking) => (
            <div className="table-row" key={booking.id}>
              <div className="table-cell tour-name-cell"><Link to={ROUTES_CONFIG.TOURS_DETAIL.path.replace(':slugId',booking.slugValue)} className="link-class">{booking.tourName}</Link></div>
              <div className="table-cell">{booking.tickets}</div>
              <div className="table-cell">{booking.date}</div>
              <div className="table-cell">{booking.time}</div>
              <div className="table-cell">
                {Number(booking.totalEthPrice).toFixed(5)} ETH
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookedTours;
