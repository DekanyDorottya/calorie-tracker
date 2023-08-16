import * as React from 'react';
import { BarPlot } from '@mui/x-charts/BarChart';
import { LinePlot } from '@mui/x-charts/LineChart';
import { ChartContainer } from '@mui/x-charts/ChartContainer';

import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';

export default function Combining({ listedMeals }) {
    const xAxisLabels = listedMeals.map((data) => data.caloriesIn);
    const series = [
        {
            type: 'bar',
            stack: '',
            yAxisKey: 'eco',
            data: xAxisLabels,
        },
        {
            type: 'bar',
            stack: '',
            yAxisKey: 'eco',
            data: [0, 0, 0, 0, 0, 0, 0],
            
        },
        {
            type: 'line',
            yAxisKey: 'eco',
            color: 'red',
            data: [2000, 2500, 2600, 2400, 3000, 2100, 2300],
            
        },
    ];
    return (
        <ChartContainer
            series={series}
            width={700}
            height={400}
            xAxis={[
                {
                    id: 'years',
                    data: [
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                        'Sunday',
                    ],
                    scaleType: 'band',
                    valueFormatter: (value) => value.toString(),
                },
            ]}
            yAxis={[
                {
                    id: 'eco',
                    scaleType: 'linear',
                },
                {
                    id: 'pib',
                    scaleType: 'log',
                },
            ]}
        >
            <BarPlot />
            <LinePlot />
            <ChartsXAxis label='Years' position='bottom' axisId='years' />
            <ChartsYAxis label='' position='left' axisId='eco'  />
        </ChartContainer>
    );
}
