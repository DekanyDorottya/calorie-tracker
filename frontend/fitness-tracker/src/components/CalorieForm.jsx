import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Notification from './Notification';
import { Box } from '@mui/material';
import Cookies from 'js-cookie';
import DailyBarchart from './DailyBarchart';

const CalorieForm = () => {
    const [calories, setCalories] = useState(0);
    const [foodType, setFoodType] = useState('');
    const [open, setOpen] = useState(false);
    const [dailyCalorieInfos, setDailyCalorieInfos] = useState([
        {
            requiedCalorie: 2000,
            dailyCalorieConsumption: 1500,
        },
    ]);
    const [duration, setDuration] = useState('daily');
    const jwtToken = Cookies.get('jwtToken');

    const handleCaloriesChange = (event) => {
        setCalories(event.target.value);
    };
    const handleFoodTypeChange = (event) => {
        setFoodType(event.target.value);
    };

    //Notify parts
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const fetchDailyCalories = () => {
        return fetch(`/analyze?duration=${duration}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        }).then((res) => res.json());
    };

    /* useEffect(() => {
        fetchDailyCalories().then((listedMeals) => {
            setDailyCalorieInfos(listedMeals);
            console.log(listedMeals);
        });
    }, []); */

    const handleRefresh = () => {
        fetchDailyCalories().then((listedMeals) => {
            setDailyCalorieInfos(listedMeals);
            console.log(listedMeals);
        });
    };

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
                    calories: calories,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to post calories.');
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error posting calories:', error);
        }
    };

    return (
        <>
            <Box flex={5} p={{ xs: 0, md: 2 }}>
                <form className='calorie-form' onSubmit={handleSubmit}>
                    <label htmlFor='calories'>Enter Calories:</label>
                    <input
                        type='number'
                        id='calories'
                        value={calories}
                        onChange={handleCaloriesChange}
                        className='calorie-input'
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
                <Button
                    variant='contained'
                    type='submit'
                    className='submit-button'
                    onClick={handleRefresh}
                >
                    refresh
                </Button>
            </Box>
            <DailyBarchart listedMeals={dailyCalorieInfos} />
        </>
    );
};

export default CalorieForm;
