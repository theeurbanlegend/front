import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Home = ({userStats ,nextPulseTime, countdown}) => {
  console.log(userStats)
  const navigate=useNavigate()
  const [updateTimes, setUpdateTimes] = useState([]);
  // Function to initialize values from the most recent entry in the database
  
  

  // Calculate the percentage of verified users
  const verifiedUsersPercentage = Math.round((userStats.verifiedUsersCount / userStats.totalUsersCount) * 100);
  
  

  
  const formattedNextPulseTime = nextPulseTime
    ? `${nextPulseTime.toLocaleTimeString()} (in 10 minutes)`
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
          <div style={{ width: `${verifiedUsersPercentage}%`, backgroundColor: '#4CAF50', height: '24px' }}></div>
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
