import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import './CalorieDailyList.css';
import { Box } from '@mui/material';
import './DailyBarchart.css';

export default function DailyBarchart({ listedMeals }) {
    if (!listedMeals || listedMeals.length === 0) {
        // Return some placeholder or empty content when listedMeals is not available or empty.
        return null;
    }

    return (
        <Box flex={1} p={{ xs: 0, md: 2 }}>
            <BarChart
                p={{ tickFontSize: 30 }}
                series={[
                    {
                        data: [listedMeals[0]?.requiredCalorie || 0],
                        stack: 'A',
                        label: 'optimal',
                    },
                    {
                        data: [300],
                        stack: 'A',
                        label: 'calorie out',
                    },
                    {
                        data: [listedMeals[0]?.dailyCalorieConsumption || 0],
                        label: 'calories in',
                        color: 'red',
                    },
                ]}
                width={400}
                height={350}
            />
        </Box>
    );
}

