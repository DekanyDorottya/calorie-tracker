import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import CalorieForm from './components/CalorieForm';
import CalorieDailyList from './components/CalorieDailyList';
import Button from '@mui/material/Button';
import ActivityForm from './components/ActivityForm';


const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
              <Link to="/"> <Button variant="contained">Home</Button></Link>
              <Link to="/about"><Button variant="contained">About</Button></Link>
          </ul>
        </nav>

        <hr />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/calorie" element={<CalorieForm />} />
          <Route path="/yourDailyCalorie" element={<CalorieDailyList />} />
          <Route path="/activity" element={<ActivityForm />} />

        </Routes>
        <Link to="/calorie"> <Button variant="contained">Add Meal</Button></Link>
        <Link to="/yourDailyCalorie"> <Button variant="outlined">Your Daily Calorie</Button></Link>
        <Link to="/activity"> <Button variant="contained">Activity</Button></Link>

      </div>

    </Router>
  );
};

export default App;
