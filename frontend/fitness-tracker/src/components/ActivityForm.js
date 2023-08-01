import React, { useState } from 'react';
import Button from '@mui/material/Button';

const ActivityForm = () => {
    const [calories, setCalories] = useState(0);
    const [activity, setActivity] = useState('');

    const handleCaloriesChange = (event) => {
        setCalories(event.target.value);
    };
    const handleActivityTypeChange = (event) => {
        setActivity(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/activities/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    activity: activity,
                    calories: calories,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to post activity.');
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error posting calories:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='calories'>Enter Calories:</label>
            <input
                type='number'
                id='calories'
                value={calories}
                onChange={handleCaloriesChange}
            />
            
            <label htmlFor='activity'>Enter your activity:</label>
            <input
                type='string'
                id='activity'
                value={activity}
                onChange={handleActivityTypeChange}
            />
            <Button variant='contained' type='submit'>
                Post Activity
            </Button>
        </form>
    );
};

export default ActivityForm;
