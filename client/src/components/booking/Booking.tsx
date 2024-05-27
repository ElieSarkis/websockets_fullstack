import React from 'react';
import useAxiosGet from '../../hooks/useHttpGet';
import { BookingData } from '../../types/bookingData';
import BookingTable from './BookingTable';
import useWebSocketUpdate from '../../hooks/useWebSocketUpdate';

const Booking: React.FC = () => {
  const { data, isLoading, isError, error, queryKey } = useAxiosGet<
    BookingData[]
  >({
    method: 'GET',
    url: 'http://localhost:3001/bookings',
  });

  useWebSocketUpdate<BookingData>('newBooking', queryKey);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  console.log(data);

  return (
    <div>
      <h2>Bookings</h2>
      <BookingTable data={data} />
    </div>
  );
};

export default Booking;
