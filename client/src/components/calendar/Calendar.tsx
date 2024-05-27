import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BookingData } from '../../types/bookingData';
import useAxiosGet from '../../hooks/useHttpGet';
import useWebSocketUpdate from '../../hooks/useWebSocketUpdate';

const BookingCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const {
    data: bookingsData,
    isLoading,
    isError,
    error,
    queryKey,
  } = useAxiosGet<BookingData[]>({
    method: 'GET',
    url: 'http://localhost:3001/bookings/current-month',
  });

  useWebSocketUpdate<BookingData>('newBooking', queryKey);

  const renderBookingsForDate = (date: Date) => {
    const formattedDate = date.toISOString().split('T')[0];
    const dayBookings =
      bookingsData?.filter((booking) => booking.startDate === formattedDate) ||
      [];

    if (dayBookings.length === 0) {
      return <div>No bookings for this date</div>;
    }

    return (
      <ul>
        {dayBookings.map((booking) => (
          <li key={booking.id}>
            {booking.startTime} - {booking.endTime}: {booking.numberOfPersons}{' '}
            persons
          </li>
        ))}
      </ul>
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Bookings Calendar</h2>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        inline
        readOnly
        highlightDates={bookingsData?.map(
          (booking) => new Date(booking.startDate)
        )}
        shouldCloseOnSelect={false}
        calendarClassName="custom-calendar"
      />
      {selectedDate && renderBookingsForDate(selectedDate)}
    </div>
  );
};

export default BookingCalendar;
