import React from 'react';
import './Home.css';
import { Box, Stack, Skeleton } from '@mui/material';

const Home = () => {
    return (
        <Box flex={7} p={{ xs: 0, md: 2 }}>
            <div>
                <div className='homeTitle'>
                    <h1>Welcome to TrackFit!</h1>
                </div>
                <div className='container'>
                    <img
                        src='https://media.istockphoto.com/id/908165344/photo/pasta-with-meat-and-vegetables-on-white-background.jpg?s=612x612&w=0&k=20&c=zLxnClBbX6Azrd7Lud42pvQEQTjngPfIe5ElDCMroog='
                        alt='Your Image'
                        className='homeImage'
                    />
                    <p>
                        Good health starts with what you eat. Want to eat more
                        mindfully? Track meals, learn about your habits, and
                        reach your goals with TrackFit..
                    </p>
                </div>
            </div>
        </Box>
    );
};

export default Home;
