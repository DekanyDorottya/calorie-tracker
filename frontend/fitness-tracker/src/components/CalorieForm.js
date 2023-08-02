import React, { useState } from 'react';
import Button from '@mui/material/Button';
import './CalorieForm.css'; 

const CalorieForm = () => {
    const [calories, setCalories] = useState(0);
    const [foodType, setFoodType] = useState('');

    const handleCaloriesChange = (event) => {
        setCalories(event.target.value);
    };
    const handleFoodTypeChange = (event) => {
        setFoodType(event.target.value);
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
        <form className="calorie-form" onSubmit={handleSubmit}>
            <label htmlFor='calories'>Enter Calories:</label>
            <input
                type='number'
                id='calories'
                value={calories}
                onChange={handleCaloriesChange}
                className="calorie-input"
            />
            
            <label htmlFor='foodType'>Enter food:</label>
            <input
                type='text'
                id='foodType'
                value={foodType}
                onChange={handleFoodTypeChange}
                className="food-input"
            />
            <Button variant='contained' type='submit' className="submit-button">
                Post Calories
            </Button>
        </form>
    );
};

export default CalorieForm;
