import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { useGetDateAndTimeQuery } from '../../../../../Services/Api/module/demoApi';
import './DateTimeBooking.css';

function DateTimeComponent({ sendDateTime }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  function handleDateChange(date: any) {
    const formattedDate = date ? format(date, 'yyyy-MM-dd') : 'date error';

    setSelectedDate(formattedDate);
    setSelectedTime(null);
    AvailableTime.length =0;
   // if (selectedTime) sendDateTime([formattedDate, selectedTime]);
  }

  function handleTimeChange(e) {
    setSelectedTime(e.target.value);
    if (selectedDate) sendDateTime([selectedDate, e.target.value]);
  }

  const { slugId } = useParams();
  const slugValue = slugId;
  const { data: res } = useGetDateAndTimeQuery(
    { slugValue, date: selectedDate },
    { skip: !selectedDate }
  );

  const AvailableTime =
    res?.data?.map((item) => item.start.slice(11, 16)) || [];

  return (
    <>
      <div className="bookNow-date-time-container">
        <DatePicker
          className="book-now-date-time"
          selected={selectedDate ? new Date(selectedDate) : null}
          onChange={handleDateChange}
          minDate={new Date()}
          dateFormat="yyyy-MM-dd"
          placeholderText="Choose date"
        />
        <br />
        <br />
        <span className="book-now-minor-heading">Time</span>
        <br />

        <select
          className="book-now-date-time"
          value={selectedTime}
          onChange={handleTimeChange}
        >
          <option value="choose time" disabled>
            choose time
          </option>

          {AvailableTime?.map((timeSlot) => (
            <option value={timeSlot}> {timeSlot} </option>
          ))}
        </select>
      </div>
      <br />
    </>
  );
}
export default DateTimeComponent;
