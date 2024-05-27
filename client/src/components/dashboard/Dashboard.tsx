import React from 'react';
import Navbar from '../navbar/navbar';

interface DashboardProps {
  setLoggedIn: (loggedIn: boolean) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setLoggedIn }) => {
  return <Navbar setLoggedIn={setLoggedIn} />;
};

export default Dashboard;
