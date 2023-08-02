import { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import './CalorieDailyList.css'; 


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

    const xAxisLabels = listedMeals.map((data) => data.foodType);
    const caloriesData = listedMeals.map((data) => data.calories);

    return (
        <div className="calorie-daily-list-container">
          {listedMeals.length > 0 ? (
            <>
              <table className="calorie-table">
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
              <div className="calorie-bar-chart">
                <BarChart
                  xAxis={[
                    {
                      scaleType: 'band',
                      data: xAxisLabels,
                    },
                  ]}
                  series={[
                    {
                      data: caloriesData,
                    },
                  ]}
                  width={500}
                  height={300}
                />
              </div>
            </>
          ) : (
            <p className="calorie-loading">Loading...</p>
          )}
        </div>
      );
    }
