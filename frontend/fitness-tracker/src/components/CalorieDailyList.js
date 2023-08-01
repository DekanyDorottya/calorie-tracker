import { useEffect, useState } from 'react';

export default function CalorieDailyList() {
    const [calories, setCalories] = useState(0);
    const [foodType, setFoodType] = useState('');
    const [listedMeals, setListedMeals] = useState([]);


    const fetchMeals = () => {
        return fetch('/calories/all').then((res) => res.json());
    };

    useEffect(() => {
        fetchMeals().then((listedCalories) => {
            setListedMeals(listedCalories);
            console.log(listedCalories);
        });
    }, []);

    

    return <div>{listedMeals.map((data) => (<td>{data.calories}</td>))}</div>;
}
