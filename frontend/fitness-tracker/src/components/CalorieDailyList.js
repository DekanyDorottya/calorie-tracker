import { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';


export default function CalorieDailyList() {
    const [listedMeals, setListedMeals] = useState([]);


    const fetchMeals = () => {
        return fetch('/calories/all').then((res) => res.json());
    };



    useEffect(() => {
        fetchMeals().then((listedMeals) => {
            setListedMeals(listedMeals);
            console.log(listedMeals);
        });
    }, []);

    

    return <div>{listedMeals.map((data) => (<td>{data.calories}</td>))}
    <BarChart
                xAxis={[
                    {
                        scaleType: 'band',
                        data: ['group A', 'group B', 'group C'],
                    },
                ]}
                series={[
                    { data: [4, 3, 5] },
                    { data: [1, 6, 3] },
                    { data: [2, 5, 6] },
                ]}
                width={500}
                height={300}
            /></div>;
}
