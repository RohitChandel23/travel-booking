import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { useGetDateAndTimeQuery } from '../../../../../Services/Api/module/demoApi';
import './DateTimeBooking.css';

interface DateTimeComponentProps {
  sendDateTime: (dateTime: [string, string]) => void;
  selectedCalendarDate: string;
}

function DateTimeComponent({ sendDateTime, selectedCalendarDate }: DateTimeComponentProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { slugId } = useParams();
  const slugValue = slugId;

  const {
    data: res,
    isFetching,
    isLoading,
  } = useGetDateAndTimeQuery(
    { slugValue, date: selectedDate },
    { skip: !selectedDate }
  );

  const availableTimes: string[] =
    res?.data?.map((item: { start: string }) => item?.start?.slice(11, 16)) || [];

  useEffect(() => {
    setSelectedDate(selectedCalendarDate);
  }, [selectedCalendarDate]);

  // useEffect(() => {
  //   if (selectedDate && availableTimes.length > 0) {
  //     const firstTime = availableTimes[0];
  //     setSelectedTime(firstTime);
  //     sendDateTime([selectedDate, firstTime]);
  //   } else if (selectedDate && availableTimes.length === 0) {
  //     sendDateTime([selectedDate, ""]);
  //   }
  // }, [availableTimes, selectedDate]);

  function handleDateChange(date: any) {
    const formattedDate = date ? format(date, 'yyyy-MM-dd') : null;
    setSelectedDate(formattedDate);
    setSelectedTime(null);
  }

  function handleTimeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newTime = e.target.value;
    setSelectedTime(newTime);
    if (selectedDate) sendDateTime([selectedDate, newTime]);
  }

  return (
    <div className="bookNow-date-time-container">
      <DatePicker
        className="book-now-date-time"
        selected={selectedDate ? new Date(selectedDate) : null}
        onChange={handleDateChange}
        minDate={new Date()}
        dateFormat="yyyy-MM-dd"
        placeholderText="Choose date"

        showYearDropdown
        showMonthDropdown
        dropdownMode="select"
        

  
      />

      <br />
      <br />
      <span className="book-now-minor-heading">Time</span>
      <br />

      {isLoading || isFetching ? (
        <p className='available-time-loading'>Loading available time slots...</p>
      ) : availableTimes.length === 0 ? (
        <p className='available-time-loading no-time-available'>No time slots available for this date.</p>
      ) : (
        <select
          className="book-now-date-time"
          value={selectedTime || 'choose time'}
          onChange={handleTimeChange}
        >
          <option value="choose time" disabled>
            choose time
          </option>
          {availableTimes.map((timeSlot: string, index: number) => (
            <option key={index} value={timeSlot}>
              {timeSlot}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default DateTimeComponent;






// import { useEffect, useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { useParams } from 'react-router-dom';
// import { format } from 'date-fns';
// import { useGetDateAndTimeQuery } from '../../../../../Services/Api/module/demoApi';
// import './DateTimeBooking.css';

// interface DateTimeComponentProps {
//   sendDateTime: (dateTime: [string, string]) => void;
//   selectedCalendarDate: string;
// }

// interface TimeSlot {
//   start: string;
// }

// function DateTimeComponent({ sendDateTime, selectedCalendarDate }: DateTimeComponentProps) {
//   const [selectedDate, setSelectedDate] = useState<string | null>(null);
//   const [selectedTime, setSelectedTime] = useState<string | null>(null);
//   const { slugId } = useParams();
//   const slugValue = slugId;

//   // const datePickerRef = useRef<any>(null); 

//   const {
//     data: res,
//     isFetching,
//     isLoading,
//   } = useGetDateAndTimeQuery(
//     { slugValue, date: selectedDate },
//     { skip: !selectedDate }
//   );

//   const availableTimes: string[] =
//     res?.data?.map((item: TimeSlot) => item?.start?.slice(11, 16)) || [];

//   useEffect(() => {
//     if (selectedCalendarDate && new Date(selectedCalendarDate) >= new Date()) {
//       setSelectedDate(selectedCalendarDate);
//       setSelectedTime(null); 
//       // datePickerRef.current?.setFocus();
//     }
//   }, [selectedCalendarDate]);

  
//   function handleDateChange(date: Date | null) {
//     const formattedDate = date ? format(date, 'yyyy-MM-dd') : null;
//     setSelectedDate(formattedDate);
//     setSelectedTime(null);

  
//     if (formattedDate) sendDateTime([formattedDate, '']);
//   }

  
//   function handleTimeChange(e: React.ChangeEvent<HTMLSelectElement>) {
//     const newTime = e.target.value;
//     setSelectedTime(newTime);
//     if (selectedDate) sendDateTime([selectedDate, newTime]);
//   }

//   return (
//     <div className="bookNow-date-time-container">
//       <DatePicker
//         className="book-now-date-time"
//         selected={selectedDate ? new Date(selectedDate) : null}
//         onChange={handleDateChange}
//         minDate={new Date()}
//         dateFormat="yyyy-MM-dd"
//         placeholderText="Choose date"
//         showYearDropdown
//         showMonthDropdown
//         dropdownMode="select"
//         // ref={datePickerRef}
//       />

//       <br />
//       <br />
//       <span className="book-now-minor-heading">Time</span>
//       <br />

//       {isLoading || isFetching ? (
//         <p className="available-time-loading">Loading available time slots...</p>
//       ) : availableTimes.length === 0 ? (
//         <p className="available-time-loading no-time-available">No time slots available for this date.</p>
//       ) : (
//         <select
//           className="book-now-date-time"
//           value={selectedTime ?? ''}
//           onChange={handleTimeChange}
//         >
//           <option value="" disabled>
//             Choose Time
//           </option>
//           {availableTimes.map((timeSlot: string, index: number) => (
//             <option key={index} value={timeSlot}>
//               {timeSlot}
//             </option>
//           ))}
//         </select>
//       )}
//     </div>
//   );
// }

// export default DateTimeComponent;

