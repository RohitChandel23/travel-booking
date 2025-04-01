import { useState } from 'react'; 
import './CalendarComponent.css';
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";


function CalendarComponent(){
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    return (
        <div className='calendar-container'>
            <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileContent="hello"
            >
            </Calendar>
            <h3>checking</h3>
        </div>
    )

}
export default CalendarComponent;