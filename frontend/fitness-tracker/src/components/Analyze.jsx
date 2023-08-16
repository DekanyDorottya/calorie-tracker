import { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import './CalorieDailyList.css';
import { Box, Stack, Skeleton } from '@mui/material';
import Cookies from 'js-cookie';
export default function Analyze() {
    const [listedMeals, setListedMeals] = useState([]);

    const jwtToken = Cookies.get('jwtToken');

    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
    };

    const fetchMeals = () => {
        return fetch('/analyze', requestOptions).then((res) => res.json());
    };

    /* useEffect(() => {
        fetchMeals().then((listedMeals) => {
            setListedMeals(listedMeals);
            console.log(listedMeals);
        });
    }, []); */

    const xAxisLabels = listedMeals.map((data) => data.foodType);
    const caloriesData = listedMeals.map((data) => data.calories);

    return (
        <Box flex={9} p={{ xs: 0, md: 2 }}>
            <div className='calorie-daily-list-container'>
                {listedMeals && (
                    <>
                        <table className='calorie-table'>
                            <thead>
                                <tr>
                                    <th>Food Type</th>
                                    <th>Calories</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listedMeals.map((data, index) => (
                                    <tr key={index}>
                                        <td>{data.foodType}</td>
                                        <td>{data.calories}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='calorie-bar-chart'>
                            <BarChart
                                series={[
                                    {
                                        data: [3000, 1000, 2, 6, 5, 2, 3],
                                        stack: 'A',
                                        label: 'calorie in',
                                    },
                                    {
                                        data: [4, 3, 1, 5, 8, 2, 3],
                                        stack: 'A',
                                        label: 'calorie out',
                                    },

                                    {
                                        data: [10, 6, 5, 8, 9, 2, 3],
                                        label: 'series C1',
                                    },
                                ]}
                                width={600}
                                height={350}
                            />
                        </div>
                    </>
                )}
            </div>
        </Box>
    );
}
