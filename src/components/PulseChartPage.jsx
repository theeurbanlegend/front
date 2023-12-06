// PulseChartPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PulseChart from './PulseChart';
import axios from 'axios';

const PulseChartPage = () => {
  const [pulses, setPulses] = useState([]);
    const navigate=useNavigate()
  useEffect(() => {
    // Fetch pulses from your backend
    const fetchData = async () => {
    const response = await axios.get('http://localhost:3001/api/pulseData');
      
      setPulses(response.data);
      console.log(response.data)
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
      <h1>Pulse Data Charts</h1>
      <div>
        <PulseChart data={pulses} label="Execution Time" dataKey="exeTime" color="blue"/>
        </div>
      <div>
        <PulseChart data={pulses} dataKey="verified"  label="Verified Users" color="green" />
      </div>
      <div>
        <PulseChart data={pulses} dataKey="allUsers" label="All Users" color="red" />
      </div>
    </div>
  );
};

export default PulseChartPage;
