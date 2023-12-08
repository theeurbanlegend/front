import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import PulseTablePage from './components/PulseTablePage';
import PulseChartPage from './components/PulseChartPage';

const App = ({userStats ,nextPulseTime, countdown}) => {
  return (
    <Router>
      <Routes>
        <Route exact path="/"  element={<Home />} />
        <Route exact path="/pulses/table" element={<PulseTablePage/>} />
        <Route exact path="/pulses/charts" element={<PulseChartPage/>} />
      </Routes>
    </Router>
  );
};

export default App;
