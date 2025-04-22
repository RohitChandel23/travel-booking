// import { useEffect, useState } from "react";
// import "./CalendarComponent.css";
// import Calendar from "react-calendar";
// import { format } from 'date-fns';

// import "react-calendar/dist/Calendar.css";

// interface CalendarComponentProps{
// tourPrice:string;
// handleCalendarSelectedDate: (value: string)=> void
// }

// const CalendarComponent = ({tourPrice, handleCalendarSelectedDate}:CalendarComponentProps) => {
//   const [selectedDate, setSelectedDate] = useState<Date>(new Date());


//   useEffect(()=>{
//     const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : 'date error';
//     handleCalendarSelectedDate(formattedDate);
//   },[selectedDate])

//       const tileContent = () => (
//     <div className="price-container">
//       <span className="price-tag">${tourPrice}</span>
//     </div>
//   );

  

//   return (
//     <div className="calendar-container">

//       <Calendar
//         onChange={(date) => setSelectedDate(date as Date)}
//         value={selectedDate}
//         className="full-size-calendar"
//         tileContent={tileContent} 
//       />
//     </div>
//   );
// };

// export default CalendarComponent;

import { useEffect, useState } from "react";
import "./CalendarComponent.css";
import Calendar from "react-calendar";
import { format } from 'date-fns';
import "react-calendar/dist/Calendar.css";

interface CalendarComponentProps {
  tourPrice: string | null;
  handleCalendarSelectedDate: (value: string) => void;
}

const CalendarComponent = ({ tourPrice, handleCalendarSelectedDate }: CalendarComponentProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : 'date error';
    handleCalendarSelectedDate(formattedDate);
  }, [selectedDate]);

  const tileContent = () => (
    <div className="price-container">
      <span className="price-tag">{tourPrice} ETH</span>
    </div>
  );

  return (
    <div className="calendar-container">
      <Calendar
        onChange={(date) => setSelectedDate(date as Date)}
        value={selectedDate}
        className="full-size-calendar"
        tileContent={tileContent}
        minDate={new Date()} 
      />
    </div>
  );
};

export default CalendarComponent;


