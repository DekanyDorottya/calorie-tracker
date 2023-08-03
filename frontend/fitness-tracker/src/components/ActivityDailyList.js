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

    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const date = dateTime.toLocaleDateString();
        const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        return `${date} ${time}`;
    };

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
                            <td>{formatDateTime(data.activityDateTime)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}