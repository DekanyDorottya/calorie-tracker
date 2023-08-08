import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Button from "@mui/material/Button";
import "./App.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";
import jwt from "jwt-decode";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
    setIsLoggedIn(!!jwtToken);
    //console.log(jwt(jwtToken));
  }, []);

  const handleLogout = () => {
    // Clear the JWT token from the cookie and set isLoggedIn to false
    Cookies.remove("jwtToken");
    setIsLoggedIn(false);
  };

  return (
    <div>
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/">
              <Button variant="contained">Home</Button>
            </Link>
          </li>
          <li>
            <Link to="/about">
              <Button variant="contained">About</Button>
            </Link>
          </li>
          {isLoggedIn && (
            <>
              <li>
                <Link to="/calorie">
                  <Button variant="contained">Add Meal</Button>
                </Link>
              </li>
              <li>
                <Link to="/yourDailyCalorie">
                  <Button variant="outlined">Check Your Daily Calorie</Button>
                </Link>
              </li>
              <li>
                <Link to="/activity">
                  <Button variant="contained">Activity</Button>
                </Link>
              </li>
              <li>
                <Link to="/yourDailyActivity">
                  <Button variant="outlined">Check Your Daily Activity</Button>
                </Link>
              </li>
            </>
          )}
        </ul>

        <div className="mb-2">
          {isLoggedIn ? (
            <DropdownButton
              id={`dropdown-button-profile`}
              variant="primary"
              title={jwt(Cookies.get("jwtToken")).email}
            >
              <Dropdown.Item as={Link} to="/profile">
                Profile
              </Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
            </DropdownButton>
          ) : (
            <DropdownButton
              id={`dropdown-button-login`}
              variant="primary"
              title={` Log In  `}
            >
              <Dropdown.Item as={Link} to="/login">
                Log in
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/signup">
                Sign up
              </Dropdown.Item>
            </DropdownButton>
          )}
        </div>
      </nav>

      <hr />
      <Outlet />
    </div>
  );
};

export default App;
