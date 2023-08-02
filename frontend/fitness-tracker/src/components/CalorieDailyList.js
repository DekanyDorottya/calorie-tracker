import { useEffect, useState } from 'react';

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

    

    return <div>{listedMeals.map((data) => (<td>{data.calories}</td>))}</div>;
}
