import { useEffect, useState } from 'react';
import "./ActivityDailyList.css"

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
            <table>
                <thead>
                    <tr>
                        <th>Activity</th>
                        <th>Calories</th>
                        <th>Date & Time</th>
                    </tr>
                </thead>
                <tbody>
                    {listedMeals.map((data, index) => (
                        <tr key={index}>
                            <td>{data.activity}</td>
                            <td>{data.calories}</td>
                            <td>{new Date(data.activityDateTime).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}