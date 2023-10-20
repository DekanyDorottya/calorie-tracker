import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Notification from './Notification';
import { Box } from '@mui/material';
import Cookies from 'js-cookie';
import DailyBarchart from './DailyBarchart';
import { Add } from '@mui/icons-material';

const CalorieForm = () => {
    const [grams, setGrams] = useState(0);
    const [foodType, setFoodType] = useState('');
    const [open, setOpen] = useState(false);
    const [dailybarchart, setDailybarchart] = useState(true);
    const [isSearched, setIsSearched] = useState(false);
    const [dailyCalorieInfos, setDailyCalorieInfos] = useState([
        {
            requiedCalorie: 0,
            dailyCalorieConsumption: 0,
        },
    ]);
    const [duration, setDuration] = useState('daily');
    const jwtToken = Cookies.get('jwtToken');

    const handleCaloriesChange = (event) => {
        setGrams(event.target.value);
    };
    const handleFoodTypeChange = (event) => {
        setFoodType(event.target.value);
    };

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        fetchDailyCalories().then((listedMeals) => {
            setDailyCalorieInfos(listedMeals);
        })
    }, [])
    

    const fetchDailyCalories = () => {
        return fetch(`/analyze/?duration=${duration}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        }).then((res) => res.json());
    };

    const showDailyBarChart = () => {
        if(window.innerWidth <= 960) {
            setDailybarchart(false);
        } else {
            setDailybarchart(true);
        }
    }

    window.addEventListener('resize', showDailyBarChart);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/calories/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwtToken}`,
                },
                body: JSON.stringify({
                    foodType: foodType,
                    grams: grams,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to post calories.');
            }
            fetchDailyCalories().then((listedMeals) => {
                setDailyCalorieInfos(listedMeals);
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error posting calories:', error);
        }
    };

    return (
        <>
            <Box  flex={5} p={{ xs: 0, md: 2, alignItems: 'center'}}>
                { !isSearched ? (
                    <>
                     <TextField id="outlined-search" label="Search food" type="search" />
                     
                     </>
                ) : (
                <form className='calorie-form' onSubmit={handleSubmit}>
                    <label htmlFor='grams'>Enter Grams:</label>
                    <input
                        type='number'
                        id='grams'
                        value={grams}
                        onChange={handleCaloriesChange}
                        className='gram-input'
                    />

                    <label htmlFor='foodType'>Enter food:</label>

                    <input
                        type='text'
                        id='foodType'
                        value={foodType}
                        onChange={handleFoodTypeChange}
                        className='food-input'
                    />

                    <Button
                        variant='contained'
                        type='submit'
                        className='submit-button'
                        onClick={handleClick}
                    >
                        Post Calories
                    </Button>

                    <Notification
                        open={open}
                        onClose={handleClose}
                        message='Posted a meal'
                    />
                </form>
                )}
            </Box>
            {dailybarchart ? <DailyBarchart listedMeals={dailyCalorieInfos} /> : null}
        </>
    );
};

export default CalorieForm;
