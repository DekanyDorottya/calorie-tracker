import { useEffect, useState } from 'react';

export default function ActivityDailyList() {
    const [listedMeals, setListedMeals] = useState([]);

    const fetchMeals = () => {
        return fetch('/activities/all').then((res) => res.json());
    };

    useEffect(() => {
        fetchMeals().then((listedActivities) => {
            setListedMeals(listedActivities);
            console.log(listedActivities);
        });
    }, []);

    return (
        <div>
            {listedMeals.map((data) => (
                <td>{data.calories}</td>
            ))}
            
        </div>
    );
}
