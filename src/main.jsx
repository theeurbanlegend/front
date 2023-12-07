import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { io } from 'socket.io-client';
import axios from 'axios';



const MainComponent = () => {
  const [socket, setSocket] = useState(null); // State to hold the socket instance
  const [userStats, setUserStats] = useState({ verifiedUsersCount: 0, totalUsersCount: 0, exeTime: 0 });
  const [nextPulseTime, setNextPulseTime] = useState(null);
  const [countdown, setCountdown] = useState(600);
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
      nextPulse.setMinutes(nextPulse.getMinutes() + 10); // 10 minutes later
      setNextPulseTime(nextPulse);

      // Calculate the countdown timer
      const countdownTimer = Math.max(0, Math.floor((nextPulse - Date.now()) / 1000));
      setCountdown(countdownTimer);
      // Update the history of update tim
    } catch (error) {
      console.error('Error initializing values from the database:', error);
    }
  }
  const initializeSocket = () => {
    const socketInstance = io.connect('https://notifs-engine.onrender.com');
    setSocket(socketInstance);

    socketInstance.on('userVerificationStats', handleUserVerificationStats);

    return () => {
      socketInstance.off('userVerificationStats', handleUserVerificationStats);
      socketInstance.disconnect(); // Disconnect the socket when the component unmounts
    };
  };
  const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });
        if (registration.installing) {
          console.log("Service worker installing");
        } else if (registration.waiting) {
          console.log("Service worker installed");
        } else if (registration.active) {
          console.log("Service worker active");
        }
      } catch (error) {
        console.error(`Registration failed with ${error}`);
      }
    }
  };

  const handleUserVerificationStats = async (data) => {
    setUserStats(data);

    const now = new Date();
    const nextPulse = new Date(now.getTime() + 10 * 60 * 1000); // 10 minutes later
    setNextPulseTime(nextPulse);

    setCountdown(600);
    await addNewPulse(data);
  };

  const addNewPulse = async (data) => {
    try {
      const response = await axios.post('https://tally-monitor-engine.onrender.com/api/pulseData/add', {
        verified: data.verifiedUsersCount,
        allUsers: data.totalUsersCount,
        exeTime: data.exeTime,
      });
      console.log('New pulse added:', response.data);
    } catch (error) {
      console.error('Error adding new pulse:', error);
    }
  };
  useEffect(() => {
    initializeValuesFromDatabase()
    registerServiceWorker();
    const cleanupSocket = initializeSocket();
    return cleanupSocket;
    
  }, []); // Empty dependency array ensures that this effect runs only once on mount

  return (
    <React.StrictMode>
      <App userStats={userStats} nextPulseTime={nextPulseTime} countdown={countdown}/>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<MainComponent />);
