import { db, collection, addDoc } from '../../firebaseConfig';

function BookingExample() {
  async function handleBooking() {
    const bookingDetails = {
      userName: 'john doe',
      tickets: 5,
      totalPrice: 500,
    };

    try {
      const docRef = await addDoc(collection(db, 'bookings'), bookingDetails);
      alert(`Booking stored id: ${docRef.id}`);
      console.log(docRef);
    } catch (error) {
      console.error('Error in booking', error);
      alert('failed to store');
    }
  }

  return (
    <div>
      <h2>Booking exmaple using firebase</h2>
      <button onClick={handleBooking}>book now</button>
    </div>
  );
}
export default BookingExample;
