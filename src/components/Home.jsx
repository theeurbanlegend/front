import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

import axios from 'axios';

const socket = io.connect('https://tally-monitor-engine.onrender.com');


const Home = () => {
  const navigate=useNavigate()
  const [userStats, setUserStats] = useState({ verifiedUsersCount: 0, totalUsersCount: 0, exeTime: 0 });
  const [nextPulseTime, setNextPulseTime] = useState(null);
  const [countdown, setCountdown] = useState(1200); // Initial countdown in seconds (20 minutes)
  const [updateTimes, setUpdateTimes] = useState([]);

  useEffect(() => {
    const handleUserVerificationStats =async ({  verified,  allUsers, exeTime }) => {
      setUserStats({ verifiedUsersCount: verified, totalUsersCount: allUsers, exeTime });
      

      // Calculate the next pulse time (assuming it comes every 3 seconds)
      const now = new Date();
      const nextPulse = new Date(now.getTime() + 20 * 60 * 1000); // 10 minutes later
      setNextPulseTime(nextPulse);

      // Update the history of update times


      // Reset countdown to 10 minutes when new data is received
      setCountdown(1200);
    };
    // Listen for the 'userVerificationStats' event
    socket.on('userVerificationStats', handleUserVerificationStats);

    // Update countdown every second
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Clean up the event listener and countdown interval when the component unmounts
    return () => {
      
      socket.off('userVerificationStats', handleUserVerificationStats);
      clearInterval(countdownInterval);
    };
  }, []);
  const initializeValuesFromDatabase = async () => {
    try {
      // Fetch the most recent entry from the database
      const response = await axios.get('https://tally-monitor-engine.onrender.com/api/pulseData/recent');

      // Extract relevant data from the response
      const { verified, allUsers, exeTime,createdAt } = response.data;

      // Update state with the values
      setUserStats({ verifiedUsersCount: verified, totalUsersCount: allUsers, exeTime });
      
      // Calculate the next pulse time (assuming it comes every 3 seconds)
      // Calculate the next pulse time
      const nextPulse = new Date(createdAt);
      nextPulse.setMinutes(nextPulse.getMinutes() + 20); // 10 minutes later
      setNextPulseTime(nextPulse);

      // Calculate the countdown timer
      const countdownTimer = Math.max(0, Math.floor((nextPulse - Date.now()) / 1000));
      setCountdown(countdownTimer);
      // Update the history of update tim
    } catch (error) {
      console.error('Error initializing values from the database:', error);
    }
  }
  useEffect(()=>{
    initializeValuesFromDatabase()
  },[])

  // Calculate the percentage of verified users
  const verifiedUsersPercentage = Math.round((userStats.verifiedUsersCount / userStats.totalUsersCount) * 100);
  const formattedNextPulseTime = nextPulseTime
    ? `${nextPulseTime.toLocaleTimeString()} (in 20 minutes)`
    : 'Calculating...';

  // Format the countdown timer
  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  const formattedCountdown = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="app-container">
      <div className="logo-container">
        {/* Add your logo here */}
        {/* You can use an image tag or another component for your logo */}
        <img src="tally.jpeg" alt="Logo" />
      </div>
      <div className="status-container">
        <div className="circle pulse green"></div>
        <p className="status-text">All systems operational</p>
      </div>
      <div className="user-stats-container">
        <p>Verified Users: {userStats.verifiedUsersCount}</p>
        <p>Total Users: {userStats.totalUsersCount}</p>
        <div className="progress-bar" style={{ width: '100%', backgroundColor: '#ddd' }}>
          <div style={{ width: `${verifiedUsersPercentage}%`, backgroundColor: '#4CAF50', height: '24px' }}>{verifiedUsersPercentage}%</div>
        </div>
        <p>Last  update Time: {userStats.exeTime} seconds</p>
        <p>Next pulse from server at {formattedNextPulseTime}</p>
        <p>Next pulse in {formattedCountdown}</p>
        <button onClick={()=>{navigate('/pulses/charts')}}>Go to Charts</button>
        <button onClick={()=>{navigate('/pulses/table')}}>History</button>
      </div>
    </div>
  );
};

export default Home;
