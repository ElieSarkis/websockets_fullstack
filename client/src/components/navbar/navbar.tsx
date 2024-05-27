import { Link, Outlet } from 'react-router-dom';
import './navbar.css';
import webSocketService from '../../services/WebSocketService';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BookingData } from '../../types/bookingData';

interface NavbarProps {
  setLoggedIn: (loggedIn: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    webSocketService.disconnect();
    setLoggedIn(false);
    navigate('/');
  };

  const generateRandomData = () => {
    const newData: BookingData = {
      id: Math.floor(Math.random() * 1000),
      numberOfPersons: Math.floor(Math.random() * 10) + 1,
      startDate: '2024-05-25',
      startTime: '10:00',
      endDate: '2024-05-25',
      endTime: '12:00',
    };

    return newData;
  };

  const handleButtonClick = () => {
    const randomData = generateRandomData();

    axios
      .post('http://localhost:3001/bookings', randomData)
      .then((response) => {
        console.log('POST request successful:', response.data);
      })
      .catch((error) => {
        console.error('Error making POST request:', error);
      });
  };

  return (
    <div>
      <nav className="navbar">
        <Link to="home" style={linkStyle}>
          Home
        </Link>
        <Link to="calendar" style={linkStyle}>
          Calendar
        </Link>
        <Link to="booking" style={linkStyle}>
          Booking
        </Link>
        <button
          className="navbar-button"
          onClick={handleLogout}
          style={linkStyle}
        >
          Logout
        </button>

        <button
          className="navbar-button"
          onClick={handleButtonClick}
          style={linkStyle}
        >
          Send POST Request
        </button>
      </nav>
      <Outlet />
    </div>
  );
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  padding: '10px 20px',
  margin: '0 10px',
};

export default Navbar;
