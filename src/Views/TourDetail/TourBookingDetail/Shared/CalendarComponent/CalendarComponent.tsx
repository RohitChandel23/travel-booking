import { useState } from "react";
import "./CalendarComponent.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface CalendarComponentProps{
tourPrice:string;
}

const CalendarComponent = ({tourPrice}:CalendarComponentProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

      const tileContent = () => (
    <div className="price-container">
      <span className="price-tag">${tourPrice}</span>
    </div>
  );

  return (
    <div className="calendar-container">

      <Calendar
        onChange={(date) => setSelectedDate(date as Date)}
        value={selectedDate}
        className="full-size-calendar"
        tileContent={tileContent} 
      />
    </div>
  );
};

export default CalendarComponent;
