import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import './CalorieDailyList.css';
import { Box } from '@mui/material';
import './DailyBarchart.css';

export default function DailyBarchart({ listedMeals }) {
    return (
        <>
            {listedMeals && (
                <>
                    <Box flex={1} p={{ xs: 0, md: 2 }}>
                        <BarChart
                            p={{ tickFontSize: 30 }}
                            series={[
                                {
                                    data: [listedMeals.requiedCalorie],
                                    stack: 'A',
                                    label: 'optimal',
                                },
                                {
                                    data: [300],
                                    stack: 'A',
                                    label: 'calorie out',
                                },

                                {
                                    data: [listedMeals.calorieDay],
                                    label: 'calories in',
                                    color: 'red',
                                },
                            ]}
                            width={400}
                            height={350}
                        />
                    </Box>
                </>
            )}
        </>
    );
}
