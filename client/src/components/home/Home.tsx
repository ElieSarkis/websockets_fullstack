import { useState, useEffect } from 'react';
import webSocketService from '../../services/WebSocketService';
import './Home.css';

const Home = () => {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleNewBooking = () => {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    };

    webSocketService.on('newBooking', handleNewBooking);

    return () => {
      webSocketService.off('newBooking', handleNewBooking);
    };
  }, []);

  return (
    <div>
      This is the home section, only accessible by roles with "user". In this
      page we will see a popup whenever a new data is added real time
      {showNotification && (
        <div className="notification">New booking added!</div>
      )}
    </div>
  );
};

export default Home;
