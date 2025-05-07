import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { useGetDateAndTimeQuery } from '../../../../../Services/Api/module/demoApi';
import './DateTimeBooking.css';

interface DateTimeComponentProps {
  readonly sendDateTime: (dateTime: [string, string]) => void;
  readonly selectedCalendarDate: string;
  readonly id: string;
}

function DateTimeComponent({ sendDateTime, selectedCalendarDate, id }: DateTimeComponentProps) {
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

  function handleDateChange(date: any) {
    const formattedDate = date ? format(date, 'yyyy-MM-dd') : null;
    setSelectedDate(formattedDate);
    setSelectedTime(null);
  }

  function handleTimeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newTime = e.target.value;
    setSelectedTime(newTime);
    if (selectedDate)
      sendDateTime([selectedDate, newTime]);
  }

  let timeContent;

  if (isLoading || isFetching) {
    timeContent = <p className="available-time-loading">Loading available time slots...</p>;
  } else if (availableTimes.length === 0) {
    timeContent = <p className="available-time-loading no-time-available">No time slots available for this date.</p>;
  } else {
    timeContent = (

      <select
        className="book-now-date-time"
        value={selectedTime ?? 'choose time'}
        onChange={handleTimeChange}
      >
        <option value="choose time" disabled>
          choose time
        </option>
        {availableTimes.map((timeSlot: string) => (
          <option key={timeSlot} value={timeSlot}>
            {timeSlot}
          </option>
        ))}
      </select>

    );
  }

  return (
    <div className="bookNow-date-time-container">
      <DatePicker
        id={id}
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
      {timeContent}
    </div>
  );
}

export default DateTimeComponent;
