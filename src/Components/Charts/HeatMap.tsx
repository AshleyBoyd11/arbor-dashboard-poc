import {
    DefaultHeatMapDatum,
    HeatMapDatum,
    HeatMapSerie,
    ResponsiveHeatMap,
} from '@nivo/heatmap';
import React from 'react';
import {transformChartData} from './transformChartData';

export const HeatMap = ({dataUrl}) => {
    const {transformedData, query, annotation} = transformChartData(
        dataUrl,
        'heatMap',
    );

    const keys = query.measures;
    const indexBy = query.dimensions[0];
    const xAxisLabel = annotation.dimensions[indexBy].title;
    const yAxisLabel = annotation.measures[keys[0]].title;

    return (
        <ResponsiveHeatMap
            data={
                transformedData as HeatMapSerie<
                    DefaultHeatMapDatum,
                    HeatMapDatum
                >[]
            }
            margin={{top: 60, right: 90, bottom: 60, left: 90}}
            valueFormat=">-.2s"
            axisTop={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -90,
                legend: xAxisLabel,
                legendOffset: 46,
                truncateTickAt: 0,
            }}
            axisRight={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: yAxisLabel,
                legendPosition: 'middle',
                legendOffset: 70,
                truncateTickAt: 0,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: yAxisLabel,
                legendPosition: 'middle',
                legendOffset: -72,
                truncateTickAt: 0,
            }}
            colors={{
                type: 'diverging',
                scheme: 'red_yellow_blue',
                divergeAt: 0.5,
                minValue: -100000,
                maxValue: 100000,
            }}
            emptyColor="#555555"
            legends={[
                {
                    anchor: 'bottom',
                    translateX: 0,
                    translateY: 30,
                    length: 400,
                    thickness: 8,
                    direction: 'row',
                    tickPosition: 'after',
                    tickSize: 3,
                    tickSpacing: 4,
                    tickOverlap: false,
                    tickFormat: '>-.2s',
                    title: 'Value →',
                    titleAlign: 'start',
                    titleOffset: 4,
                },
            ]}
            onClick={(e) => console.log(e)}
        />
    );
};
