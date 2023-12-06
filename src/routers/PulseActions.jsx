// Function to add a new pulse
const addNewPulse = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/pulseData', { /* Your pulse data here */ });
      console.log('New pulse added:', response.data);
    } catch (error) {
      console.error('Error adding new pulse:', error);
    }
  };

  // Function to get all pulses
  const getAllPulses = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/pulseData');
      console.log('All pulses:', response.data);
    } catch (error) {
      console.error('Error getting all pulses:', error);
    }
  };

  // Function to get a specific pulse by ID
  const getPulseById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/pulseData/${id}`);
      console.log('Pulse by ID:', response.data);
    } catch (error) {
      console.error('Error getting pulse by ID:', error);
    }
  };

  // Function to delete a pulse by ID
  const deletePulseById = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3001/api/pulseData/${id}`);
      console.log('Pulse deleted:', response.data);
    } catch (error) {
      console.error('Error deleting pulse:', error);
    }
  };