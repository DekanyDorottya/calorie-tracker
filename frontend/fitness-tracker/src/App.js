import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import CalorieForm from './components/CalorieForm';
import Button from '@mui/material/Button';


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

        </Routes>
        <Link to="/calorie"> <Button variant="contained">Calorie</Button></Link>

      </div>

    </Router>
  );
};

export default App;