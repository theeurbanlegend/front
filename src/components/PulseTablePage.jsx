// PulseTablePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PulseTable from './PulseTable';
import axios from 'axios';

const PulseTablePage = () => {
  const [pulses, setPulses] = useState([]);
    const navigate=useNavigate()
  useEffect(() => {
    // Fetch pulses from your backend
    const fetchData = async () => {
        const response = await axios.get('https://tally-monitor-engine.onrender.com/api/pulseData');
        const sortedPulses = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPulses(sortedPulses);
    };

    fetchData();

    // Simulate real-time updates every 10 seconds (adjust the interval as needed)
    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    return () => {
      // Clear the interval on component unmount
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
    <button onClick={()=>{navigate('/')}}>Home</button>
      <h1>Pulse Data Table</h1>
      <PulseTable pulses={pulses} />
    </div>
  );
};

export default PulseTablePage;
