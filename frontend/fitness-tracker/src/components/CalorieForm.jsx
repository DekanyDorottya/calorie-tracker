import React, { useState } from 'react';
import Button from '@mui/material/Button';
import './CalorieForm.css';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Notification from './Notification';
import { Box, Stack, Skeleton } from '@mui/material';

const CalorieForm = () => {
    const [calories, setCalories] = useState(0);
    const [foodType, setFoodType] = useState('');
    const [open, setOpen] = React.useState(false);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/calories/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
        <Box flex={9} p={{ xs: 0, md: 2 }}>
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
        </Box>
    );
};

export default CalorieForm;
