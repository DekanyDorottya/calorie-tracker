import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import CalorieForm from './components/CalorieForm';
import CalorieDailyList from './components/CalorieDailyList';
import Button from '@mui/material/Button';
import ActivityForm from './components/ActivityForm';
import './App.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './components/LoginForm';
import ActivityDailyList from './components/ActivityDailyList';

const App = () => {
    return (
        
            <div>
                <nav className='navbar'>
                    <ul className='nav-links'>
                        <li>
                            <Link to='/'>
                                <Button variant='contained'>Home</Button>
                            </Link>
                        </li>
                        <li>
                            <Link to='/about'>
                                <Button variant='contained'>About</Button>
                            </Link>
                        </li>

                        <li>
                            <Link to='/calorie'>
                                <Button variant='contained'>Add Meal</Button>
                            </Link>
                        </li>
                       
                            <Link to='/yourDailyCalorie'>
                                <Button variant='outlined'>
                                    Check Your Daily Calorie
                                </Button>
                            </Link>
                        <li>
                            <Link to='/activity'>
                                <Button variant='contained'>Activity</Button>
                            </Link>
                        </li>

                        <Link to='/yourDailyActivitiy'>
                            <Button variant='outlined'>
                            Check Your Daily Activity
                            </Button>
                        </Link>
                    </ul>

                    <div className='mb-2'>
                        <DropdownButton
                            //as={ButtonGroup}
                            id={`dropdown-button-login`}
                            variant='primary'
                            title={` Log In  `}
                        >
                            <Dropdown.Item as={Link} to='/login'>
                                Login
                            </Dropdown.Item>
                            <Dropdown.Item eventKey='2'>Sign in</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </nav>

                <hr />
                <Outlet />
                
            </div>
            
    );
};

export default App;
